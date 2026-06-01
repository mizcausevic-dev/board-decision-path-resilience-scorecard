import { describe, expect, it } from "vitest";
import { failureThresholds, payload, reinforcementPosture, resilienceLanes, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the path resilience summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the resilience lanes view", () => {
    expect(resilienceLanes().length).toBeGreaterThan(0);
  });

  it("returns the failure thresholds view", () => {
    expect(failureThresholds().length).toBeGreaterThan(0);
  });

  it("returns the reinforcement posture view", () => {
    expect(reinforcementPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.items).toBeGreaterThan(0);
  });
});
