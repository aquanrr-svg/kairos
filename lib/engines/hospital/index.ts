// ─────────────────────────────────────────────
// KAIROS — Hospital Engine Public API
//
// Callers import only from this file.
// Internal files (events.ts, action handlers)
// are never imported directly by consumers.
// ─────────────────────────────────────────────

export { createSession, applyAction, recordInvestigationResult } from "./state";

export {
  canPerformAction,
  canOrderInvestigation,
  canAdministerTreatment,
  canRecordObservation,
  canCompleteEncounter,
  canAbandonEncounter,
} from "./guards";

export type { GuardResult }           from "./guards";

export type {
  EncounterStatus,
  TimeState,
  CompletedAction,
  InvestigationOrder,
  ResolvedInvestigation,
  TreatmentRecord,
  ObservationRecord,
  HospitalEventType,
  HospitalEvent,
  HospitalAction,
  HospitalState,
  StudentSession,
} from "./types";
