import { PROCTORING_CONFIG } from "../config";
import audioCapture from "./audioCapture";

class AudioStreamer {
  start(stream, sendChunk) {
    audioCapture.start(stream, sendChunk);
    audioCapture.record(PROCTORING_CONFIG.audio.chunkDuration);
  }

  stop() {
    audioCapture.stop();
  }
}

export default new AudioStreamer();
