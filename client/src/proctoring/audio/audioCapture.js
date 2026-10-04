class AudioCapture {
  constructor() {
    this.mediaRecorder = null;
  }

  start(stream, onChunk) {
    if (!stream) return;

    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        onChunk?.(event.data);
      }
    };
  }

  record(chunkDuration) {
    if (this.mediaRecorder && this.mediaRecorder.state === "inactive") {
      this.mediaRecorder.start(chunkDuration);
    }
  }

  stop() {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
    }

    this.mediaRecorder = null;
  }
}

export default new AudioCapture();
