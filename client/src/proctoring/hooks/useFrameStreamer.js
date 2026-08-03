import frameCapture from "../camera/frameCapture";
import frameCompressor from "../camera/frameCompressor";
import frameScheduler from "../camera/frameScheduler";

export default function useSnapshotSender(videoElement, sendFrame) {
  const start = () => {
    frameScheduler.start(() => {
      const canvas = frameCapture.capture(videoElement);

      if (!canvas) return;

      const frame = frameCompressor.compress(canvas);

      if (frame) {
        sendFrame(frame);
      }
    });
  };

  const stop = () => {
    frameScheduler.stop();
  };

  return {
    start,
    stop,
  };
}
