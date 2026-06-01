import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleBoardDecisionPathResilienceScorecard } from "../src/data/sampleVerticalBrief.js";
import type { BoardDecisionPathResilienceScorecardItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardDecisionPathResilienceScorecard, { now: "2026-06-01T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardDecisionPathResilienceScorecard.length);
  });

  it("counts constrained lanes", () => {
    const report = analyze(sampleBoardDecisionPathResilienceScorecard, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.constrainedLanes).toBeGreaterThan(0);
  });

  it("counts resilience-priority lanes", () => {
    const report = analyze(sampleBoardDecisionPathResilienceScorecard, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.resiliencePriorityLanes).toBeGreaterThan(0);
  });

  it("sums value at stake", () => {
    const report = analyze(sampleBoardDecisionPathResilienceScorecard, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.valueAtStakeMillions).toBe(141);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardDecisionPathResilienceScorecard, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.items).toBe(0);
    expect(report.summary.averageBoardConfidence).toBe(0);
    expect(report.summary.leadingMessage).toContain("remains strong enough");
  });

  it("hits low and medium resilience branches explicitly", () => {
    const fixtures: BoardDecisionPathResilienceScorecardItem[] = [
      {
        id: "low-branch",
        lane: "Low branch lane",
        track: "PROCUREMENT",
        action: "BUFFER_LOAD",
        resilienceTheme: "Low strain path.",
        boardQuestion: "Can the path absorb more load?",
        owner: "Trust owner",
        audience: "Board growth committee",
        currentPosture: "Stable.",
        resilienceHeadline: "Low branch is healthy.",
        resilienceSignal: "Path is resilient.",
        nextFailurePoint: "None immediate",
        requiredReinforcements: ["path log"],
        relatedSurfaces: ["procurement.kineticgain.com"],
        companyTags: ["Google"],
        decisionHandoffs: 2,
        decisionCyclesToFailure: 1,
        escalationGaps: 0,
        breakRecoveryScore: 82,
        surgeToleranceScore: 80,
        boardConfidenceScore: 79,
        valueAtStakeMillions: 5,
        headline: "Healthy path.",
        narrative: "Low branch test.",
        nextMove: "Keep the path buffered."
      },
      {
        id: "medium-branch",
        lane: "Medium branch lane",
        track: "IDENTITY",
        action: "REDUCE_FRICTION",
        resilienceTheme: "Medium strain path.",
        boardQuestion: "Where are the first fractures?",
        owner: "Security owner",
        audience: "Audit committee",
        currentPosture: "Watch state.",
        resilienceHeadline: "Medium branch is watch-listed.",
        resilienceSignal: "Failure pressure is building.",
        nextFailurePoint: "Escalation collision",
        requiredReinforcements: ["gap log"],
        relatedSurfaces: ["certs.kineticgain.com"],
        companyTags: ["Okta"],
        decisionHandoffs: 4,
        decisionCyclesToFailure: 2,
        escalationGaps: 1,
        breakRecoveryScore: 70,
        surgeToleranceScore: 68,
        boardConfidenceScore: 65,
        valueAtStakeMillions: 7,
        headline: "Watch the path.",
        narrative: "Medium branch test.",
        nextMove: "Reduce friction."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-01T00:00:00Z" });
    expect(report.items[0].handoffAssessment.severity).toBe("LOW");
    expect(report.items[0].recoveryAssessment.severity).toBe("LOW");
    expect(report.items[1].handoffAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].cycleAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].recoveryAssessment.severity).toBe("MEDIUM");
    expect(report.summary.leadingMessage).toContain("remains strong enough");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleBoardDecisionPathResilienceScorecard, { now: "2026-06-01T00:00:00Z" });
    expect(report.summary.items).toBe(sampleBoardDecisionPathResilienceScorecard.length);
  });
});
