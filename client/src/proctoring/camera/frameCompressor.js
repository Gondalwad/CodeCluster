import { PROCTORING_CONFIG } from "../config";

class FrameCompressor {
  compress(canvas) {
    if (!canvas) return Promise.resolve(null);

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        PROCTORING_CONFIG.streaming.imageType,
        PROCTORING_CONFIG.streaming.imageQuality,
      );
    });
  }
}

export default new FrameCompressor();
