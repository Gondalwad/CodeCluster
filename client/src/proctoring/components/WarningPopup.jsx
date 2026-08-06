import { useEffect, useRef, useState } from "react";
import { PROCTOR_EVENTS } from "../proctorEvents";

const WARNING_POPUP_DURATION_MS = 3000;
const WARNING_GAP_MS = 500;

const VIOLATION_META = {
  "Head turned": "Please face the screen directly.",
  "Face authentication failed": "Face not recognised. Align your face clearly.",
  "Face not visible": "Your face is not visible. Adjust your camera.",
  "Mobile phone detected": "Mobile phone detected. Please remove it from view.",
  "Multiple persons detected": "Multiple people detected in frame.",
  "Speech detected": "Speech detected. Please remain silent.",
  "Spectacles detected": "Spectacles detected. Please remove your glasses.",
  "Book detected": "Book detected. Please remove all study materials.",
  "Laptop detected": "Laptop detected. Please remove it from view.",
  "Tablet detected": "Tablet detected. Please remove it from view.",
  "Earphones detected": "Earphones detected. Please remove them.",
  "Headphones detected": "Headphones detected. Please remove them.",
};

function getMessageForViolation(violation) {
  if (VIOLATION_META[violation]) return VIOLATION_META[violation];
  if (violation?.startsWith("Banned object detected")) {
    return `${violation}. Please remove it from view.`;
  }
  return "Please follow exam guidelines.";
}

export default function WarningPopup() {
  const [warning, setWarning] = useState(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const timeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const progressRef = useRef(null);
  const lastShownRef = useRef(0);

  useEffect(() => {
    function onWarning(event) {
      const detail = event.detail || {};
      const now = Date.now();

      if (now - lastShownRef.current < WARNING_GAP_MS) return;
      lastShownRef.current = now;

      clearTimeout(timeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
      clearInterval(progressRef.current);

      setWarning(detail);
      setVisible(true);
      setProgress(100);

      const startTime = Date.now();
      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / WARNING_POPUP_DURATION_MS) * 100);
        setProgress(remaining);
        if (remaining === 0) clearInterval(progressRef.current);
      }, 30);

      timeoutRef.current = setTimeout(() => {
        setVisible(false);
        hideTimeoutRef.current = setTimeout(() => setWarning(null), 300);
      }, WARNING_POPUP_DURATION_MS);
    }

    window.addEventListener(PROCTOR_EVENTS.WARNING_RECEIVED, onWarning);
    return () => {
      window.removeEventListener(PROCTOR_EVENTS.WARNING_RECEIVED, onWarning);
      clearTimeout(timeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
      clearInterval(progressRef.current);
    };
  }, []);

  if (!warning || !visible) return null;

  const violationsList = warning.violations?.length ? warning.violations : [warning.warning_label];
  const primaryViolation = violationsList[0] || warning.warning_label || "Exam Guideline Violation";
  const message = getMessageForViolation(primaryViolation);
  const warningCount = warning.warning_count || 1;

  return (
    <div className="fixed top-6 left-1/2 z-[9999] -translate-x-1/2 select-none">
      <div className="relative overflow-hidden rounded-lg border border-red-500/40 bg-slate-900 px-5 py-3 shadow-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="rounded bg-red-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400">
              Warning {warningCount} / 3
            </span>
            <span className="text-xs font-semibold text-slate-200">
              {primaryViolation}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-300">
            {message}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
          <div
            className="h-full bg-red-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
