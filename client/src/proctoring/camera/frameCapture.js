class FrameCapture {
  capture(videoElement) {
    if (!videoElement || videoElement.readyState < 2) {
      return null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0);

    return canvas;
  }
}

export default new FrameCapture();
