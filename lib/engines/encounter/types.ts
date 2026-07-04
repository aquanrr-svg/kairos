// ─────────────────────────────────────────────
// KAIROS — Encounter Engine Types
//
// The Encounter is the sanitised, student-facing
// view of a PatientCase.
//
// Rules enforced by design:
//   HiddenState  → never in Encounter
//   diseaseId    → never in Encounter
//   severity     → never in Encounter
//   seed         → never in Encounter
//
// The Hospital Engine decides how to render
// these types. This file contains no UI logic.
// ─────────────────────────────────────────────

import { PatientSex } from "../patient/types";

// ─── Triage Priority ──────────────────────────
// Derived from observable presentation only.
// Never from hidden engine state.

export type TriagePriority = "red" | "orange" | "yellow" | "green";

// ─── Available Actions ────────────────────────
// All actions the student may attempt.
// Phase 1: all actions available unconditionally.
// Future: Hospital Engine will gate these based
// on clinical state and completed actions.

export const ENCOUNTER_ACTIONS = [
  "Take History",
  "Physical Examination",
  "View Vital Signs",
  "Order Investigation",
  "Administer Treatment",
  "Observe",
] as const;

export type EncounterAction = typeof ENCOUNTER_ACTIONS[number];

// ─── Visible Vital ────────────────────────────
// Student-facing vital sign value.
// Structurally similar to GeneratedVital but
// kept separate to isolate public contract from
// Patient Engine internals.

export interface VisibleVital {
  readonly parameter:  string;
  readonly value:      number;
  readonly unit:       string;
  readonly isAbnormal: boolean;
  readonly isRedFlag:  boolean;
}

// ─── Patient Summary ──────────────────────────
// Demographics visible to the student.
// Comorbidities are deliberately flattened —
// they are observable (patient discloses them
// during history taking) and must not be hidden.

export interface PatientSummary {
  readonly fullName:        string;
  readonly age:             number;
  readonly sex:             PatientSex;
  readonly occupation:      string;
  readonly isSmoker:        boolean;
  readonly hasDiabetes:     boolean;
  readonly hasHypertension: boolean;
  readonly hasPreviousMI:   boolean;
}

// ─── Encounter ────────────────────────────────
// The complete, immutable, student-facing case.
// Output of generateEncounter().

export interface Encounter {
  readonly caseId:           string;
  readonly timestamp:        string;
  readonly patientSummary:   PatientSummary;
  readonly chiefComplaint:   string;
  readonly history:          string;
  readonly visibleVitals:    readonly VisibleVital[];
  readonly triagePriority:   TriagePriority;
  readonly availableActions: readonly EncounterAction[];
}
