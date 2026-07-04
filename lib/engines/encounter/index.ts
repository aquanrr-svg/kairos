// ─────────────────────────────────────────────
// KAIROS — Encounter Engine Public API
//
// Callers import only from this file.
// Internal helper functions are never exported.
// ─────────────────────────────────────────────

export { generateEncounter } from "./generate";

export { ENCOUNTER_ACTIONS } from "./types";

export type {
  Encounter,
  PatientSummary,
  VisibleVital,
  TriagePriority,
  EncounterAction,
} from "./types";
