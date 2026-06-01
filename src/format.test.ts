import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("renders the resilience summary lines", () => {
    const output = formatSummary({
      items: 6,
      constrainedLanes: 4,
      resiliencePriorityLanes: 4,
      averageBoardConfidence: 60.5,
      valueAtStakeMillions: 141,
      leadingMessage: "Decision-path resilience needs reinforcement."
    });

    expect(output).toContain("Board Decision Path Resilience Scorecard");
    expect(output).toContain("Resilience-priority lanes: 4");
    expect(output).toContain("Decision-path resilience needs reinforcement.");
  });
});
