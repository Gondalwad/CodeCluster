class FrameCapture {
  constructor() {
    this._canvas = document.createElement("canvas");
    this._ctx = this._canvas.getContext("2d");
  }

  capture(videoElement) {
    if (!videoElement || videoElement.readyState < 2) {
      return null;
    }

    const w = videoElement.videoWidth;
    const h = videoElement.videoHeight;

    if (w === 0 || h === 0) return null;

    if (this._canvas.width !== w || this._canvas.height !== h) {
      this._canvas.width = w;
      this._canvas.height = h;
    }

    this._ctx.drawImage(videoElement, 0, 0);
    return this._canvas;
  }
}

export default new FrameCapture();
