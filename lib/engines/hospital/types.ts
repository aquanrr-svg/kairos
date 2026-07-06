// ─────────────────────────────────────────────
// KAIROS — Hospital Engine Types
//
// Ownership: Hospital Engine exclusively.
//
// Hospital Engine records what the student did.
// It does not evaluate correctness — that belongs
// to future Treatment Engine and Scoring Engine.
//
// Encounter Engine types are consumed read-only.
// No Hospital Engine type ever re-wraps an
// Encounter Engine type. The original Encounter
// is stored whole in StudentSession.encounter.
//
// All interfaces are immutable by design.
// applyAction always returns a new HospitalState.
//
// ResolvedInvestigation uses only primitive types
// and lib/types/enums. It never imports from the
// Investigation Engine — that would create a
// circular dependency. The Simulation Controller
// maps InvestigationReport → ResolvedInvestigation.
// ─────────────────────────────────────────────

import { Encounter, EncounterAction, TriagePriority } from "../encounter";
import { Severity }                                   from "../../types/enums";

// ─── Encounter Lifecycle ──────────────────────
// Valid transitions (one-directional):
//
//   not_started → active
//   active      → paused | completed | abandoned
//   paused      → active
//
// completed and abandoned are terminal.

export type EncounterStatus =
  | "not_started"
  | "active"
  | "paused"
  | "completed"
  | "abandoned";

// ─── Time State ───────────────────────────────
// elapsedRealSeconds is intentionally absent.
// Wall clock elapsed is computed by the UI from
// wallClockStartedAt. Clinical time is stored as
// a running total because it only advances when
// the engine decides — not continuously.

export interface TimeState {
  readonly wallClockStartedAt:     string;
  readonly elapsedClinicalMinutes: number;
}

// ─── Completed Action ─────────────────────────

export interface CompletedAction {
  readonly action:          EncounterAction;
  readonly clinicalMinutes: number;
  readonly timestamp:       string;
}

// ─── Investigation Order ──────────────────────
// Hospital Engine records that an investigation
// was ordered. It does NOT evaluate the result.
// Future Investigation Engine resolves results.
// Status transitions: pending → resulted via
// recordInvestigationResult().

export interface InvestigationOrder {
  readonly investigationId:   string;
  readonly orderedAt:         number;
  readonly timestamp:         string;
  readonly status:            "pending" | "resulted";
  readonly resultAvailableAt: number;
}

// ─── Resolved Investigation ───────────────────
// A minimal record that an investigation has been
// resolved and stored in session state.
//
// Uses only primitives and lib/types/enums —
// never imports from Investigation Engine.
//
// The Simulation Controller maps:
//   InvestigationReport → ResolvedInvestigation
//
// severityTier is stored for the Scoring Engine
// to evaluate result interpretation quality.
// The Simulation Controller strips it from any
// student-facing display.
//
// Multiple entries may exist for the same
// investigationId — serial testing produces one
// ResolvedInvestigation per resolution.

export interface ResolvedInvestigation {
  readonly investigationId: string;
  readonly name:            string;
  readonly resolvedAt:      number;       // clinical minutes when resolved
  readonly timestamp:       string;       // ISO 8601
  readonly hasRedFlags:     boolean;
  readonly findingCount:    number;
  readonly severityTier:    Severity | "normal";
}

// ─── Treatment Record ─────────────────────────

export interface TreatmentRecord {
  readonly medicineId: string;
  readonly orderedAt:  number;
  readonly timestamp:  string;
  readonly dose?:      string;
  readonly route?:     string;
}

// ─── Observation Record ───────────────────────

export interface ObservationRecord {
  readonly content:    string;
  readonly recordedAt: number;
  readonly timestamp:  string;
}

// ─── Hospital Event Type ──────────────────────
// Every state transition produces exactly one event.
// Future Scoring Engine reads the event log.

export type HospitalEventType =
  | "SESSION_STARTED"
  | "ACTION_COMPLETED"
  | "INVESTIGATION_ORDERED"
  | "INVESTIGATION_RESULTED"
  | "TREATMENT_ADMINISTERED"
  | "OBSERVATION_RECORDED"
  | "ENCOUNTER_COMPLETED"
  | "ENCOUNTER_ABANDONED";

// ─── Hospital Event ───────────────────────────

export interface HospitalEvent {
  readonly id:              string;
  readonly type:            HospitalEventType;
  readonly clinicalMinutes: number;
  readonly timestamp:       string;
  readonly payload:         Readonly<Record<string, unknown>>;
}

// ─── Hospital Action ──────────────────────────
// Discriminated union of all student commands.
// Adding a new variant causes a compile error in
// applyAction until its handler is implemented.
//
// recordInvestigationResult is NOT a HospitalAction.
// It is engine-to-engine communication triggered
// by the Simulation Controller — not a student action.

export type HospitalAction =
  | { readonly type: "COMPLETE_ACTION";      readonly action: EncounterAction                                              }
  | { readonly type: "ORDER_INVESTIGATION";  readonly investigationId: string                                              }
  | { readonly type: "ADMINISTER_TREATMENT"; readonly medicineId: string; readonly dose?: string; readonly route?: string  }
  | { readonly type: "RECORD_OBSERVATION";   readonly content: string                                                      }
  | { readonly type: "COMPLETE_ENCOUNTER"                                                                                  }
  | { readonly type: "ABANDON_ENCOUNTER"                                                                                   };

// ─── Hospital State ───────────────────────────
// Complete, immutable record of everything that
// has happened in this encounter session.
//
// resolvedInvestigations: grows as investigation
// results are recorded via recordInvestigationResult.
// Starts empty. Never mutated in place.

export interface HospitalState {
  readonly sessionId:              string;
  readonly caseId:                 string;
  readonly status:                 EncounterStatus;
  readonly triagePriority:         TriagePriority;
  readonly startedAt:              string;
  readonly timeState:              TimeState;
  readonly completedActions:       readonly CompletedAction[];
  readonly orderedInvestigations:  readonly InvestigationOrder[];
  readonly resolvedInvestigations: readonly ResolvedInvestigation[];
  readonly administeredTreatments: readonly TreatmentRecord[];
  readonly observations:           readonly ObservationRecord[];
  readonly events:                 readonly HospitalEvent[];
  readonly availableActions:       readonly EncounterAction[];
}

// ─── Student Session ──────────────────────────

export interface StudentSession {
  readonly sessionId: string;
  readonly encounter: Encounter;
  readonly state:     HospitalState;
}
