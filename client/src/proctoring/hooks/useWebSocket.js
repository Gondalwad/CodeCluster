import { useCallback, useEffect, useRef, useState } from "react";
import { PROCTORING_CONFIG } from "../config";
import { PROCTOR_EVENTS } from "../proctorEvents";

export default function useWebSocket(enabled = false) {
  const socketRef = useRef(null);
  const closeRequestedRef = useRef(false);

  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  const [warning, setWarning] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [violations, setViolations] = useState([]);
  const [terminate, setTerminate] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const socket = new WebSocket(PROCTORING_CONFIG.websocketUrl);
    closeRequestedRef.current = false;
    socket.binaryType = "arraybuffer";
    socketRef.current = socket;

    socket.onopen = () => {
      setConnected(true);
      setError(null);
      closeRequestedRef.current = false;
      window.dispatchEvent(new CustomEvent(PROCTOR_EVENTS.WEBSOCKET_CONNECTED));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setWarning(data.warning ?? false);
        setWarningCount(data.warning_count ?? 0);
        setViolations(data.violations ?? []);
        setTerminate(data.terminate ?? false);

        window.dispatchEvent(new CustomEvent(PROCTOR_EVENTS.WARNING_UPDATED, { detail: data }));

        if (data.warning) {
          window.dispatchEvent(new CustomEvent(PROCTOR_EVENTS.WARNING_RECEIVED, { detail: data }));
        }

        if (data.terminate) {
          window.dispatchEvent(new CustomEvent(PROCTOR_EVENTS.EXAM_TERMINATED, { detail: data }));
          if (!closeRequestedRef.current) {
            closeRequestedRef.current = true;
            socket.close();
          }
        }
      } catch (err) {
        console.error("Invalid websocket message:", err);
      }
    };

    socket.onclose = () => {
      closeRequestedRef.current = true;
      setConnected(false);
      socketRef.current = null;
      window.dispatchEvent(new CustomEvent(PROCTOR_EVENTS.WEBSOCKET_DISCONNECTED));
    };

    socket.onerror = () => {
      setConnected(false);
      setError("Unable to connect to backend.");
    };

    return () => {
      if (socket?.readyState === WebSocket.OPEN) {
        closeRequestedRef.current = true;
        socket.close();
      }
      socketRef.current = null;
    };
  }, [enabled]);

  const sendFrame = useCallback((blob) => {
    if (socketRef.current?.readyState !== WebSocket.OPEN || !blob) return;
    // Prefix with 0x01 to identify as video frame
    blob.arrayBuffer().then((buf) => {
      const tagged = new Uint8Array(buf.byteLength + 1);
      tagged[0] = 0x01;
      tagged.set(new Uint8Array(buf), 1);
      socketRef.current?.send(tagged);
    });
  }, []);

  const sendAudio = useCallback((audio) => {
    if (socketRef.current?.readyState !== WebSocket.OPEN) return;
    const pcm = audio instanceof ArrayBuffer ? new Uint8Array(audio) : audio;
    if (!pcm || pcm.byteLength === 0) return;
    const tagged = new Uint8Array(1 + pcm.byteLength);
    tagged[0] = 0x02;
    tagged.set(pcm, 1);
    socketRef.current.send(tagged);
  }, []);

  return { connected, error, warning, warningCount, violations, terminate, sendFrame, sendAudio };
}
