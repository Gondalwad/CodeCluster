import { PROCTORING_CONFIG } from "../config";

class MicrophoneManager {
  constructor() {
    this.stream = null;
  }

  async start() {
    if (this.stream) {
      return this.stream;
    }

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: {
        sampleRate: PROCTORING_CONFIG.audio.sampleRate,
        channelCount: PROCTORING_CONFIG.audio.channelCount,
      },
    });

    return this.stream;
  }

  stop() {
    if (!this.stream) return;

    this.stream.getTracks().forEach((track) => track.stop());
    this.stream = null;
  }

  getStream() {
    return this.stream;
  }
}

export default new MicrophoneManager();
