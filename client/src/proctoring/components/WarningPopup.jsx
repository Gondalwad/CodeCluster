import { useEffect, useRef, useState } from "react";
import { PROCTOR_EVENTS } from "../proctorEvents";

const WARNING_POPUP_DURATION_MS = 2000;
const WARNING_GAP_MS = 4000;

const VIOLATION_META = {
  "Head turned": {
    icon: "↩️",
    message: "Please face the screen directly.",
  },
  "Face authentication failed": {
    icon: "🔐",
    message: "Face not recognised. Align your face clearly.",
  },
  "Face not visible": {
    icon: "📷",
    message: "Your face is not visible. Adjust your camera.",
  },
  "Mobile phone detected": {
    icon: "📵",
    message: "Mobile phone detected. Please remove it from view.",
  },
  "Multiple persons detected": {
    icon: "👥",
    message: "Multiple people detected. Only you should be in frame.",
  },
  "Speech detected": {
    icon: "🔇",
    message: "Speech detected. Please remain silent during the exam.",
  },
  "Spectacles detected": {
    icon: "👓",
    message: "Spectacles detected. Please remove your glasses.",
  },
  "Book detected": {
    icon: "📚",
    message: "Book detected. Please remove all study materials.",
  },
  "Laptop detected": {
    icon: "💻",
    message: "Laptop detected. Please remove it from view.",
  },
  "Tablet detected": {
    icon: "📱",
    message: "Tablet detected. Please remove it from view.",
  },
  "Earphones detected": {
    icon: "🎧",
    message: "Earphones detected. Please remove them.",
  },
  "Headphones detected": {
    icon: "🎧",
    message: "Headphones detected. Please remove them.",
  },
};

function getMetaForViolation(violation) {
  if (VIOLATION_META[violation]) return VIOLATION_META[violation];
  // Handle dynamic banned object labels e.g. "Banned object detected (KNIFE)"
  if (violation?.startsWith("Banned object detected")) {
    return { icon: "🚫", message: `${violation}. Please remove it from view.` };
  }
  return { icon: "⚠️", message: "Please follow exam guidelines." };
}

export default function WarningPopup() {
  const [warning, setWarning] = useState(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const lastShownRef = useRef(0);

  useEffect(() => {
    function onWarning(event) {
      const detail = event.detail || {};
      const now = Date.now();

      if (now - lastShownRef.current < WARNING_GAP_MS) return;
      lastShownRef.current = now;

      clearTimeout(timeoutRef.current);
      clearTimeout(hideTimeoutRef.current);

      setWarning(detail);
      setVisible(true);

      timeoutRef.current = setTimeout(() => {
        setVisible(false);
        hideTimeoutRef.current = setTimeout(() => setWarning(null), 300);
      }, WARNING_POPUP_DURATION_MS);
    }

    window.addEventListener(PROCTOR_EVENTS.WARNING_RECEIVED, onWarning);
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
      window.removeEventListener(PROCTOR_EVENTS.WARNING_RECEIVED, onWarning);
    };
  }, []);

  if (!warning) return null;

  const primaryViolation =
    Array.isArray(warning.violations) && warning.violations.length > 0
      ? warning.violations[0]
      : warning.warning_label || "";

  const meta = getMetaForViolation(primaryViolation);
  const warningCount = warning.warning_count ?? 0;
  const isFinal = warningCount >= 3;

  return (
    <div
      className={`fixed left-1/2 top-6 z-50 w-[400px] max-w-[calc(100vw-32px)] -translate-x-1/2 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
      }`}
    >
      <div
        className={`rounded-2xl border shadow-2xl overflow-hidden ${
          isFinal
            ? "border-red-500/60 bg-[var(--bg)]"
            : "border-orange-400/40 bg-[var(--bg)]"
        }`}
      >
        {/* Top accent bar */}
        <div
          className={`h-1 w-full ${
            isFinal
              ? "bg-gradient-to-r from-red-500 to-red-600"
              : "bg-gradient-to-r from-orange-400 to-amber-500"
          }`}
        />

        <div className="px-5 py-4">
          {/* Header row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{meta.icon}</span>
              <span
                className={`text-sm font-bold uppercase tracking-widest ${
                  isFinal ? "text-red-500" : "text-orange-500"
                }`}
              >
                Warning
              </span>
            </div>

            {/* Warning counter pills */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    n <= warningCount
                      ? isFinal
                        ? "bg-red-500"
                        : "bg-orange-400"
                      : "bg-[var(--border)]"
                  }`}
                />
              ))}
              <span className="ml-1 text-xs font-semibold text-[var(--text)]">
                {warningCount} / 3
              </span>
            </div>
          </div>

          {/* Message */}
          <p className="mt-3 text-base font-semibold text-[var(--text-h)] leading-snug">
            {meta.message}
          </p>

          {/* Violation tag */}
          {primaryViolation && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--code-bg)] px-3 py-1 text-xs text-[var(--text)]">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isFinal ? "bg-red-500" : "bg-orange-400"
                }`}
              />
              {primaryViolation}
            </div>
          )}

          {/* Final warning message */}
          {isFinal && (
            <p className="mt-3 text-xs font-medium text-red-500">
              ⚠ This is your final warning. One more violation will terminate
              your exam.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
