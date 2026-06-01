import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { sampleBoardDecisionPathResilienceScorecard } from "../src/data/sampleVerticalBrief.js";

const fixturesDir = path.resolve("fixtures");
mkdirSync(fixturesDir, { recursive: true });

rmSync(path.join(fixturesDir, "board-decision-chain-integrity-brief.json"), { force: true });
rmSync(path.join(fixturesDir, "board-decision-chain-integrity-brief-clean.json"), { force: true });

writeFileSync(
  path.join(fixturesDir, "board-decision-path-resilience-scorecard.json"),
  JSON.stringify(sampleBoardDecisionPathResilienceScorecard, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "board-decision-path-resilience-scorecard-clean.json"),
  JSON.stringify(
    sampleBoardDecisionPathResilienceScorecard.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
