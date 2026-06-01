export type PathResilienceTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "PROCUREMENT"
  | "BIOTECH";

export type ResilienceAction = "HARDEN_PATH" | "ADD_REDUNDANCY" | "REDUCE_FRICTION" | "BUFFER_LOAD";

export type ResilienceSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardDecisionPathResilienceScorecardItem {
  id: string;
  lane: string;
  track: PathResilienceTrack;
  action: ResilienceAction;
  resilienceTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  resilienceHeadline: string;
  resilienceSignal: string;
  nextFailurePoint: string;
  requiredReinforcements: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  decisionHandoffs: number;
  decisionCyclesToFailure: number;
  escalationGaps: number;
  breakRecoveryScore: number;
  surgeToleranceScore: number;
  boardConfidenceScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface ResilienceAssessment {
  severity: ResilienceSeverity;
  ok: boolean;
  message: string;
}

export interface BoardDecisionPathResilienceScorecardReportItem extends BoardDecisionPathResilienceScorecardItem {
  handoffAssessment: ResilienceAssessment;
  cycleAssessment: ResilienceAssessment;
  escalationAssessment: ResilienceAssessment;
  recoveryAssessment: ResilienceAssessment;
  toleranceAssessment: ResilienceAssessment;
  confidenceAssessment: ResilienceAssessment;
  compositeResilienceRiskScore: number;
}

export interface BoardDecisionPathResilienceScorecardSummary {
  items: number;
  constrainedLanes: number;
  resiliencePriorityLanes: number;
  averageBoardConfidence: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardDecisionPathResilienceScorecardExport {
  generatedAt: string;
  summary: BoardDecisionPathResilienceScorecardSummary;
  items: BoardDecisionPathResilienceScorecardReportItem[];
}

export interface BoardDecisionPathResilienceScorecardPayload {
  report: BoardDecisionPathResilienceScorecardExport;
  resilienceLanes: ReturnType<typeof import("./services/verticalBriefService.js").resilienceLanes>;
  failureThresholds: ReturnType<typeof import("./services/verticalBriefService.js").failureThresholds>;
  reinforcementPosture: ReturnType<typeof import("./services/verticalBriefService.js").reinforcementPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardDecisionPathResilienceScorecardItem[];
}
