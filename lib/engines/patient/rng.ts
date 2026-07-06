// ─────────────────────────────────────────────
// KAIROS — SeededRNG re-export
//
// Implementation promoted to lib/shared/rng.ts
// so Investigation Engine and future engines can
// import it without accessing patient internals.
//
// Patient generator files import from "../rng"
// and continue to work without modification.
// ─────────────────────────────────────────────

export { SeededRNG } from "../../shared/rng";
