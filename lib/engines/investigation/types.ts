// ─────────────────────────────────────────────
// KAIROS — Investigation Engine Types
//
// Ownership: Investigation Engine exclusively.
//
// Investigation Engine resolves InvestigationOrders
// from HospitalState into student-facing reports.
//
// It consumes:
//   • Disease Registry  — investigation definitions
//   • PatientCase       — HiddenState (severity, location)
//   • HospitalState     — order records and clinical time
//
// It never imports from:
//   • Encounter Engine  — student-facing sanitisation layer
//   • Scoring Engine    — future downward dependency
//   • Treatment Engine  — unrelated domain
//   • Time Engine       — receives time as a value, not a service
//
// HiddenState access is intentional.
// Investigation Engine operates as part of the case
// runtime, not the student UI surface. Medical accuracy
// requires the actual disease severity and infarct location.
//
// educationalNotes are stored in InvestigationReport
// but must only be surfaced post-case by the Simulation
// Controller. Investigation Engine stores; gating is not
// its responsibility.
//
// falsePositives are stored for Reflection Engine.
// Never shown during an active case.
// ─────────────────────────────────────────────

import { Severity, InvestigationType } from "../../types/enums";
import { PatientCase }                 from "../patient";
import { Disease }                     from "../disease/types";

// ─── Resolution Context ───────────────────────
// Everything required to resolve one investigation.
// Passed as a single parameter to keep function
// signatures stable as engines evolve.
//
// PatientCase.hidden is accessed intentionally.
// See file header for ownership justification.

export interface InvestigationContext {
  readonly patientCase:     PatientCase;
  readonly clinicalMinutes: number;   // HospitalState.timeState.elapsedClinicalMinutes
  readonly disease:         Disease;
}

// ─── Generated Finding ────────────────────────
// A resolved quantitative finding with an actual
// sampled value within the medically defined range.
//
// referenceMin and referenceMax are sourced from the
// Disease Engine's "normal" result tier to give the
// student context for interpreting the value.

export interface GeneratedFinding {
  readonly parameter:      string;
  readonly value:          number;
  readonly unit:           string;
  readonly interpretation: string;   // Interpretation enum value as string
  readonly isAbnormal:     boolean;
  readonly referenceMin:   number;
  readonly referenceMax:   number;
}

// ─── Generated Qualitative Finding ────────────
// For findings where range: {min:0,max:0} or
// {min:1,max:1} — presence/absence semantics.
// No numeric sampling occurs.
// Hospital Engine renders these differently from
// quantitative findings.

export interface GeneratedQualitativeFinding {
  readonly parameter:      string;
  readonly interpretation: string;   // Interpretation enum value as string
  readonly unit:           "none";
}

// ─── Generated ECG Finding ────────────────────
// A single ECG finding that passed both the location
// filter and the probability gate.
// Hospital Engine renders these as part of an ECG
// viewer in future versions.
// clinicalImportance stored as string — Hospital Engine
// decides how to render urgency indicators.

export interface GeneratedECGFinding {
  readonly leads:              readonly string[];
  readonly finding:            string;
  readonly interpretation:     string;   // Interpretation enum value as string
  readonly clinicalImportance: string;   // ClinicalImportance enum value as string
}

// ─── Resolved Finding Union ───────────────────
// Discriminated union used in InvestigationReport.
// Hospital Engine inspects the kind field to
// decide rendering strategy without branching on
// unit or value type.

export type ResolvedFinding =
  | ({ readonly kind: "quantitative" } & GeneratedFinding)
  | ({ readonly kind: "qualitative"  } & GeneratedQualitativeFinding);

// ─── Serial Testing Advisory ──────────────────
// Informs the student that serial testing is
// required and why. Derived from SerialTestingRule.
// Does not expose internal timing values — those
// are implementation details for the Time Engine.

export interface SerialTestingAdvisory {
  readonly required: boolean;
  readonly reasons:  readonly string[];
}

// ─── Investigation Report ─────────────────────
// The complete student-facing investigation result.
// This is the public output of resolveInvestigation.
//
// resolvedSeverityTier: intentionally stored.
// The Simulation Controller strips it before
// displaying to the student. The Scoring Engine
// reads it from the INVESTIGATION_RESULTED event
// payload to evaluate whether the student correctly
// interpreted the findings.
//
// educationalNotes: store here, gate in Simulation
// Controller — only surface to student post-case.
//
// falsePositives: stored for Reflection Engine.
// Never shown during an active case.

export interface InvestigationReport {
  readonly investigationId:        string;
  readonly name:                   string;
  readonly type:                   InvestigationType;
  readonly resolvedAt:             number;          // clinical minutes

  readonly resolvedSeverityTier:   Severity | "normal";
  readonly findings:               readonly ResolvedFinding[];
  readonly ecgFindings:            readonly GeneratedECGFinding[];
  readonly redFlagFindings:        readonly string[];
  readonly educationalNotes:       string;
  readonly falsePositives:         readonly string[];
  readonly serialTestingAdvisory?: SerialTestingAdvisory;
}

// ─── Investigation Errors ─────────────────────
// Discriminated error union for failed resolution.
// All three variants are genuine runtime conditions.
//
// ORDER_NOT_FOUND:     investigation was never ordered
// INVESTIGATION_NOT_FOUND: ID not in disease data
// NOT_YET_RESULTED:   result not yet available at this clinical time

export type InvestigationError =
  | {
      readonly kind:            "INVESTIGATION_NOT_FOUND";
      readonly investigationId: string;
      readonly message:         string;
    }
  | {
      readonly kind:            "ORDER_NOT_FOUND";
      readonly investigationId: string;
      readonly message:         string;
    }
  | {
      readonly kind:              "NOT_YET_RESULTED";
      readonly investigationId:   string;
      readonly resultAvailableAt: number;
      readonly currentMinutes:    number;
      readonly message:           string;
    };

// ─── Resolution Result ────────────────────────
// Discriminated union returned by resolveInvestigation.
// Callers must handle both branches explicitly.

export type ResolutionResult =
  | { readonly ok: true;  readonly report: InvestigationReport }
  | { readonly ok: false; readonly error:  InvestigationError  };

// ─── Hospital Engine Integration Mapping ──────
// Simulation Controller maps InvestigationReport
// into Hospital Engine structures to keep engine
// boundaries independent.
// Simulation Controller maps InvestigationReport
// to Hospital Engine's own ResolvedInvestigation
// type using primitive fields only.
// This interface documents that mapping contract.

export interface InvestigationReportMapping {
  readonly investigationId: string;
  readonly name:            string;
  readonly resolvedAt:      number;
  readonly hasRedFlags:     boolean;
  readonly findingCount:    number;
}
