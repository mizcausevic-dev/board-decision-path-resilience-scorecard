import express from "express";
import {
  failureThresholds,
  payload,
  reinforcementPosture,
  resilienceLanes,
  riskMap,
  summary,
  verification
} from "./services/verticalBriefService.js";
import {
  renderDocs,
  renderFailureThresholds,
  renderPathResilienceOverview,
  renderReinforcementPosture,
  renderResilienceLanes,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderPathResilienceOverview()));
  app.get("/resilience-lanes", (_req, res) => res.type("html").send(renderResilienceLanes()));
  app.get("/failure-thresholds", (_req, res) => res.type("html").send(renderFailureThresholds()));
  app.get("/reinforcement-posture", (_req, res) => res.type("html").send(renderReinforcementPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/resilience-lanes", (_req, res) => res.json(resilienceLanes()));
  app.get("/api/failure-thresholds", (_req, res) => res.json(failureThresholds()));
  app.get("/api/reinforcement-posture", (_req, res) => res.json(reinforcementPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`board-decision-path-resilience-scorecard listening on http://127.0.0.1:${port}`);
  });
}
