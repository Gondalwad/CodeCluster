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
        if (typeof data !== "object" || data === null) return;
        setWarning(data.warning ?? false);
        setWarningCount(data.warning_count ?? 0);
        setViolations(Array.isArray(data.violations) ? data.violations : []);
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

    socket.onclose = (event) => {
      closeRequestedRef.current = true;
      setConnected(false);
      socketRef.current = null;
      window.dispatchEvent(
        new CustomEvent(PROCTOR_EVENTS.WEBSOCKET_DISCONNECTED, {
          detail: { code: event?.code, reason: event?.reason, wasClean: event?.wasClean },
        })
      );
    };

    socket.onerror = () => {
      setConnected(false);
      setError("Unable to connect to backend.");
    };

    // Keep-alive ping every 15s to prevent idle timeout
    const pingInterval = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send("ping");
      }
    }, 15000);

    return () => {
      clearInterval(pingInterval);
      if (socket?.readyState === WebSocket.OPEN) {
        closeRequestedRef.current = true;
        socket.close();
      }
      socketRef.current = null;
    };
  }, [enabled]);

  const sendFrame = useCallback((blob) => {
    if (socketRef.current?.readyState !== WebSocket.OPEN || !blob) return;
    blob.arrayBuffer().then((buf) => {
      if (socketRef.current?.readyState !== WebSocket.OPEN) return;
      const tagged = new Uint8Array(buf.byteLength + 1);
      tagged[0] = 0x01;
      tagged.set(new Uint8Array(buf), 1);
      socketRef.current.send(tagged);
    });
  }, []);

  const sendAudio = useCallback((audio) => {
    if (socketRef.current?.readyState !== WebSocket.OPEN) return;
    const toBuffer = audio instanceof Blob ? audio.arrayBuffer() : Promise.resolve(audio);
    toBuffer.then((buf) => {
      if (socketRef.current?.readyState !== WebSocket.OPEN) return;
      const pcm = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
      if (!pcm || pcm.byteLength === 0) return;
      const tagged = new Uint8Array(1 + pcm.byteLength);
      tagged[0] = 0x02;
      tagged.set(pcm, 1);
      socketRef.current.send(tagged);
    });
  }, []);

  return { connected, error, warning, warningCount, violations, terminate, sendFrame, sendAudio };
}
