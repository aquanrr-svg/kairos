// ─────────────────────────────────────────────
// KAIROS — Disease Engine Types
// Medical truth only. No UI. No patient identity.
// No hardcoded medicine definitions.
// ─────────────────────────────────────────────

import {
  BaseEntity,
  Range,
  Exception,
  FindingValue,
  KineticProfile,
  SerialTestingRule,
  IncorrectChoice,
  OutcomeModifier,
} from "../../types/common";

import {
  Severity,
  Frequency,
  Typicality,
  InfarctLocation,
  Interpretation,
  InvestigationType,
  InvestigationPriority,
  InvestigationTiming,
  UnlockMethod,
  Reliability,
  ClinicalImportance,
  TreatmentPriority,
  TreatmentTiming,
  RouteOfAdministration,
  ComplicationCategory,
  ComplicationOnset,
  OutcomeType,
  ScoreCategory,
} from "../../types/enums";

import { TreatmentReference } from "../medicine/types";

// ─── Symptom ──────────────────────────────────

export interface Symptom {
  id:                  string;
  name:                string;
  typicality:          Typicality;
  frequency:           Frequency;
  severity:            Severity[];
  redFlag:             boolean;
  clinicalImportance:  ClinicalImportance;
  reliability:         Reliability;
  locationDependency?: InfarctLocation[];
  unlockMethod:        UnlockMethod;
  specialNotes:        string[];
  patientPhrases:      string[];
}

// ─── Vital Sign ───────────────────────────────

export interface VitalSign {
  parameter:      string;
  unit:           string;
  normal:         { range: Range };
  mild:           { range: Range };
  moderate:       { range: Range };
  severe:         { range: Range };
  exceptions?:    Exception[];
  redFlagBelow?:  number;
  redFlagAbove?:  number;
  specialNotes:   string[];
}

// ─── ECG Finding ──────────────────────────────
// Structured so Hospital Engine can
// render an actual ECG waveform in future.

export interface ECGFinding {
  leads:                string[];
  finding:              string;
  interpretation:       Interpretation;
  probability:          number;       // 0.0–1.0
  severity:             Severity[];
  clinicalImportance:   ClinicalImportance;
  locationDependency?:  InfarctLocation[];
}

// ─── Investigation Result ─────────────────────

export interface InvestigationResult {
  severity:         Severity | "normal";
  findings:         FindingValue[];
  ecgFindings?:     ECGFinding[];
  educationalNotes: string;
  redFlags?:        string[];
}

// ─── Investigation ────────────────────────────

export interface Investigation {
  id:                 string;
  name:               string;
  type:               InvestigationType;
  priority:           InvestigationPriority;
  timing:             InvestigationTiming;
  unlockMethod:       UnlockMethod;
  reliability:        Reliability;
  probability:        number;
  kineticProfile?:    KineticProfile;
  falsePositives?:    string[];
  results: {
    normal:           InvestigationResult;
    mild:             InvestigationResult;
    moderate:         InvestigationResult;
    severe:           InvestigationResult;
  };
  redFlagFindings:    string[];
  serialTestingRule?: SerialTestingRule;
  specialNotes:       string[];
}

// ─── Complication ─────────────────────────────

export interface Complication {
  id:                  string;
  name:                string;
  category:            ComplicationCategory;
  onset:               ComplicationOnset;
  timing: {
    hoursAfterEvent:   Range;
  };
  frequency:           Frequency;
  severityRequired:    Severity[];
  locationDependency?: InfarctLocation[];
  prerequisites:       string[];      // conditions that must be true
  redFlag:             boolean;
  educationalNotes:    string;
}

// ─── Outcome ──────────────────────────────────

export interface OutcomeScenario {
  type:             OutcomeType;
  baseProbability:  number;       // 0.0–1.0
  conditions:       string[];     // what must have happened
}

export interface DiseaseOutcome {
  scenarios:        OutcomeScenario[];
  modifiers:        OutcomeModifier[];
  deathIsAllowed:   boolean;
  deathIsCommon:    boolean;
  deathNote:        string;
}

// ─── Reflection Hook ──────────────────────────

export interface ReflectionHook {
  id:          string;
  trigger:     string;
  importance:  ClinicalImportance;
  category:    ScoreCategory;
  weight:      number;          // out of 100 total
  message:     string;
}

export interface PerformanceScoring {
  algorithm:   "weighted";
  weights:     { [key in ScoreCategory]?: number };
  totalPoints: number;
}

// ─── Disease ──────────────────────────────────
// The complete Disease Engine contract.
// No patient data. No UI. No medicine definitions.

export interface Disease extends BaseEntity {
  name:             string;
  icdCode:          string;
  category:         string;
  symptoms:         Symptom[];
  vitalSigns:       VitalSign[];
  investigations:   Investigation[];
  treatments: {
    correct:        TreatmentReference[];
    incorrect:      IncorrectChoice[];
  };
  complications:    Complication[];
  outcome:          DiseaseOutcome;
  reflectionHooks:  ReflectionHook[];
  scoring:          PerformanceScoring;
}
