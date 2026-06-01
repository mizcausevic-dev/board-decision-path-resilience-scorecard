import type {
  BoardDecisionPathResilienceScorecardExport,
  BoardDecisionPathResilienceScorecardItem,
  BoardDecisionPathResilienceScorecardReportItem,
  ResilienceAssessment,
  ResilienceSeverity
} from "./types.js";

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): ResilienceAssessment {
  let severity: ResilienceSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): ResilienceAssessment {
  let severity: ResilienceSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardDecisionPathResilienceScorecardItem[],
  options: { now?: string } = {}
): BoardDecisionPathResilienceScorecardExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardDecisionPathResilienceScorecardReportItem[] = items.map((item) => {
    const handoffAssessment = assessDelay(
      item.decisionHandoffs,
      2,
      4,
      "Decision handoffs remain short enough to keep the path resilient.",
      "Decision handoffs are stretching and may soon erode path resilience.",
      "Decision handoffs are now too long to trust the path under another cycle."
    );

    const cycleAssessment = assessDelay(
      item.decisionCyclesToFailure,
      1,
      2,
      "The path can absorb another cycle before failure pressure matters.",
      "The path is only a cycle or two away from visible failure.",
      "The path is already too close to failure for another clean cycle."
    );

    const escalationAssessment = assessDelay(
      item.escalationGaps,
      0,
      1,
      "Escalation gaps remain low enough to preserve resilience.",
      "Escalation gaps are starting to weaken the path.",
      "Escalation gaps are now overwhelming the path."
    );

    const recoveryAssessment = assessStrength(
      item.breakRecoveryScore,
      78,
      62,
      "Recovery strength is high enough to absorb path breakage.",
      "Recovery strength is uneven and may soon expose fragility.",
      "Recovery strength is too weak to support another cycle."
    );

    const toleranceAssessment = assessStrength(
      item.surgeToleranceScore,
      78,
      62,
      "Surge tolerance is strong enough to handle extra load.",
      "Surge tolerance is thinning and may soon expose bottlenecks.",
      "Surge tolerance is too weak to support the current growth load."
    );

    const confidenceAssessment = assessStrength(
      item.boardConfidenceScore,
      78,
      62,
      "Board confidence remains strong enough to trust the path.",
      "Board confidence is becoming dependent on extra explanation.",
      "Board confidence is too thin to trust the path under more load."
    );

    const compositeResilienceRiskScore =
      Math.round(
        ((item.decisionHandoffs * 10 +
          item.decisionCyclesToFailure * 12 +
          item.escalationGaps * 12 +
          (100 - item.breakRecoveryScore) +
          (100 - item.surgeToleranceScore) +
          (100 - item.boardConfidenceScore)) /
          7) *
          10
      ) / 10;

    return {
      ...item,
      handoffAssessment,
      cycleAssessment,
      escalationAssessment,
      recoveryAssessment,
      toleranceAssessment,
      confidenceAssessment,
      compositeResilienceRiskScore
    };
  });

  const constrainedLanes = reportItems.filter(
    (item) =>
      item.handoffAssessment.severity === "HIGH" ||
      item.cycleAssessment.severity === "HIGH" ||
      item.escalationAssessment.severity === "HIGH" ||
      item.recoveryAssessment.severity === "HIGH" ||
      item.toleranceAssessment.severity === "HIGH" ||
      item.confidenceAssessment.severity === "HIGH"
  ).length;

  const resiliencePriorityLanes = reportItems.filter(
    (item) => item.action === "HARDEN_PATH" || item.action === "ADD_REDUNDANCY"
  ).length;

  const averageBoardConfidence =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.boardConfidenceScore, 0) / reportItems.length) * 10) / 10;

  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    constrainedLanes === 0
      ? "Decision-path resilience remains strong enough to support the current board packet."
      : constrainedLanes <= 2
        ? "A few lanes need resilience reinforcement before the next board cycle compounds fragility."
        : "Decision-path resilience is now a shared operating constraint and should be reinforced across multiple board-facing lanes.";

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      constrainedLanes,
      resiliencePriorityLanes,
      averageBoardConfidence,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardDecisionPathResilienceScorecardItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
