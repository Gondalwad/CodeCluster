import { PROCTORING_CONFIG } from "../config";

const TARGET_SAMPLE_RATE = PROCTORING_CONFIG.audio.sampleRate; // 16000
const CHUNK_DURATION_MS  = PROCTORING_CONFIG.audio.chunkDuration; // 250
const BUFFER_SIZE        = 4096;

class AudioCapture {
  constructor() {
    this._ctx        = null;
    this._source     = null;
    this._processor  = null;
    this._onChunk    = null;
    this._pcmBuffer  = [];
    this._samplesNeeded = Math.floor(TARGET_SAMPLE_RATE * CHUNK_DURATION_MS / 1000);
  }

  start(stream, onChunk) {
    if (!stream) return;
    this._onChunk = onChunk;
    this._pcmBuffer = [];

    this._ctx = new AudioContext({ sampleRate: TARGET_SAMPLE_RATE });
    this._source = this._ctx.createMediaStreamSource(stream);

    this._processor = this._ctx.createScriptProcessor(BUFFER_SIZE, 1, 1);
    const maxBufferSamples = this._samplesNeeded * 8; // cap at ~2s of audio
    this._processor.onaudioprocess = (e) => {
      const float32 = e.inputBuffer.getChannelData(0);
      for (let i = 0; i < float32.length; i++) {
        this._pcmBuffer.push(float32[i]);
      }
      // Drop oldest samples if buffer grows too large (WS backpressure)
      if (this._pcmBuffer.length > maxBufferSamples) {
        this._pcmBuffer.splice(0, this._pcmBuffer.length - maxBufferSamples);
      }
      while (this._pcmBuffer.length >= this._samplesNeeded) {
        const chunk = this._pcmBuffer.splice(0, this._samplesNeeded);
        this._sendPCM(chunk);
      }
    };

    this._source.connect(this._processor);
    this._processor.connect(this._ctx.destination);
  }

  _sendPCM(float32Chunk) {
    const int16 = new Int16Array(float32Chunk.length);
    for (let i = 0; i < float32Chunk.length; i++) {
      int16[i] = Math.max(-32768, Math.min(32767, float32Chunk[i] * 32768));
    }
    this._onChunk?.(int16.buffer);
  }

  record(_chunkDuration) {
    // no-op: recording starts immediately in start()
  }

  stop() {
    if (this._processor) {
      this._processor.disconnect();
      this._processor.onaudioprocess = null;
      this._processor = null;
    }
    if (this._source) {
      this._source.disconnect();
      this._source = null;
    }
    if (this._ctx) {
      this._ctx.close();
      this._ctx = null;
    }
    this._pcmBuffer = [];
    this._onChunk = null;
  }
}

export default new AudioCapture();
