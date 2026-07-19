// ─────────────────────────────────────────────
// KAIROS — Ambient Engine · Core Reducer
//
// Public API:
//   createAmbient(config?, seed?)        → AmbientState
//   advanceAmbient(state, action)        → AmbientState
//
// advanceAmbient is a pure reducer over AmbientAction.
// The only impure driver (a setInterval) lives in
// AmbientContext and simply dispatches TICK actions.
//
// Same seed + config + action sequence → identical state.
//
// Phase 0 handles clock advancement, pause/resume, mood,
// reconfigure, and reset. Later phases extend the TICK
// branch with queue/beds/event/nurse passes — without
// changing this file's public shape.
// ─────────────────────────────────────────────

import { AmbientConfig, DEFAULT_AMBIENT_CONFIG } from "./config";
import {
  AmbientState,
  AmbientAction,
  HospitalMood,
} from "./types";
import { advanceClock } from "./clock/clock";

// ─── Construction ─────────────────────────────

/**
 * Creates a fresh ambient world at shift start.
 * Deterministic: identical (config, seed) → identical state.
 */
export function createAmbient(
  config: AmbientConfig = DEFAULT_AMBIENT_CONFIG,
  seed:   number = 1
): AmbientState {
  return {
    config,
    seed:      seed >>> 0 || 1,
    rngCursor: 0,
    status:    "running",
    clock:     { tick: 0, elapsedWorldMinutes: 0 },
    mood:      HospitalMood.Quiet,
  };
}

// ─── Exhaustiveness guard ─────────────────────

function assertNever(value: never): never {
  throw new Error(`Unhandled AmbientAction: ${JSON.stringify(value)}`);
}

// ─── Reducer ──────────────────────────────────

export function advanceAmbient(
  state:  AmbientState,
  action: AmbientAction
): AmbientState {
  switch (action.type) {
    case "TICK": {
      if (state.status !== "running") return state;
      const delta = action.deltaTicks ?? 1;
      if (delta <= 0) return state;
      return {
        ...state,
        clock: advanceClock(state.clock, state.config.clock, delta),
      };
    }

    case "PAUSE":
      return state.status === "paused" ? state : { ...state, status: "paused" };

    case "RESUME":
      return state.status === "running" ? state : { ...state, status: "running" };

    case "SET_MOOD":
      return state.mood === action.mood ? state : { ...state, mood: action.mood };

    case "RECONFIGURE":
      return { ...state, config: action.config };

    case "RESET":
      return createAmbient(state.config, action.seed ?? state.seed);

    default:
      return assertNever(action);
  }
}
