// ─────────────────────────────────────────────
// KAIROS — Encounter Generator
//
// Converts a PatientCase into an Encounter.
// The Encounter contains only information that
// a doctor would observe at the bedside.
//
// This is a pure function:
//   • No randomness
//   • No side effects
//   • No mutation
//   • No access to HiddenState
//   • No exposure of diseaseId or severity
// ─────────────────────────────────────────────

import { PatientCase } from "../patient";
import {
  Encounter,
  PatientSummary,
  TriagePriority,
  VisibleVital,
  ENCOUNTER_ACTIONS,
} from "./types";

// ─── Onset Formatter ──────────────────────────
// Converts fractional hours into natural language.
// Example: 2.5 → "about 3 hours ago"
// Example: 0.4 → "about 24 minutes ago"

function formatOnset(hours: number): string {
  if (hours < 0.5)  return "less than 30 minutes ago";
  if (hours < 1.0)  return `about ${Math.round(hours * 60)} minutes ago`;
  if (hours < 1.75) return "about an hour ago";
  const rounded = Math.round(hours);
  return `about ${rounded} hour${rounded === 1 ? "" : "s"} ago`;
}

// ─── Patient Summary ──────────────────────────

function buildPatientSummary(
  profile: PatientCase["profile"]
): PatientSummary {
  return {
    fullName:        profile.fullName,
    age:             profile.age,
    sex:             profile.sex,
    occupation:      profile.occupation,
    isSmoker:        profile.comorbidities.isSmoker,
    hasDiabetes:     profile.comorbidities.hasDiabetes,
    hasHypertension: profile.comorbidities.hasHypertension,
    hasPreviousMI:   profile.comorbidities.hasPreviousMI,
  };
}

// ─── Chief Complaint ──────────────────────────
// The patient's primary presenting complaint
// in their own words. Derived from the first
// presenting complaint constructed by the
// Patient Engine.

function buildChiefComplaint(
  presentingComplaints: PatientCase["presentingComplaints"]
): string {
  return presentingComplaints[0] ?? "Patient unable to provide history.";
}

// ─── History of Present Illness ───────────────
// A natural-language paragraph constructed from
// the patient's own phrases and onset timing.
//
// Construction rules:
//   1. Open with onset time.
//   2. Red-flag symptoms lead — they are what
//      the patient volunteers first.
//   3. Other symptoms follow.
//   4. Maximum four phrases to mirror realistic
//      clinical documentation.
//
// Never references disease name or severity.

function buildHistory(patientCase: PatientCase): string {
  const onset   = formatOnset(patientCase.symptomOnsetHours);
  const opening = `I started feeling unwell ${onset}.`;

  const redFlags = patientCase.selectedSymptoms.filter(s => s.isRedFlag);
  const others   = patientCase.selectedSymptoms.filter(s => !s.isRedFlag);
  const ordered  = [...redFlags, ...others].slice(0, 4);

  if (ordered.length === 0) return opening;

  const body = ordered.map(s => s.patientPhrase).join(" ");
  return `${opening} ${body}`;
}

// ─── Visible Vitals ───────────────────────────
// Maps GeneratedVital to VisibleVital.
// Structurally identical today but kept separate
// to isolate the public Encounter contract from
// Patient Engine internals.

function buildVisibleVitals(
  generatedVitals: PatientCase["generatedVitals"]
): readonly VisibleVital[] {
  return generatedVitals.map(v => ({
    parameter:  v.parameter,
    value:      v.value,
    unit:       v.unit,
    isAbnormal: v.isAbnormal,
    isRedFlag:  v.isRedFlag,
  }));
}

// ─── Triage Priority ──────────────────────────
// Derived from observable presentation only.
// Uses red-flag vitals, abnormal vitals, and
// red-flag symptoms as clinical proxies.
// Never uses HiddenState.chosenSeverity.
//
// Red    → immediate life threat
// Orange → urgent, not immediately life-threatening
// Yellow → less urgent, requires monitoring
// Green  → routine assessment

function deriveTriagePriority(
  vitals:   PatientCase["generatedVitals"],
  symptoms: PatientCase["selectedSymptoms"]
): TriagePriority {
  const redFlagVitalCount   = vitals.filter(v => v.isRedFlag).length;
  const abnormalVitalCount  = vitals.filter(v => v.isAbnormal).length;
  const redFlagSymptomCount = symptoms.filter(s => s.isRedFlag).length;

  if (
    redFlagVitalCount >= 2 ||
    (redFlagVitalCount >= 1 && redFlagSymptomCount >= 3)
  ) {
    return "red";
  }

  if (redFlagVitalCount >= 1 || redFlagSymptomCount >= 2) {
    return "orange";
  }

  if (abnormalVitalCount >= 2 || redFlagSymptomCount >= 1) {
    return "yellow";
  }

  return "green";
}

// ─── Public API ───────────────────────────────

/**
 * Converts a PatientCase into a student-facing Encounter.
 *
 * The Encounter contains only information observable
 * at the bedside. Protected engine state is never exposed.
 *
 * This is a pure function. Same PatientCase always
 * produces the same Encounter (timestamp excepted).
 */
export function generateEncounter(patientCase: PatientCase): Encounter {
  return {
    caseId:           patientCase.caseId,
    timestamp:        new Date().toISOString(),
    patientSummary:   buildPatientSummary(patientCase.profile),
    chiefComplaint:   buildChiefComplaint(patientCase.presentingComplaints),
    history:          buildHistory(patientCase),
    visibleVitals:    buildVisibleVitals(patientCase.generatedVitals),
    triagePriority:   deriveTriagePriority(
                        patientCase.generatedVitals,
                        patientCase.selectedSymptoms
                      ),
    availableActions: ENCOUNTER_ACTIONS,
  };
}
