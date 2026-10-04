import test from "node:test";
import assert from "node:assert/strict";

import { estimateGaze } from "../ai/gazeTracker.js";
import { estimateHeadPose } from "../ai/headPose.js";
import { detectBlink } from "../ai/blinkDetector.js";
import { trackFace } from "../ai/faceTracker.js";

function buildLandmarks(overrides = {}) {
  const landmarks = Array.from({ length: 500 }, () => ({
    x: 0.5,
    y: 0.5,
    z: 0,
  }));

  const defaults = {
    33: { x: 0.45, y: 0.5, z: 0 },
    263: { x: 0.55, y: 0.5, z: 0 },
    1: { x: 0.5, y: 0.5, z: 0 },
    159: { x: 0.45, y: 0.48, z: 0 },
    145: { x: 0.45, y: 0.52, z: 0 },
    386: { x: 0.55, y: 0.48, z: 0 },
    374: { x: 0.55, y: 0.52, z: 0 },
  };

  for (const [index, value] of Object.entries({ ...defaults, ...overrides })) {
    const targetIndex = Number(index);
    landmarks[targetIndex] = { ...landmarks[targetIndex], ...value };
  }

  return landmarks;
}

test("estimateGaze returns CENTER for centered landmarks", () => {
  const landmarks = buildLandmarks();
  const result = estimateGaze(landmarks);

  assert.equal(result.direction, "CENTER");
  assert.equal(result.confidence, 0.8);
});

test("estimateGaze returns RIGHT when the nose is shifted right", () => {
  const landmarks = buildLandmarks({ 1: { x: 0.6, y: 0.5, z: 0 } });
  const result = estimateGaze(landmarks);

  assert.equal(result.direction, "RIGHT");
  assert.ok(result.confidence > 0.5);
});

test("estimateHeadPose reports a leftward yaw for a face shifted left", () => {
  const landmarks = buildLandmarks({ 1: { x: 0.3, y: 0.5, z: 0 } });
  const result = estimateHeadPose(landmarks);

  assert.ok(result.yaw < 0);
});

test("detectBlink flags closed eyes when the eye gap is very small", () => {
  const landmarks = buildLandmarks({
    159: { x: 0.45, y: 0.5, z: 0 },
    145: { x: 0.45, y: 0.5, z: 0 },
    386: { x: 0.55, y: 0.5, z: 0 },
    374: { x: 0.55, y: 0.5, z: 0 },
  });
  const result = detectBlink(landmarks);

  assert.equal(result.eyesClosed, true);
  assert.ok(result.ear < 0.02);
});

test("trackFace reports one visible face for valid landmarks", () => {
  const landmarks = buildLandmarks();
  const result = trackFace(landmarks);

  assert.equal(result.present, true);
  assert.equal(result.count, 1);
});
