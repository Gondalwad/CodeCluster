import { useEffect, useMemo, useRef } from "react";
import { ProctoringProvider } from "./context/ProctoringContext";
import useProctoring from "./hooks/useProctoring";
import WarningPopup from "./components/WarningPopup";

export default function ProctoringSession({
  children,
  candidateId = "demo-candidate",
  enabled = false,
  onTerminate,
}) {
  const videoRef = useRef(null);

  const proctoring = useProctoring({
    videoRef,
    enabled,
  });

  const contextValue = useMemo(
    () => ({
      candidateId,
      status: proctoring.status,
      connected: proctoring.websocket.connected,
      websocketError: proctoring.websocket.error,
      warning: proctoring.websocket.warning,
      warningCount: proctoring.websocket.warningCount,
      violations: proctoring.websocket.violations,
      terminate: proctoring.websocket.terminate,
    }),
    [candidateId, proctoring]
  );

  const examTerminated = Boolean(contextValue.terminate);

  useEffect(() => {
    if (examTerminated && onTerminate) {
      onTerminate();
    }
  }, [examTerminated, onTerminate]);

  return (
    <ProctoringProvider value={contextValue}>
      <div className="relative h-full w-full">
        {/* Hidden video — needed for frame capture, not shown */}
        <video ref={videoRef} autoPlay playsInline muted className="hidden" />

        {/* Exam Terminated Overlay */}
        {examTerminated && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-md rounded-2xl border border-red-500/40 bg-[var(--bg)] p-8 text-center shadow-2xl">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-4xl">
                🚫
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-h)]">Exam Terminated</h2>
              <p className="mt-2 text-sm text-[var(--text)]">
                You have reached the maximum warning limit. Your session has been closed.
              </p>
              <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--code-bg)] px-4 py-3 text-sm font-semibold text-[var(--text-h)]">
                Warnings: {contextValue.warningCount ?? 0} / 3
              </div>
            </div>
          </div>
        )}

        <WarningPopup />

        {children}
      </div>
    </ProctoringProvider>
  );
}
