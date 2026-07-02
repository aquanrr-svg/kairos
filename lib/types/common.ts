// ─────────────────────────────────────────────
// KAIROS — Shared Interfaces
// Base contracts used across all engines.
// ─────────────────────────────────────────────

import {
  DataStatus,
  GuidelineSource,
  InfarctLocation,
  Severity,
  CareerLevel,
} from "./enums";

// ─── Base Entity ─────────────────────────────
// Every piece of medical data in Kairos
// must extend this. Non-negotiable.

export interface BaseEntity {
  id:          string;
  version:     string;       // semver e.g. "1.0.0"
  lastUpdated: string;       // ISO 8601 date
  status:      DataStatus;
  references:  MedicalReference[];
}

// ─── Numerical Range ─────────────────────────
// Never store a single value where a range
// is medically appropriate.

export interface Range {
  min: number;
  max: number;
}

// ─── Medical Reference ────────────────────────
// Every clinical fact must be traceable
// to an evidence source.

export interface MedicalReference {
  source:    GuidelineSource | string;
  title:     string;
  year:      number;
  url?:      string;
  section?:  string;
}

// ─── Clinical Time ────────────────────────────
// Kairos uses Clinical Time, not real time.
// Only advances when meaningful actions occur.

export interface ClinicalTime {
  hoursElapsed: number;
  minutesElapsed: number;
  lastActionAt:   number;   // clinical minutes
  events:         ClinicalTimeEvent[];
}

export interface ClinicalTimeEvent {
  action:      string;
  advancedBy:  number;      // clinical minutes
  timestamp:   number;      // clinical minutes
}

// ─── Kinetic Profile ──────────────────────────
// For investigations and biomarkers that
// change value over Clinical Time.

export interface KineticProfile {
  riseOnset:  { hoursAfterEvent: Range };
  peak:       { hoursAfterEvent: Range };
  normalises: { hoursAfterEvent: Range };
  note:       string;
}

// ─── Vital Sign Value ────────────────────────
// A single vital with its unit and range.

export interface VitalSignValue {
  range:  Range;
  unit:   string;
}

// ─── Exception ───────────────────────────────
// Context-specific override for a value.
// Example: bradycardia in inferior STEMI.

export interface Exception {
  condition:         string;
  range:             Range;
  locationDependency?: InfarctLocation[];
  note:              string;
}

// ─── Finding Value ────────────────────────────
// A single structured investigation result.
// Hospital Engine decides how to display it.

export interface FindingValue {
  parameter:      string;
  range:          Range;
  unit:           string;
  interpretation: string;  // uses Interpretation enum values
}

// ─── Serialised Rule ─────────────────────────
// Governs when to repeat an investigation.

export interface SerialTestingRule {
  required:  boolean;
  repeatAt:  {
    hoursAfterFirst: number;
    reason:          string;
  }[];
}

// ─── Incorrect Choice ─────────────────────────
// A documented wrong decision for the
// Reflection Engine to use.

export interface IncorrectChoice {
  id:       string;
  name:     string;
  reason:   string;
  severity: "critical" | "high" | "moderate";
}

// ─── Outcome Modifier ─────────────────────────
// Factor that adjusts survival probability.

export interface OutcomeModifier {
  factor:          string;
  survivalPenalty?: number;
  survivalBonus?:   number;
  note?:            string;
}

// ─── Difficulty Config ────────────────────────
// Controls what content a career level sees.

export interface DifficultyConfig {
  level:              CareerLevel[];
  hintsAllowed:       number;
  severityPool:       Severity[];
  atypicalProbability: number;   // 0.0–1.0
}
