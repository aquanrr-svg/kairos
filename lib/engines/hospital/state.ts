// ─────────────────────────────────────────────
// KAIROS — Hospital Engine State Management
//
// Two public functions:
//   createSession(encounter) → StudentSession
//   applyAction(state, action) → HospitalState
//
// Invariants enforced here:
//   • HospitalState is never mutated — all
//     transitions return a new object.
//   • All array operations use spread.
//   • Actions submitted to a non-active encounter
//     are silently ignored (idempotent guard).
//   • applyAction switch is exhaustive — adding a
//     new HospitalAction variant causes a compile
//     error until its handler is implemented.
//
// Clinical time advancement:
//   ENCOUNTER_ACTION_COSTS and the per-action
//   constants below are v1 approximations.
//   Future Time Engine replaces advanceClinicalTime
//   and these values without touching any handler.
// ─────────────────────────────────────────────

import { Encounter, EncounterAction } from "../encounter";

import {
  HospitalState,
  HospitalAction,
  HospitalEvent,
  StudentSession,
  TimeState,
  CompletedAction,
  InvestigationOrder,
  TreatmentRecord,
  ObservationRecord,
} from "./types";

import {
  buildSessionStartedEvent,
  buildActionCompletedEvent,
  buildInvestigationOrderedEvent,
  buildTreatmentAdministeredEvent,
  buildObservationRecordedEvent,
  buildEncounterCompletedEvent,
  buildEncounterAbandonedEvent,
} from "./events";

// ─── Clinical Time Costs (v1) ─────────────────
// How many clinical minutes each action costs.
// Record<EncounterAction, number> enforces that
// all six EncounterAction variants are covered.
// TypeScript compile error if a variant is missing.

const ENCOUNTER_ACTION_COSTS: Record<EncounterAction, number> = {
  "Take History":         10,
  "Physical Examination":  8,
  "View Vital Signs":      2,
  "Order Investigation":   3,
  "Administer Treatment":  5,
  "Observe":              15,
};

// Costs for actions that bypass COMPLETE_ACTION
const INVESTIGATION_ORDER_COST  = 5;
const TREATMENT_ADMIN_COST       = 5;
const OBSERVATION_RECORD_COST    = 2;

// ─── Internal Utilities ───────────────────────

function generateSessionId(caseId: string): string {
  const time = Date.now().toString(16);
  const rand = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0");
  return `${caseId}-${time}-${rand}`;
}

/**
 * Advances clinical time by the given number of minutes.
 * Returns a new TimeState — never mutates the existing one.
 * Future Time Engine replaces this function.
 */
function advanceClinicalTime(
  timeState: TimeState,
  minutes:   number
): TimeState {
  return {
    ...timeState,
    elapsedClinicalMinutes: timeState.elapsedClinicalMinutes + minutes,
  };
}

/**
 * Appends a single event to the events array immutably.
 * Returns a new state object.
 */
function appendEvent(
  state: HospitalState,
  event: HospitalEvent
): HospitalState {
  return { ...state, events: [...state.events, event] };
}

/**
 * Guard: only active encounters accept actions.
 * Terminal states (completed, abandoned) and
 * non-started or paused encounters return state unchanged.
 */
function isActive(state: HospitalState): boolean {
  return state.status === "active";
}

/**
 * Exhaustive switch guard.
 * TypeScript narrows action to never after all
 * HospitalAction variants are handled. If a new
 * variant is added to the union without a handler,
 * this causes a compile error.
 */
function assertNever(value: never): never {
  throw new Error(
    `Unhandled HospitalAction type: ${JSON.stringify(value)}`
  );
}

// ─── Action Handlers ──────────────────────────
// One pure function per HospitalAction variant.
// Each returns a new HospitalState.
// None mutate their inputs.

function handleCompleteAction(
  state:  HospitalState,
  action: Extract<HospitalAction, { type: "COMPLETE_ACTION" }>
): HospitalState {
  if (!isActive(state)) return state;

  const cost         = ENCOUNTER_ACTION_COSTS[action.action];
  const newTimeState = advanceClinicalTime(state.timeState, cost);
  const timestamp    = new Date().toISOString();

  const completed: CompletedAction = {
    action:          action.action,
    clinicalMinutes: newTimeState.elapsedClinicalMinutes,
    timestamp,
  };

  const event = buildActionCompletedEvent(
    action.action,
    newTimeState.elapsedClinicalMinutes
  );

  return {
    ...state,
    timeState:        newTimeState,
    completedActions: [...state.completedActions, completed],
    events:           [...state.events, event],
  };
}

function handleOrderInvestigation(
  state:  HospitalState,
  action: Extract<HospitalAction, { type: "ORDER_INVESTIGATION" }>
): HospitalState {
  if (!isActive(state)) return state;

  const newTimeState = advanceClinicalTime(state.timeState, INVESTIGATION_ORDER_COST);
  const timestamp    = new Date().toISOString();

  // v1: resultAvailableAt equals orderedAt (results immediately available).
  // Future Time Engine sets resultAvailableAt based on
  // investigation type and kineticProfile.
  const order: InvestigationOrder = {
    investigationId:   action.investigationId,
    orderedAt:         newTimeState.elapsedClinicalMinutes,
    timestamp,
    status:            "pending",
    resultAvailableAt: newTimeState.elapsedClinicalMinutes,
  };

  const event = buildInvestigationOrderedEvent(
    action.investigationId,
    newTimeState.elapsedClinicalMinutes
  );

  return {
    ...state,
    timeState:             newTimeState,
    orderedInvestigations: [...state.orderedInvestigations, order],
    events:                [...state.events, event],
  };
}

function handleAdministerTreatment(
  state:  HospitalState,
  action: Extract<HospitalAction, { type: "ADMINISTER_TREATMENT" }>
): HospitalState {
  if (!isActive(state)) return state;

  const newTimeState = advanceClinicalTime(state.timeState, TREATMENT_ADMIN_COST);
  const timestamp    = new Date().toISOString();

  const record: TreatmentRecord = {
    medicineId: action.medicineId,
    orderedAt:  newTimeState.elapsedClinicalMinutes,
    timestamp,
    ...(action.dose  !== undefined ? { dose:  action.dose  } : {}),
    ...(action.route !== undefined ? { route: action.route } : {}),
  };

  const event = buildTreatmentAdministeredEvent(
    action.medicineId,
    action.dose,
    action.route,
    newTimeState.elapsedClinicalMinutes
  );

  return {
    ...state,
    timeState:               newTimeState,
    administeredTreatments:  [...state.administeredTreatments, record],
    events:                  [...state.events, event],
  };
}

function handleRecordObservation(
  state:  HospitalState,
  action: Extract<HospitalAction, { type: "RECORD_OBSERVATION" }>
): HospitalState {
  if (!isActive(state)) return state;

  const newTimeState = advanceClinicalTime(state.timeState, OBSERVATION_RECORD_COST);
  const timestamp    = new Date().toISOString();

  const observation: ObservationRecord = {
    content:    action.content,
    recordedAt: newTimeState.elapsedClinicalMinutes,
    timestamp,
  };

  const event = buildObservationRecordedEvent(
    action.content,
    newTimeState.elapsedClinicalMinutes
  );

  return {
    ...state,
    timeState:    newTimeState,
    observations: [...state.observations, observation],
    events:       [...state.events, event],
  };
}

function handleCompleteEncounter(
  state: HospitalState
): HospitalState {
  if (!isActive(state)) return state;

  const event = buildEncounterCompletedEvent(
    state.timeState.elapsedClinicalMinutes
  );

  return {
    ...state,
    status: "completed",
    events: [...state.events, event],
  };
}

function handleAbandonEncounter(
  state: HospitalState
): HospitalState {
  if (!isActive(state)) return state;

  const event = buildEncounterAbandonedEvent(
    state.timeState.elapsedClinicalMinutes
  );

  return {
    ...state,
    status: "abandoned",
    events: [...state.events, event],
  };
}

// ─── Public API ───────────────────────────────

/**
 * Creates a new immutable StudentSession from an Encounter.
 *
 * Status begins as "active" — Hospital Engine v1 has no
 * "not_started" phase. The session is ready to accept
 * actions immediately after creation.
 *
 * The SESSION_STARTED event is the first entry in the
 * events log, establishing the audit trail.
 */
export function createSession(encounter: Encounter): StudentSession {
  const now       = new Date().toISOString();
  const sessionId = generateSessionId(encounter.caseId);

  const timeState: TimeState = {
    wallClockStartedAt:     now,
    elapsedClinicalMinutes: 0,
  };

  const sessionStartedEvent = buildSessionStartedEvent(0);

  const state: HospitalState = {
    sessionId,
    caseId:                  encounter.caseId,
    status:                  "active",
    triagePriority:          encounter.triagePriority,
    startedAt:               now,
    timeState,
    completedActions:        [],
    orderedInvestigations:   [],
    administeredTreatments:  [],
    observations:            [],
    events:                  [sessionStartedEvent],
    availableActions:        encounter.availableActions,
  };

  return { sessionId, encounter, state };
}

/**
 * Applies a HospitalAction to produce a new HospitalState.
 *
 * This function is pure — it never mutates state.
 * Actions submitted to non-active encounters are ignored.
 * The switch is exhaustive — TypeScript enforces that
 * every HospitalAction variant is handled.
 */
export function applyAction(
  state:  HospitalState,
  action: HospitalAction
): HospitalState {
  switch (action.type) {
    case "COMPLETE_ACTION":
      return handleCompleteAction(state, action);
    case "ORDER_INVESTIGATION":
      return handleOrderInvestigation(state, action);
    case "ADMINISTER_TREATMENT":
      return handleAdministerTreatment(state, action);
    case "RECORD_OBSERVATION":
      return handleRecordObservation(state, action);
    case "COMPLETE_ENCOUNTER":
      return handleCompleteEncounter(state);
    case "ABANDON_ENCOUNTER":
      return handleAbandonEncounter(state);
    default:
      return assertNever(action);
  }
}
