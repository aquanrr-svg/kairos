// ─────────────────────────────────────────────
// KAIROS — Investigation Resolver
//
// Single public function: resolveInvestigation()
//
// Orchestrates the complete resolution pipeline:
//
//   1. Find the order in HospitalState
//   2. Check result availability (hasResulted)
//   3. Find investigation definition in Disease
//   4. Compute hoursAfterEvent (onset + clinical time)
//   5. Resolve severity tier (with kinetic profile)
//   6. Get InvestigationResult for that tier
//   7. Create deterministic RNG from patient seed
//   8. Generate quantitative and qualitative findings
//   9. Generate ECG findings (location + probability filtered)
//  10. Build SerialTestingAdvisory if required
//  11. Return InvestigationReport wrapped in ResolutionResult
//
// This function is pure:
//   • No side effects
//   • No mutation of any input
//   • Same inputs → same report (timestamp aside)
//
// resolvedSeverityTier is stored in the report for
// the Scoring Engine to evaluate interpretation quality.
// The Simulation Controller strips it before display.
//
// educationalNotes and falsePositives are stored but
// must only be surfaced post-case by the Simulation
// Controller — not during an active encounter.
// ─────────────────────────────────────────────

import {
  InvestigationContext,
  InvestigationReport,
  ResolutionResult,
  SerialTestingAdvisory,
} from "./types";

import { HospitalState }                       from "../hospital";
import { Investigation, InvestigationResult }  from "../disease/types";
import { Severity }                            from "../../types/enums";

import {
  computeHoursAfterEvent,
  resolveSeverityTier,
  hasResulted,
} from "./kinetics";

import {
  generateFindings,
  generateECGFindings,
  deriveInvestigationSeed,
} from "./findings";

import { SeededRNG } from "../../shared/rng";

// ─── Private Helpers ──────────────────────────

/**
 * Returns the correct InvestigationResult for a given tier.
 * Exhaustive switch — TypeScript compile error if a new
 * Severity variant is added without a handler.
 */
function getInvestigationResult(
  investigation: Investigation,
  tier:          Severity | "normal"
): InvestigationResult {
  switch (tier) {
    case "normal":          return investigation.results.normal;
    case Severity.Mild:     return investigation.results.mild;
    case Severity.Moderate: return investigation.results.moderate;
    case Severity.Severe:   return investigation.results.severe;
    default: {
      const _exhaustive: never = tier;
      throw new Error(`Unhandled severity tier: ${String(_exhaustive)}`);
    }
  }
}

/**
 * Builds a SerialTestingAdvisory from the investigation's
 * serial testing rule, or undefined if not required.
 *
 * Internal timing values (hoursAfterFirst) are not exposed —
 * those are implementation details for the Time Engine.
 * Only the educational reasons are surfaced.
 */
function buildSerialTestingAdvisory(
  investigation: Investigation
): SerialTestingAdvisory | undefined {
  const rule = investigation.serialTestingRule;
  if (!rule?.required) return undefined;
  return {
    required: true,
    reasons:  rule.repeatAt.map(r => r.reason),
  };
}

// ─── Public API ───────────────────────────────

/**
 * Resolves an investigation order into a complete
 * student-facing InvestigationReport.
 *
 * @param investigationId  ID of the investigation to resolve.
 * @param context          Patient, disease, and clinical time.
 * @param hospitalState    HospitalState containing ordered investigations.
 *
 * Returns { ok: true, report } on success.
 * Returns { ok: false, error } with a typed error on failure.
 *
 * Error cases:
 *   ORDER_NOT_FOUND         investigation was never ordered
 *   NOT_YET_RESULTED        results not yet available at current clinical time
 *   INVESTIGATION_NOT_FOUND ID not found in disease investigation data
 */
export function resolveInvestigation(
  investigationId: string,
  context:         InvestigationContext,
  hospitalState:   HospitalState
): ResolutionResult {

  // ── 1. Find the order ────────────────────────────────
  const order = hospitalState.orderedInvestigations.find(
    o => o.investigationId === investigationId
  );

  if (!order) {
    return {
      ok:    false,
      error: {
        kind:            "ORDER_NOT_FOUND",
        investigationId,
        message:
          `Investigation "${investigationId}" has not been ordered. ` +
          `Submit an ORDER_INVESTIGATION action before requesting results.`,
      },
    };
  }

  // ── 2. Check result availability ─────────────────────
  if (!hasResulted(order.resultAvailableAt, context.clinicalMinutes)) {
    return {
      ok:    false,
      error: {
        kind:               "NOT_YET_RESULTED",
        investigationId,
        resultAvailableAt:  order.resultAvailableAt,
        currentMinutes:     context.clinicalMinutes,
        message:
          `Investigation "${investigationId}" results are pending. ` +
          `Available at clinical minute ${order.resultAvailableAt}, ` +
          `currently at minute ${context.clinicalMinutes}.`,
      },
    };
  }

  // ── 3. Find investigation definition ─────────────────
  const investigation = context.disease.investigations.find(
    i => i.id === investigationId
  );

  if (!investigation) {
    return {
      ok:    false,
      error: {
        kind:            "INVESTIGATION_NOT_FOUND",
        investigationId,
        message:
          `Investigation "${investigationId}" not found in ` +
          `disease "${context.disease.id}". ` +
          `Verify the investigation ID matches the Disease Engine data.`,
      },
    };
  }

  // ── 4. Resolve severity tier ──────────────────────────
  // Access HiddenState — intentional, see file header.
  const { chosenSeverity, selectedInfarctLocation } = context.patientCase.hidden;

  const hoursAfterEvent = computeHoursAfterEvent(
    context.patientCase.symptomOnsetHours,
    context.clinicalMinutes
  );

  const tier = resolveSeverityTier(investigation, hoursAfterEvent, chosenSeverity);

  // ── 5. Get result for resolved tier ──────────────────
  const result = getInvestigationResult(investigation, tier);

  // ── 6. Create deterministic RNG ──────────────────────
  // Derived from patient seed XOR hash of investigationId.
  // Same patient, same investigation → same result values.
  // Different investigations → independent value sequences.
  const seed = deriveInvestigationSeed(context.patientCase.seed, investigationId);
  const rng  = new SeededRNG(seed);

  // ── 7. Generate findings ──────────────────────────────
  const findings = generateFindings(
    result.findings,
    investigation.results.normal.findings,
    rng
  );

  // ── 8. Generate ECG findings ──────────────────────────
  const ecgFindings = generateECGFindings(
    result.ecgFindings ?? [],
    selectedInfarctLocation,
    rng
  );

  // ── 9. Build serial testing advisory ─────────────────
  const serialTestingAdvisory = buildSerialTestingAdvisory(investigation);

  // ── 10. Build and return report ───────────────────────
  // result.redFlags are tier-specific (e.g. only in severe).
  // investigation.redFlagFindings are general across all tiers.
  // Prefer tier-specific; fall back to general.
  const report: InvestigationReport = {
    investigationId,
    name:                  investigation.name,
    type:                  investigation.type,
    resolvedAt:            context.clinicalMinutes,
    resolvedSeverityTier:  tier,
    findings,
    ecgFindings,
    redFlagFindings:       result.redFlags ?? investigation.redFlagFindings,
    educationalNotes:      result.educationalNotes,
    falsePositives:        investigation.falsePositives ?? [],
    serialTestingAdvisory,
  };

  return { ok: true, report };
}
