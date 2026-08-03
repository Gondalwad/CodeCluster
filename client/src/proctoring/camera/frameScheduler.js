import { PROCTORING_CONFIG } from "../config";

class FrameScheduler {
  constructor() {
    this.intervalId = null;
  }

  start(callback) {
    if (this.intervalId) return;

    const interval = 1000 / PROCTORING_CONFIG.streaming.frameRate;

    this.intervalId = setInterval(() => {
      callback?.();
    }, interval);
  }

  stop() {
    if (!this.intervalId) return;

    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  isRunning() {
    return this.intervalId !== null;
  }
}

export default new FrameScheduler();
