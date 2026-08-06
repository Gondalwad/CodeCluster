import { PROCTORING_CONFIG } from "../config";

class FrameScheduler {
  constructor() {
    this.running = false;
    this.timeoutId = null;
  }

  start(callback) {
    if (this.running) return;
    this.running = true;
    const interval = 1000 / PROCTORING_CONFIG.streaming.frameRate;

    const loop = async () => {
      if (!this.running) return;
      try {
        await callback?.();
      } catch (_) {}
      if (this.running) {
        this.timeoutId = setTimeout(loop, interval);
      }
    };

    this.timeoutId = setTimeout(loop, interval);
  }

  stop() {
    this.running = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  isRunning() {
    return this.running;
  }
}

export default new FrameScheduler();
