export const PROCTORING_CONFIG = {
  websocketUrl: "ws://127.0.0.1:8000/ws/proctor/test123",

  camera: {
    width: 640,
    height: 480,
    fps: 30,
    facingMode: "user",
  },

  streaming: {
    frameRate: 3,
    imageType: "image/jpeg",
    imageQuality: 0.9,
  },

  audio: {
    chunkDuration: 250,
    sampleRate: 16000,
    channelCount: 1,
  },
};
