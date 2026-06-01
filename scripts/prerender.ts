import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  renderDocs,
  renderFailureThresholds,
  renderPathResilienceOverview,
  renderReinforcementPosture,
  renderResilienceLanes,
  renderVerification
} from "../src/services/render.js";
import { failureThresholds, payload, reinforcementPosture, resilienceLanes, riskMap, summary, verification } from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
rmSync(root, { recursive: true, force: true });
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderPathResilienceOverview()]],
  ["/resilience-lanes", ["resilience-lanes/index.html", renderResilienceLanes()]],
  ["/failure-thresholds", ["failure-thresholds/index.html", renderFailureThresholds()]],
  ["/reinforcement-posture", ["reinforcement-posture/index.html", renderReinforcementPosture()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://resilience.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://resilience.kineticgain.com/</loc></url><url><loc>https://resilience.kineticgain.com/resilience-lanes/</loc></url><url><loc>https://resilience.kineticgain.com/failure-thresholds/</loc></url><url><loc>https://resilience.kineticgain.com/reinforcement-posture/</loc></url><url><loc>https://resilience.kineticgain.com/verification/</loc></url><url><loc>https://resilience.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/resilience-lanes.json": resilienceLanes(),
  "api/failure-thresholds.json": failureThresholds(),
  "api/reinforcement-posture.json": reinforcementPosture(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
