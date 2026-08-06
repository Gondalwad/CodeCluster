import { useEffect, useRef, useState } from "react";
import { PROCTOR_EVENTS } from "../proctorEvents";

const DEFAULT_POS = () => ({ x: window.innerWidth - 220, y: window.innerHeight - 280 });

export default function CameraPreview({ videoRef }) {
  const [pos, setPos] = useState(DEFAULT_POS);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const [warnCount, setWarnCount] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [activeViolations, setActiveViolations] = useState([]);
  const [fps, setFps] = useState(0);
  const frameTimesRef = useRef([]);

  useEffect(() => {
    const preview = containerRef.current?.querySelector("video");
    if (!preview || !videoRef?.current) return;

    const attach = () => {
      if (videoRef.current.srcObject) {
        preview.srcObject = videoRef.current.srcObject;
      }
    };

    attach();

    const interval = setInterval(() => {
      if (videoRef.current?.srcObject && !preview.srcObject) {
        preview.srcObject = videoRef.current.srcObject;
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [videoRef]);

  useEffect(() => {
    function onUpdate(e) {
      const d = e.detail || {};

      setWarnCount(d.warning_count ?? 0);
      setCooldown(d.global_cooldown_remaining ?? 0);

      const v = d.ml_violations?.length ? d.ml_violations : (d.violations || []);
      setActiveViolations(v);

      const now = Date.now();
      frameTimesRef.current.push(now);
      if (frameTimesRef.current.length > 5) frameTimesRef.current.shift();
      if (frameTimesRef.current.length >= 2) {
        const span = (now - frameTimesRef.current[0]) / 1000;
        setFps(((frameTimesRef.current.length - 1) / span).toFixed(1));
      }
    }
    window.addEventListener(PROCTOR_EVENTS.WARNING_UPDATED, onUpdate);
    return () => window.removeEventListener(PROCTOR_EVENTS.WARNING_UPDATED, onUpdate);
  }, []);

  function onMouseDown(e) {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  }

  useEffect(() => {
    function onMouseMove(e) {
      if (!dragging.current) return;
      const x = Math.min(Math.max(0, e.clientX - offset.current.x), window.innerWidth - 192);
      const y = Math.min(Math.max(0, e.clientY - offset.current.y), window.innerHeight - 144);
      setPos({ x, y });
    }
    function onMouseUp() {
      dragging.current = false;
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const inCooldown = cooldown > 0;

  return (
    <div
      ref={containerRef}
      style={{ left: pos.x, top: pos.y }}
      className="fixed z-40 w-48 select-none"
      onMouseDown={onMouseDown}
    >
      <div className="rounded-xl overflow-hidden border border-[var(--border)] shadow-xl bg-black cursor-grab active:cursor-grabbing">
        <div className="relative aspect-[4/3] w-full bg-slate-900">
          <video autoPlay playsInline muted className="h-full w-full object-cover -scale-x-100" />
          <div className="absolute top-1.5 left-1.5 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-medium text-slate-300">Live</span>
          </div>

          <div className="absolute bottom-1.5 right-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-mono text-slate-400 backdrop-blur-sm">
            {fps} FPS
          </div>
        </div>

        <div className="bg-slate-950 p-2 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Warnings</span>
            <span className="font-bold text-amber-400">{warnCount} / 3</span>
          </div>

          {inCooldown && (
            <div className="mt-1 flex items-center justify-between text-[10px] text-sky-400 font-mono">
              <span>Cooldown</span>
              <span>{cooldown}s</span>
            </div>
          )}

          {activeViolations.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {activeViolations.map((v, i) => (
                <span
                  key={i}
                  className="rounded bg-red-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-red-400 border border-red-500/30"
                >
                  {v}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
