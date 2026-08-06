import { useEffect, useMemo, useRef, useState } from "react";
import { ProctoringProvider } from "./context/ProctoringContext";
import useProctoring from "./hooks/useProctoring";
import WarningPopup from "./components/WarningPopup";
import CameraPreview from "./components/CameraPreview";
import useProctoringLogger from "./hooks/useProctoringLogger";
import { PROCTOR_EVENTS } from "./proctorEvents";
import cameraManager from "./camera/cameraManager";
import microphoneManager from "./audio/microphoneManager";
import frameScheduler from "./camera/frameScheduler";
import audioStreamer from "./audio/audioStreamer";

export default function ProctoringSession({
  children,
  candidateId = "demo-candidate",
  enabled = false,
  onGoHome,
}) {
  const videoRef = useRef(null);

  const [examTerminated, setExamTerminated] = useState(false);
  const [finalWarningCount, setFinalWarningCount] = useState(0);

  const proctoring = useProctoring({ videoRef, enabled });

  const contextValue = useMemo(
    () => ({
      candidateId,
      status: proctoring.status,
      connected: proctoring.websocket.connected,
      websocketError: proctoring.websocket.error,
      warning: proctoring.websocket.warning,
      warningCount: examTerminated ? finalWarningCount : proctoring.websocket.warningCount,
      violations: proctoring.websocket.violations,
      terminate: examTerminated,
    }),
    [candidateId, proctoring, examTerminated, finalWarningCount]
  );

  useProctoringLogger(enabled);

  useEffect(() => {
    function onTerminateEvent(e) {
      const count = e.detail?.warning_count ?? 3;
      setFinalWarningCount(count);
      setExamTerminated(true);
      cameraManager.stop();
      microphoneManager.stop();
      frameScheduler.stop();
      audioStreamer.stop();
    }
    window.addEventListener(PROCTOR_EVENTS.EXAM_TERMINATED, onTerminateEvent);
    return () => window.removeEventListener(PROCTOR_EVENTS.EXAM_TERMINATED, onTerminateEvent);
  }, []);

  return (
    <ProctoringProvider value={contextValue}>
      <div className="relative h-full w-full">
        <video ref={videoRef} autoPlay playsInline muted className="hidden" />

        {enabled && !examTerminated && <CameraPreview videoRef={videoRef} />}

        {examTerminated && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75">
            <div className="mx-4 w-full max-w-sm rounded-lg border border-red-500/30 bg-slate-900 p-6 text-center shadow-xl">
              <h2 className="text-lg font-bold text-white">Exam Terminated</h2>
              <p className="mt-2 text-xs text-slate-300">
                Session ended due to exceeding maximum warnings ({finalWarningCount}/3).
              </p>
              <button
                onClick={onGoHome}
                className="mt-5 w-full rounded-md bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}

        <WarningPopup />

        {children}
      </div>
    </ProctoringProvider>
  );
}
