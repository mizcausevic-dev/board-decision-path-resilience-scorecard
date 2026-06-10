import { describe, expect, it } from "vitest";
import {
  renderDocs,
  renderFailureThresholds,
  renderPathResilienceOverview,
  renderReinforcementPosture,
  renderResilienceLanes,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderPathResilienceOverview()).toContain("Board Decision Path Resilience Scorecard");
  });

  it("renders the product depth and shared Kinetic Gain pattern", () => {
    const html = renderPathResilienceOverview();

    expect(html).toContain("Product depth");
    expect(html).toContain("What these repos have in common");
    expect(html).toContain("portfolio.kineticgain.com");
    expect(html).toContain("suite.kineticgain.com");
    expect(html).toContain("board-decision-path-resilience-scorecard");
  });

  it("renders the resilience lanes route", () => {
    expect(renderResilienceLanes()).toContain("/resilience-lanes");
  });

  it("renders the failure thresholds route", () => {
    expect(renderFailureThresholds()).toContain("/failure-thresholds");
  });

  it("renders the reinforcement posture route", () => {
    expect(renderReinforcementPosture()).toContain("Composite resilience risk");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic decision-path-resilience data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
