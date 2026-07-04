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
// ─────────────────────────────────────────────

import { Encounter, EncounterAction, TriagePriority } from "../encounter";

// ─── Encounter Lifecycle ──────────────────────
// Valid transitions (one-directional):
//
//   not_started → active
//   active      → paused | completed | abandoned
//   paused      → active
//
// completed and abandoned are terminal.
// A completed encounter can never become active.

export type EncounterStatus =
  | "not_started"
  | "active"
  | "paused"
  | "completed"
  | "abandoned";

// ─── Time State ───────────────────────────────
// Hospital Engine owns elapsedClinicalMinutes.
// Future Time Engine will own the advancement
// rules — how many clinical minutes each action
// costs. When Time Engine arrives, it replaces
// the advancement calculation without touching
// this interface.
//
// elapsedRealSeconds is intentionally absent.
// Wall clock elapsed is computed by the UI from
// wallClockStartedAt to Date.now() at read time.
// Clinical time is engine-controlled and stored
// as a running total because it advances only
// when the engine decides — not continuously.

export interface TimeState {
  readonly wallClockStartedAt:     string;   // ISO 8601 — session creation
  readonly elapsedClinicalMinutes: number;   // advances per meaningful action
}

// ─── Completed Action ─────────────────────────
// Records that the student performed an action
// at a specific clinical time.
// Hospital Engine appends one per action taken.
// Future Scoring Engine reads this array.

export interface CompletedAction {
  readonly action:          EncounterAction;
  readonly clinicalMinutes: number;
  readonly timestamp:       string;   // ISO 8601 wall clock
}

// ─── Investigation Order ─────────────────────
// Hospital Engine records that an investigation
// was ordered. It does NOT evaluate the result.
// Future Investigation Engine reads this record,
// applies kineticProfile at clinicalMinutes,
// and returns result data for storage.
//
// investigationId matches Disease Engine
// investigation ids. Hospital Engine stores the
// string only — it never imports Disease Engine.

export interface InvestigationOrder {
  readonly investigationId:   string;
  readonly orderedAt:         number;   // clinical minutes
  readonly timestamp:         string;   // ISO 8601 wall clock
  readonly status:            "pending" | "resulted";
  readonly resultAvailableAt: number;   // clinical minutes
                                        // Future Time Engine sets this.
                                        // v1: defaults to orderedAt.
}

// ─── Treatment Record ─────────────────────────
// Hospital Engine records that a treatment was
// administered. It does NOT evaluate correctness.
// Future Treatment Engine reads this record and
// evaluates dose, route, and timing against
// Medicine Engine data.
//
// medicineId matches Medicine Engine medicine ids.
// Hospital Engine stores the string only — it
// never imports Medicine Engine.

export interface TreatmentRecord {
  readonly medicineId: string;
  readonly orderedAt:  number;    // clinical minutes
  readonly timestamp:  string;    // ISO 8601 wall clock
  readonly dose?:      string;    // optional free-text in v1
  readonly route?:     string;    // optional free-text in v1
}

// ─── Observation Record ───────────────────────
// Student's free-text clinical observation.
// Stored verbatim. Future engines may parse it.
// Hospital Engine only records it.

export interface ObservationRecord {
  readonly content:    string;
  readonly recordedAt: number;    // clinical minutes
  readonly timestamp:  string;    // ISO 8601 wall clock
}

// ─── Hospital Event Type ──────────────────────
// Every state transition produces exactly one event.
// The event log is the audit trail of the session.
// Future Scoring Engine reads events to evaluate
// decisions without querying state directly.

export type HospitalEventType =
  | "SESSION_STARTED"
  | "ACTION_COMPLETED"
  | "INVESTIGATION_ORDERED"
  | "TREATMENT_ADMINISTERED"
  | "OBSERVATION_RECORDED"
  | "ENCOUNTER_COMPLETED"
  | "ENCOUNTER_ABANDONED";

// ─── Hospital Event ───────────────────────────
// Immutable audit log entry.
// payload is typed as Record<string, unknown>
// in v1 — payload construction is centralised
// in events.ts and follows consistent structure
// per event type. Before Scoring Engine is built,
// payload adopts a discriminated union.

export interface HospitalEvent {
  readonly id:              string;
  readonly type:            HospitalEventType;
  readonly clinicalMinutes: number;
  readonly timestamp:       string;   // ISO 8601 wall clock
  readonly payload:         Readonly<Record<string, unknown>>;
}

// ─── Hospital Action ──────────────────────────
// Discriminated union of all commands that may
// be submitted to applyAction.
//
// START_SESSION is intentionally absent.
// Session creation is handled by createSession(encounter)
// which produces the initial HospitalState directly.
// This prevents the illegal state of starting twice.
//
// When a new action type is added here, TypeScript's
// exhaustive switch in applyAction will produce a
// compile error until the handler is implemented.
// This enforces correctness at compile time.

export type HospitalAction =
  | { readonly type: "COMPLETE_ACTION";      readonly action: EncounterAction                                           }
  | { readonly type: "ORDER_INVESTIGATION";  readonly investigationId: string                                           }
  | { readonly type: "ADMINISTER_TREATMENT"; readonly medicineId: string; readonly dose?: string; readonly route?: string }
  | { readonly type: "RECORD_OBSERVATION";   readonly content: string                                                   }
  | { readonly type: "COMPLETE_ENCOUNTER"                                                                               }
  | { readonly type: "ABANDON_ENCOUNTER"                                                                                };

// ─── Hospital State ───────────────────────────
// The complete, immutable record of everything
// that has happened in this encounter session.
//
// applyAction always returns a new HospitalState.
// The previous state is never mutated.
//
// triagePriority is copied from Encounter at
// session creation. It never changes — triage
// is an initial assessment, not a dynamic value
// in this engine. Future Time Engine may introduce
// dynamic deterioration through a separate field.
//
// availableActions starts from Encounter.availableActions.
// Future Hospital Engine phases will gate these
// based on completedActions (e.g. treatment is
// unavailable before history is taken).

export interface HospitalState {
  readonly sessionId:              string;
  readonly caseId:                 string;
  readonly status:                 EncounterStatus;
  readonly triagePriority:         TriagePriority;
  readonly startedAt:              string;                          // ISO 8601
  readonly timeState:              TimeState;
  readonly completedActions:       readonly CompletedAction[];
  readonly orderedInvestigations:  readonly InvestigationOrder[];
  readonly administeredTreatments: readonly TreatmentRecord[];
  readonly observations:           readonly ObservationRecord[];
  readonly events:                 readonly HospitalEvent[];
  readonly availableActions:       readonly EncounterAction[];
}

// ─── Student Session ──────────────────────────
// The top-level container handed to the UI layer.
//
// encounter is the original Encounter — never
// modified after session creation. The UI reads
// patient information from session.encounter.
//
// state is replaced on every applyAction call.
// The UI reads clinical progress from session.state.
//
// These two fields never merge by design.
// Encounter is the immutable case context.
// HospitalState is the evolving session record.

export interface StudentSession {
  readonly sessionId: string;
  readonly encounter: Encounter;
  readonly state:     HospitalState;
}
