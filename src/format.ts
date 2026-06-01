export function formatSummary(
  summary: {
    items: number;
    constrainedLanes: number;
    resiliencePriorityLanes: number;
    averageBoardConfidence: number;
    valueAtStakeMillions: number;
    leadingMessage: string;
  },
  title = "Board Decision Path Resilience Scorecard"
) {
  return [
    title,
    `Lanes: ${summary.items}`,
    `Constrained lanes: ${summary.constrainedLanes}`,
    `Resilience-priority lanes: ${summary.resiliencePriorityLanes}`,
    `Average board confidence: ${summary.averageBoardConfidence}`,
    `Value at stake: $${summary.valueAtStakeMillions}M`,
    `Leading message: ${summary.leadingMessage}`
  ].join("\n");
}
