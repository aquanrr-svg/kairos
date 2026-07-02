// ─────────────────────────────────────────────
// KAIROS — Reflection Engine Types
// Teaches after simulation. Never interrupts it.
// ─────────────────────────────────────────────

import { ClinicalImportance, ScoreCategory, OutcomeType } from "../../types/enums";

// ─── Decision Record ──────────────────────────
// Every student action recorded during simulation.

export interface DecisionRecord {
  action:           string;
  timestamp:        number;        // clinical minutes
  category:         ScoreCategory;
  correct:          boolean;
  criticalError:    boolean;
  triggeredHookId?: string;
}

// ─── Immediate Reflection ─────────────────────
// Shown immediately after case ends.
// Quick, scannable, emotional.

export interface ImmediateReflection {
  caseId:          string;
  patientName:     string;
  outcome:         OutcomeType;
  score:           number;          // 0–100
  decisions:       DecisionRecord[];
  keyMistakes:     ReflectionEntry[];
  keySuccesses:    ReflectionEntry[];
  summary:         string;
}

// ─── Deep Reflection ──────────────────────────
// Available after Immediate Reflection.
// Detailed, educational, guideline-linked.

export interface DeepReflection {
  caseId:              string;
  idealDecisionPath:   IdealDecisionStep[];
  missedOpportunities: ReflectionEntry[];
  guidelineHighlights: GuidelineHighlight[];
  clinicalPearls:      string[];
}

// ─── Supporting Types ─────────────────────────

export interface ReflectionEntry {
  hookId:     string;
  message:    string;
  importance: ClinicalImportance;
  category:   ScoreCategory;
}

export interface IdealDecisionStep {
  order:    number;
  action:   string;
  reason:   string;
  timing:   string;          // clinical time context
}

export interface GuidelineHighlight {
  source:     string;
  point:      string;
  relevance:  string;
}
