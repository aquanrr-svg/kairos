// ─────────────────────────────────────────────
// KAIROS — Investigation Engine Public API
//
// All callers import only from this file.
// Internal functions (findings generation, result
// selection) are not exported — they are
// implementation details of resolveInvestigation.
// ─────────────────────────────────────────────

// ─── Core Resolution ──────────────────────────
export { resolveInvestigation } from "./resolve";

// ─── Kinetics Utilities ───────────────────────
// Exported for use by future Time Engine and
// Simulation Controller without requiring access
// to internal resolution logic.
export {
  computeHoursAfterEvent,
  resolveSeverityTier,
  hasResulted,
  isQualitativeFinding,
  extractNormalRange,
} from "./kinetics";

// ─── Seed Derivation ──────────────────────────
// Exported to support deterministic test harnesses
// and future investigation caching strategies.
export { deriveInvestigationSeed } from "./findings";

// ─── Types ────────────────────────────────────
export type {
  InvestigationContext,
  GeneratedFinding,
  GeneratedQualitativeFinding,
  GeneratedECGFinding,
  ResolvedFinding,
  SerialTestingAdvisory,
  InvestigationReport,
  InvestigationError,
  ResolutionResult,
  InvestigationReportMapping,
} from "./types";
