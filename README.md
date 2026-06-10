# Board Decision Path Resilience Scorecard

Board-ready path-resilience scorecard for tracking whether a decision path can absorb another cycle without fresh breakage, delay, or confidence loss.

- Live: `https://resilience.kineticgain.com/`
- Repo: `mizcausevic-dev/board-decision-path-resilience-scorecard`

## Why this matters

Leaders need more than a point-in-time integrity readout. They need one scorecard that shows which decision paths will hold under more load, which ones will snap on the next cycle, and where resilience investment belongs first.

## What it includes

- TypeScript executive-intelligence surface for path-resilience scoring with modeled executive lanes, fragility thresholds, and board-safe reinforcement posture
- synthetic executive lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness
- reusable outputs for resilience lanes, failure thresholds, reinforcement packets, and board-ready operating memos
- prerendered static site, JSON payloads, screenshots, and docs

## Product depth

The scorecard is built for executives who need to decide whether an operating path can survive another board cycle without a fresh escalation, budget miss, or credibility loss. It translates technical and operating signals into three buyer-readable questions:

- Where is the decision path brittle enough to fail under another review cycle?
- Which reinforcement move protects the most value before the next board packet?
- What story can leadership tell about resilience without hiding behind tool-by-tool status updates?

For technical teams, the repo demonstrates a small but reproducible decision-intelligence surface: typed fixtures, deterministic scoring, static HTML rendering, API payloads, CLI summaries, screenshots, and verification notes that can be embedded into diligence, governance, or operating-review workflows.

## What these repos have in common

This repo belongs to the Kinetic Gain executive-intelligence family. The shared pattern is consistent across the suite:

- one board-facing problem framed in non-technical language
- one operator-readable data model that keeps owners, risks, actions, and evidence attached
- one static public surface that can be reviewed without credentials
- one CLI/API layer that proves the surface is generated from structured inputs
- one verification trail that separates synthetic demonstration data from live operating claims

## Operating workflow

1. Load the modeled resilience lanes from fixtures.
2. Score handoff fragility, failure proximity, escalation gaps, recovery weakness, surge tolerance, and board-confidence risk.
3. Render the same packet as web pages, JSON, CLI output, and README screenshots.
4. Use the result as a board-prep or investor-diligence aid for deciding where to reinforce before execution quality degrades.

## Routes

- `/`
- `/resilience-lanes`
- `/failure-thresholds`
- `/reinforcement-posture`
- `/verification`
- `/docs`

## Local run

```bash
cd board-decision-path-resilience-scorecard
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI

```bash
npx board-decision-path-resilience-scorecard fixtures/board-decision-path-resilience-scorecard.json --format summary
npx board-decision-path-resilience-scorecard fixtures/board-decision-path-resilience-scorecard-clean.json --format json
```

## Docs

- [Architecture](docs/architecture.md)
- [Origin](docs/ORIGIN.md)
- [Kinetic Gain Embedded](docs/KINETIC_GAIN_EMBEDDED.md)

## Screenshots

![Overview](screenshots/01-overview-proof.png)
![Resilience lanes](screenshots/02-resilience-lanes-proof.png)
![Failure thresholds](screenshots/03-failure-thresholds-proof.png)
![Reinforcement posture](screenshots/04-reinforcement-posture-proof.png)
