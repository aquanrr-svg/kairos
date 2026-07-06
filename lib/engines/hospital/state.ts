// ─────────────────────────────────────────────
// KAIROS — Hospital Engine State Management
//
// Two public student-facing functions:
//   createSession(encounter)          → StudentSession
//   applyAction(state, action)        → HospitalState
//
// One engine-to-engine function:
//   recordInvestigationResult(state, resolved) → HospitalState
//
// This function is NOT routed through applyAction.
// It is called by the Simulation Controller after
// resolveInvestigation() returns a successful result.
// Routing it through applyAction would require a new
// HospitalAction variant, breaking exhaustive switches.
//
// Invariants enforced here:
//   • HospitalState is never mutated.
//   • All transitions return a new object.
//   • All array operations use spread.
//   • Actions submitted to non-active encounters
//     are silently ignored.
//   • applyAction switch is exhaustive.
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
  ResolvedInvestigation,
} from "./types";

import {
  buildSessionStartedEvent,
  buildActionCompletedEvent,
  buildInvestigationOrderedEvent,
  buildInvestigationResultedEvent,
  buildTreatmentAdministeredEvent,
  buildObservationRecordedEvent,
  buildEncounterCompletedEvent,
  buildEncounterAbandonedEvent,
} from "./events";

// ─── Clinical Time Costs (v1) ─────────────────
// Record<EncounterAction, number> enforces that
// all six EncounterAction variants are covered.
// TypeScript compile error if a variant is missing.
// Future Time Engine replaces this map.

const ENCOUNTER_ACTION_COSTS: Record<EncounterAction, number> = {
  "Take History":         10,
  "Physical Examination":  8,
  "View Vital Signs":      2,
  "Order Investigation":   3,
  "Administer Treatment":  5,
  "Observe":              15,
};

const INVESTIGATION_ORDER_COST  = 5;
const TREATMENT_ADMIN_COST       = 5;
const OBSERVATION_RECORD_COST    = 2;

// ─── Internal Utilities ───────────────────────

function generateSessionId(caseId: string): string {
  const time = Date.now().toString(16);
  const rand = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, "0");
  return `${caseId}-${time}-${rand}`;
}

function advanceClinicalTime(
  timeState: TimeState,
  minutes:   number
): TimeState {
  return {
    ...timeState,
    elapsedClinicalMinutes: timeState.elapsedClinicalMinutes + minutes,
  };
}

function isActive(state: HospitalState): boolean {
  return state.status === "active";
}

function assertNever(value: never): never {
  throw new Error(`Unhandled HospitalAction type: ${JSON.stringify(value)}`);
}

// ─── Action Handlers ──────────────────────────

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

function handleCompleteEncounter(state: HospitalState): HospitalState {
  if (!isActive(state)) return state;
  const event = buildEncounterCompletedEvent(state.timeState.elapsedClinicalMinutes);
  return { ...state, status: "completed", events: [...state.events, event] };
}

function handleAbandonEncounter(state: HospitalState): HospitalState {
  if (!isActive(state)) return state;
  const event = buildEncounterAbandonedEvent(state.timeState.elapsedClinicalMinutes);
  return { ...state, status: "abandoned", events: [...state.events, event] };
}

// ─── Public API ───────────────────────────────

/**
 * Creates a new immutable StudentSession from an Encounter.
 * All arrays initialised empty. Status begins as "active".
 */
export function createSession(encounter: Encounter): StudentSession {
  const now       = new Date().toISOString();
  const sessionId = generateSessionId(encounter.caseId);

  const timeState: TimeState = {
    wallClockStartedAt:     now,
    elapsedClinicalMinutes: 0,
  };

  const state: HospitalState = {
    sessionId,
    caseId:                  encounter.caseId,
    status:                  "active",
    triagePriority:          encounter.triagePriority,
    startedAt:               now,
    timeState,
    completedActions:        [],
    orderedInvestigations:   [],
    resolvedInvestigations:  [],
    administeredTreatments:  [],
    observations:            [],
    events:                  [buildSessionStartedEvent(0)],
    availableActions:        encounter.availableActions,
  };

  return { sessionId, encounter, state };
}

/**
 * Applies a student HospitalAction to produce a new HospitalState.
 * Exhaustive switch — adding a new HospitalAction variant causes a
 * compile error until its handler is implemented.
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

/**
 * Records a resolved investigation result into HospitalState.
 *
 * Called by the Simulation Controller after a successful
 * resolveInvestigation() call — not by student actions.
 *
 * Transitions:
 *   • Appends resolved to resolvedInvestigations
 *   • Updates the first matching pending order to "resulted"
 *   • Appends an INVESTIGATION_RESULTED event
 *
 * Serial testing: if the same investigationId appears multiple
 * times in orderedInvestigations, only the first "pending" entry
 * transitions. Subsequent orders remain "pending" until their
 * results are individually recorded.
 *
 * Encounter status is not checked — late-arriving results
 * (e.g. after encounter completion) are permitted.
 * The Simulation Controller is responsible for status gating.
 */
export function recordInvestigationResult(
  state:    HospitalState,
  resolved: ResolvedInvestigation
): HospitalState {
  let firstPendingUpdated = false;

  const updatedOrders = state.orderedInvestigations.map(order => {
    if (
      !firstPendingUpdated &&
      order.investigationId === resolved.investigationId &&
      order.status === "pending"
    ) {
      firstPendingUpdated = true;
      return { ...order, status: "resulted" as const };
    }
    return order;
  });

  const event = buildInvestigationResultedEvent(
    resolved.investigationId,
    resolved.resolvedAt,
    resolved.severityTier,
    state.timeState.elapsedClinicalMinutes
  );

  return {
    ...state,
    orderedInvestigations:   updatedOrders,
    resolvedInvestigations:  [...state.resolvedInvestigations, resolved],
    events:                  [...state.events, event],
  };
}
