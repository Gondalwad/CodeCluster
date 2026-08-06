import { useEffect, useRef } from "react";
import { PROCTOR_EVENTS } from "../proctorEvents";

function timestamp() {
  return new Date().toISOString().replace("T", " ").slice(0, 23);
}

function downloadLog(lines) {
  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `proctor_frontend_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function useProctoringLogger(enabled) {
  const linesRef = useRef([]);
  const frameCountRef = useRef(0);

  function log(tag, detail = "") {
    const line = `[${timestamp()}] [${tag}] ${detail}`;
    linesRef.current.push(line);
    console.log(line);
  }

  useEffect(() => {
    if (!enabled) return;

    linesRef.current = [];
    frameCountRef.current = 0;
    log("SESSION", "Proctoring session started");

    function onConnected() {
      log("WS", "WebSocket connected");
    }

    function onDisconnected(e) {
      const d = e.detail || {};
      log("WS", `WebSocket disconnected (code=${d.code ?? "unknown"}, reason="${d.reason ?? ""}", clean=${d.wasClean ?? "unknown"})`);
      downloadLog(linesRef.current);
    }

    function onWarningUpdated(e) {
      const d = e.detail || {};
      frameCountRef.current += 1;
      const f = frameCountRef.current;

      // Raw ML violations this frame
      const mlViolations   = (d.ml_violations        || []).join(", ") || "none";
      const snapViolations = (d.snapshot_violations   || []).join(", ") || "none";
      // What warning_manager sees as active violations
      const ruleViolations = (d.violations            || []).join(", ") || "none";

      log("FRAME",
        `frame=${f} | warning=${d.warning ?? false} | warn_count=${d.warning_count ?? 0} | cooldown=${d.global_cooldown_remaining ?? 0}s | terminate=${d.terminate ?? false}`);
      log("FRAME",
        `frame=${f} | ml_violations=[${mlViolations}] | snapshot=[${snapViolations}] | rule_violations=[${ruleViolations}]`);
      log("FRAME",
        `frame=${f} | system_status=${d.system_status ?? "?"} | ignore_frame=${d.ignore_frame ?? false}`);

      // Log warning_manager debug state for any violation that has activity
      const debug = d.debug || {};
      const active = Object.entries(debug).filter(
        ([, v]) => v.frames > 0 || v.misses > 0 || v.warned
      );
      if (active.length > 0) {
        active.forEach(([name, v]) => {
          log("DEBUG",
            `frame=${f} | ${name} => frames=${v.frames}/${v.threshold} misses=${v.misses} warned=${v.warned} cooldown=${v.cooldown_remaining}s`);
        });
      }
    }

    function onWarningReceived(e) {
      const d = e.detail || {};
      const violations = (d.violations || []).join(", ") || "none";
      log("WARNING", `*** WARNING FIRED *** count=${d.warning_count ?? 0}/3 violations=[${violations}]`);
    }

    function onTerminated(e) {
      const d = e.detail || {};
      log("TERMINATE", `Exam terminated — total warnings=${d.warning_count ?? 0}`);
      downloadLog(linesRef.current);
    }

    window.addEventListener(PROCTOR_EVENTS.WEBSOCKET_CONNECTED,    onConnected);
    window.addEventListener(PROCTOR_EVENTS.WEBSOCKET_DISCONNECTED, onDisconnected);
    window.addEventListener(PROCTOR_EVENTS.WARNING_UPDATED,        onWarningUpdated);
    window.addEventListener(PROCTOR_EVENTS.WARNING_RECEIVED,       onWarningReceived);
    window.addEventListener(PROCTOR_EVENTS.EXAM_TERMINATED,        onTerminated);

    return () => {
      log("SESSION", "Proctoring session ended");
      window.removeEventListener(PROCTOR_EVENTS.WEBSOCKET_CONNECTED,    onConnected);
      window.removeEventListener(PROCTOR_EVENTS.WEBSOCKET_DISCONNECTED, onDisconnected);
      window.removeEventListener(PROCTOR_EVENTS.WARNING_UPDATED,        onWarningUpdated);
      window.removeEventListener(PROCTOR_EVENTS.WARNING_RECEIVED,       onWarningReceived);
      window.removeEventListener(PROCTOR_EVENTS.EXAM_TERMINATED,        onTerminated);
    };
  }, [enabled]);
}
