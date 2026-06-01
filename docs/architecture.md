# Architecture

Board Decision Path Resilience Scorecard is a static-friendly TypeScript executive-intelligence surface for showing where decision paths will fail under another cycle, where reinforcement belongs first, and how much board confidence is being carried by weak recovery and thin surge tolerance.

## Routes

- `/`
- `/resilience-lanes`
- `/failure-thresholds`
- `/reinforcement-posture`
- `/verification`
- `/docs`

## Data Flow

1. Sample decision-path-resilience items are modeled in `src/data/sampleVerticalBrief.ts`.
2. `src/analyze.ts` scores handoff pressure, cycles to failure, escalation gaps, recovery strength, surge tolerance, and board confidence.
3. `src/services/verticalBriefService.ts` shapes the board-readable resilience packet plus the JSON payload routes.
4. `src/services/render.ts` turns those outputs into static-friendly HTML.
5. `scripts/prerender.ts` writes the routes and JSON payloads into `site/`.
