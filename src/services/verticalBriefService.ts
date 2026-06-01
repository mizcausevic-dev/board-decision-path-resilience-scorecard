import { analyze } from "../analyze.js";
import { sampleBoardDecisionPathResilienceScorecard } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardDecisionPathResilienceScorecard, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Harden the AI and procurement paths first, add redundancy in revenue and biotech second, reduce identity friction third, and buffer the FinTech lane before more board-facing load arrives."
  };
}

export function resilienceLanes() {
  return sampleBoardDecisionPathResilienceScorecard.map((item) => ({
    lane: item.lane,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    resilienceTheme: item.resilienceTheme,
    boardConfidenceScore: item.boardConfidenceScore,
    nextMove: item.nextMove,
    decisionHandoffs: item.decisionHandoffs,
    decisionCyclesToFailure: item.decisionCyclesToFailure
  }));
}

export function failureThresholds() {
  return sampleBoardDecisionPathResilienceScorecard.map((item) => ({
    lane: item.lane,
    resilienceHeadline: item.resilienceHeadline,
    resilienceSignal: item.resilienceSignal,
    nextFailurePoint: item.nextFailurePoint,
    requiredReinforcements: item.requiredReinforcements,
    decisionCyclesToFailure: item.decisionCyclesToFailure,
    escalationGaps: item.escalationGaps
  }));
}

export function reinforcementPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeResilienceRiskScore: item.compositeResilienceRiskScore,
    handoffs: item.handoffAssessment,
    failureCycles: item.cycleAssessment,
    escalationGaps: item.escalationAssessment,
    recovery: item.recoveryAssessment,
    tolerance: item.toleranceAssessment,
    boardConfidence: item.confidenceAssessment
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    valueAtStakeMillions: item.valueAtStakeMillions,
    compositeResilienceRiskScore: item.compositeResilienceRiskScore,
    boardConfidenceScore: item.boardConfidenceScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic decision-path-resilience data only - no live board packets, actual committee routes, or real operational escalations are included.",
    "Scores are modeled to show how Kinetic Gain can turn path fragility, thin recovery, and weak surge tolerance into board-readable reinforcement decisions.",
    "All routes are read-only and demonstrate board-facing resilience packaging, not production workflow automation."
  ];
}

export function payload() {
  return {
    report,
    resilienceLanes: resilienceLanes(),
    failureThresholds: failureThresholds(),
    reinforcementPosture: reinforcementPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardDecisionPathResilienceScorecard
  };
}
