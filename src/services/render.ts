import {
  failureThresholds,
  payload,
  reinforcementPosture,
  resilienceLanes,
  riskMap,
  summary,
  verification
} from "./verticalBriefService.js";

const productTitle = "Board Decision Path Resilience Scorecard";
const domain = "https://resilience.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/resilience-lanes", "Resilience lanes"],
    ["/failure-thresholds", "Failure thresholds"],
    ["/reinforcement-posture", "Reinforcement posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderPathResilienceOverview() {
  const executiveSummary = summary();
  const lanes = resilienceLanes().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.owner)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Resilience theme:</strong> ${escapeHtml(item.resilienceTheme)}</p>
        <p><strong>Decision handoffs:</strong> ${item.decisionHandoffs} · <strong>Cycles to failure:</strong> ${item.decisionCyclesToFailure}</p>
        <p><strong>Board confidence:</strong> ${item.boardConfidenceScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeResilienceRiskScore} · confidence ${item.boardConfidenceScore} · $${item.valueAtStakeMillions}M at stake</li>`
    )
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Path resilience</span>
      <h1>Which decision paths can absorb one more cycle cleanly, and which ones will break before the board gets another stable packet?</h1>
      <p class="lede">Board Decision Path Resilience Scorecard turns fragile handoffs, thin recovery, weak surge tolerance, and shrinking board confidence into one executive packet for reinforcement before another cycle compounds the damage.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Resilience lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled decision paths in the current board-facing estate.</div></div>
        <div class="metric"><span class="metric-label">Constrained lanes</span><span class="metric-value">${executiveSummary.constrainedLanes}</span><div class="metric-copy">Paths already showing high fragility, weak recovery, or low tolerance.</div></div>
        <div class="metric"><span class="metric-label">Priority lanes</span><span class="metric-value">${executiveSummary.resiliencePriorityLanes}</span><div class="metric-copy">Paths that justify hardening or redundancy before more load arrives.</div></div>
        <div class="metric"><span class="metric-label">Value at stake</span><span class="metric-value">$${executiveSummary.valueAtStakeMillions}M</span><div class="metric-copy">Modeled exposure tied to fragile board-facing decision paths.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Resilience lanes</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible fragility</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready path-resilience scorecard for exposing fragile decision paths, weak recovery, and where reinforcement belongs first."
  );
}

export function renderResilienceLanes() {
  const rows = resilienceLanes()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.resilienceTheme)}</td>
        <td>${item.decisionHandoffs}</td>
        <td>${item.decisionCyclesToFailure}</td>
        <td>${item.boardConfidenceScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Resilience lanes",
    "/resilience-lanes",
    `<section class="hero">
      <span class="eyebrow">Resilience lanes</span>
      <h1>Each lane keeps one owner, one audience, one resilience problem, and one next reinforcement move attached.</h1>
      <p class="lede">The resilience-lane view keeps decision-path durability readable instead of hiding it inside more committee motion.</p>
      <div class="nav">${navLinks("/resilience-lanes")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Resilience theme</th><th>Handoffs</th><th>Cycles to failure</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Decision-path resilience view showing owners, actions, fragility pressure, and board-confidence strength."
  );
}

export function renderFailureThresholds() {
  const rows = failureThresholds()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.resilienceHeadline)}</td>
        <td>${escapeHtml(item.resilienceSignal)}</td>
        <td>${escapeHtml(item.nextFailurePoint)}</td>
        <td>${item.decisionCyclesToFailure}</td>
        <td>${item.escalationGaps}</td>
        <td>${escapeHtml(item.requiredReinforcements.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Failure thresholds",
    "/failure-thresholds",
    `<section class="hero">
      <span class="eyebrow">Failure thresholds</span>
      <h1>Failure points, escalation load, and required reinforcements stay visible in one scorecard instead of scattering across review notes.</h1>
      <p class="lede">This view compares resilience headlines, failure signals, and the exact reinforcements needed to keep the next board packet from landing on a broken path.</p>
      <div class="nav">${navLinks("/failure-thresholds")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Headline</th><th>Resilience signal</th><th>Next failure point</th><th>Cycles to failure</th><th>Escalation gaps</th><th>Required reinforcements</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Failure-threshold view showing fragility signals, next failure points, and reinforcements needed before another board cycle."
  );
}

export function renderReinforcementPosture() {
  const rows = reinforcementPosture()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.compositeResilienceRiskScore}</td>
        <td>${escapeHtml(item.handoffs.severity)}</td>
        <td>${escapeHtml(item.failureCycles.severity)}</td>
        <td>${escapeHtml(item.escalationGaps.severity)}</td>
        <td>${escapeHtml(item.recovery.severity)}</td>
        <td>${escapeHtml(item.tolerance.severity)}</td>
        <td>${escapeHtml(item.boardConfidence.severity)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Reinforcement posture",
    "/reinforcement-posture",
    `<section class="hero">
      <span class="eyebrow">Reinforcement posture</span>
      <h1>Composite resilience risk stays tied to the exact weakness making another board cycle unsafe.</h1>
      <p class="lede">This reinforcement view keeps handoff strain, failure proximity, escalation gaps, recovery weakness, surge tolerance, and board confidence in one board-readable posture instead of separate operating stories.</p>
      <div class="nav">${navLinks("/reinforcement-posture")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Action</th><th>Risk</th><th>Handoffs</th><th>Failure cycles</th><th>Escalation gaps</th><th>Recovery</th><th>Tolerance</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Reinforcement posture view for resilience risk, recovery weakness, surge tolerance, and board-confidence severity."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this resilience packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone mistakes the sample for a live board decision-path resilience scorecard.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
      <pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre>
    </section>`,
    "Verification notes for the Board Decision Path Resilience Scorecard sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Decision Path Resilience Scorecard docs</h1>
      <p class="lede">This surface packages board-readable resilience signals into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/resilience-lanes</code> keeps owner, audience, action, and resilience pressure attached.</li>
        <li><code>/failure-thresholds</code> compares resilience signals, failure points, and reinforcement needs.</li>
        <li><code>/reinforcement-posture</code> scores handoffs, failure proximity, escalation gaps, recovery, tolerance, and board-confidence strain.</li>
        <li><code>/api/payload</code> exposes the reproducible resilience packet.</li>
      </ul>
    </section>`,
    "Product documentation for Board Decision Path Resilience Scorecard and its board-ready routes."
  );
}
