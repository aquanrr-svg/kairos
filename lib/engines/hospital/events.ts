// ─────────────────────────────────────────────
// KAIROS — Hospital Engine Event Factories
//
// Centralised construction of HospitalEvent objects.
// Every state transition produces exactly one event
// through one of these factory functions.
//
// These functions are internal to the Hospital Engine.
// They are not exported from index.ts.
// Future Scoring Engine reads the event log from
// HospitalState.events — it never calls these directly.
//
// All functions are pure:
//   • No side effects beyond ID and timestamp generation
//   • No mutation
//   • Same logical input → same structural output
//     (timestamp and id will differ by wall clock)
// ─────────────────────────────────────────────

import { HospitalEvent, HospitalEventType } from "./types";
import { EncounterAction }                  from "../encounter";

// ─── ID Generation ────────────────────────────
// Unique within a process run with overwhelming
// probability. Sufficient for a simulation platform.
// Not cryptographically secure by design.

function generateEventId(): string {
  const time = Date.now().toString(16);
  const rand = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0");
  return `evt-${time}-${rand}`;
}

// ─── Core Builder ─────────────────────────────
// All public factory functions delegate here.
// Payload is frozen at construction — runtime
// immutability matches compile-time Readonly<>.

function buildEvent(
  type:            HospitalEventType,
  clinicalMinutes: number,
  payload:         Record<string, unknown>
): HospitalEvent {
  return {
    id:              generateEventId(),
    type,
    clinicalMinutes,
    timestamp:       new Date().toISOString(),
    payload:         Object.freeze(payload),
  };
}

// ─── Factory Functions ────────────────────────
// One function per HospitalEventType.
// Payload structure is consistent per type —
// documented here for future Scoring Engine.

/** SESSION_STARTED — emitted once by createSession */
export function buildSessionStartedEvent(
  clinicalMinutes: number
): HospitalEvent {
  return buildEvent("SESSION_STARTED", clinicalMinutes, {});
}

/**
 * ACTION_COMPLETED — emitted when student completes
 * a high-level EncounterAction category.
 * payload.action: EncounterAction string value
 */
export function buildActionCompletedEvent(
  action:          EncounterAction,
  clinicalMinutes: number
): HospitalEvent {
  return buildEvent("ACTION_COMPLETED", clinicalMinutes, { action });
}

/**
 * INVESTIGATION_ORDERED — emitted when student orders
 * a specific investigation by Disease Engine ID.
 * payload.investigationId: string
 */
export function buildInvestigationOrderedEvent(
  investigationId: string,
  clinicalMinutes: number
): HospitalEvent {
  return buildEvent("INVESTIGATION_ORDERED", clinicalMinutes, { investigationId });
}

/**
 * TREATMENT_ADMINISTERED — emitted when student
 * administers a medicine by Medicine Engine ID.
 * payload.medicineId: string
 * payload.dose: string | undefined
 * payload.route: string | undefined
 */
export function buildTreatmentAdministeredEvent(
  medicineId:      string,
  dose:            string | undefined,
  route:           string | undefined,
  clinicalMinutes: number
): HospitalEvent {
  const payload: Record<string, unknown> = { medicineId };
  if (dose  !== undefined) payload["dose"]  = dose;
  if (route !== undefined) payload["route"] = route;
  return buildEvent("TREATMENT_ADMINISTERED", clinicalMinutes, payload);
}

/**
 * OBSERVATION_RECORDED — emitted when student
 * records a free-text clinical observation.
 * payload.content: string
 */
export function buildObservationRecordedEvent(
  content:         string,
  clinicalMinutes: number
): HospitalEvent {
  return buildEvent("OBSERVATION_RECORDED", clinicalMinutes, { content });
}

/** ENCOUNTER_COMPLETED — emitted when student submits case */
export function buildEncounterCompletedEvent(
  clinicalMinutes: number
): HospitalEvent {
  return buildEvent("ENCOUNTER_COMPLETED", clinicalMinutes, {});
}

/** ENCOUNTER_ABANDONED — emitted when student exits without completing */
export function buildEncounterAbandonedEvent(
  clinicalMinutes: number
): HospitalEvent {
  return buildEvent("ENCOUNTER_ABANDONED", clinicalMinutes, {});
}
