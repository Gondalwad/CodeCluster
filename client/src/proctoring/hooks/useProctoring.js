import { useEffect, useMemo, useState } from "react";

import cameraManager from "../camera/cameraManager";
import frameCapture from "../camera/frameCapture";
import frameCompressor from "../camera/frameCompressor";
import frameScheduler from "../camera/frameScheduler";

import microphoneManager from "../audio/microphoneManager";
import audioStreamer from "../audio/audioStreamer";
import useWebSocket from "./useWebSocket";

export default function useProctoring({ videoRef, enabled = false }) {
  const [status, setStatus] = useState("idle");

  const websocket = useWebSocket(enabled);

  useEffect(() => {
    if (!enabled) return;

    let mounted = true;

    async function start() {
      try {
        setStatus("starting");

        const cameraStream = await cameraManager.start();

        if (!mounted) return;

        cameraManager.attach(videoRef.current);

        const micStream = await microphoneManager.start();

        frameScheduler.start(async () => {
          const canvas = frameCapture.capture(videoRef.current);

          const frame = await frameCompressor.compress(canvas);

          if (frame) {
            websocket.sendFrame(frame);
          }
        });

        audioStreamer.start(micStream, websocket.sendAudio);

        setStatus("running");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    }

    start();

    return () => {
      mounted = false;

      frameScheduler.stop();
      audioStreamer.stop();

      cameraManager.stop();
      microphoneManager.stop();
    };
  }, [enabled, videoRef]);

  return useMemo(
    () => ({
      status,
      websocket,
    }),
    [status, websocket],
  );
}
