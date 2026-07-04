// ─────────────────────────────────────────────
// KAIROS — Hospital Engine Public API
//
// Phase 1: types only.
//
// createSession and applyAction will be exported
// from this file when state.ts is implemented.
// This file is the stable public surface —
// callers import only from here, never from
// internal files directly.
//
// Future exports (added when implemented):
//   export { createSession } from "./state";
//   export { applyAction }   from "./state";
// ─────────────────────────────────────────────

export type {
  EncounterStatus,
  TimeState,
  CompletedAction,
  InvestigationOrder,
  TreatmentRecord,
  ObservationRecord,
  HospitalEventType,
  HospitalEvent,
  HospitalAction,
  HospitalState,
  StudentSession,
} from "./types";
