import { PROCTORING_CONFIG } from "../config";

class CameraManager {
  constructor() {
    this.stream = null;
  }

  async start() {
    if (this.stream) {
      return this.stream;
    }

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: PROCTORING_CONFIG.camera.width,
        height: PROCTORING_CONFIG.camera.height,
        frameRate: PROCTORING_CONFIG.camera.fps,
        facingMode: PROCTORING_CONFIG.camera.facingMode,
      },
      audio: false,
    });

    return this.stream;
  }

  stop() {
    if (!this.stream) return;

    this.stream.getTracks().forEach((track) => track.stop());
    this.stream = null;
  }

  attach(videoElement) {
    if (!videoElement || !this.stream) return;

    videoElement.srcObject = this.stream;
  }

  getStream() {
    return this.stream;
  }
}

export default new CameraManager();
