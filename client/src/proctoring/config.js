// export const PROCTORING_CONFIG = {
//   websocketUrl: "ws://localhost:8000/ws/proctor/default",

//   camera: {
//     width: 640,
//     height: 480,
//     fps: 30,
//     facingMode: "user",
//   },

//   streaming: {
//     frameRate: 10,
//     imageType: "image/jpeg",
//     imageQuality: 0.7,
//   },

//   audio: {
//     chunkDuration: 250,
//     sampleRate: 16000,
//     channelCount: 1,
//   },
// };

export const PROCTORING_CONFIG = {
  // Temporary test configuration
  // websocketUrl: "ws://localhost:8000/ws/proctor/test123",
  websocketUrl: "ws://127.0.0.1:8000/ws/proctor/test123",

  camera: {
    width: 640,
    height: 480,
    fps: 30,
    facingMode: "user",
  },

  streaming: {
    frameRate: 10,
    imageType: "image/jpeg",
    imageQuality: 0.7,
  },

  audio: {
    chunkDuration: 250,
    sampleRate: 16000,
    channelCount: 1,
  },
};
