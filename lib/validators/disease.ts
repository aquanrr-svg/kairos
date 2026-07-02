// ─────────────────────────────────────────────
// KAIROS — Disease Validator
// Validates disease data before runtime use.
// ─────────────────────────────────────────────

import { Disease, Investigation } from "../engines/disease/types";
import { DataStatus } from "../types/enums";

export interface ValidationResult {
  valid:    boolean;
  errors:   string[];
  warnings: string[];
}

// ─── Base Entity ──────────────────────────────

function validateBaseFields(disease: Disease): string[] {
  const errors: string[] = [];
  if (!disease.id)          errors.push("Missing id");
  if (!disease.version)     errors.push("Missing version");
  if (!disease.lastUpdated) errors.push("Missing lastUpdated");
  if (!disease.status)      errors.push("Missing status");
  if (!disease.references || disease.references.length === 0) {
    errors.push("Disease must have at least one reference");
  }
  return errors;
}

// ─── Symptoms ─────────────────────────────────

function validateSymptoms(disease: Disease): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  if (!disease.symptoms || disease.symptoms.length === 0) {
    errors.push("Disease must have at least one symptom");
    return errors;
  }

  disease.symptoms.forEach((symptom, i) => {
    if (!symptom.id)   errors.push(`Symptom[${i}] missing id`);
    if (!symptom.name) errors.push(`Symptom[${i}] missing name`);
    if (!symptom.patientPhrases || symptom.patientPhrases.length === 0) {
      errors.push(`Symptom[${i}] "${symptom.name}" must have at least one patient phrase`);
    }
    if (ids.has(symptom.id)) {
      errors.push(`Duplicate symptom id: ${symptom.id}`);
    }
    ids.add(symptom.id);
  });

  return errors;
}

// ─── Vital Signs ──────────────────────────────

function validateVitalSigns(disease: Disease): string[] {
  const errors: string[] = [];

  if (!disease.vitalSigns || disease.vitalSigns.length === 0) {
    errors.push("Disease must define vital signs");
    return errors;
  }

  disease.vitalSigns.forEach((vital, i) => {
    if (!vital.parameter) errors.push(`VitalSign[${i}] missing parameter`);
    if (!vital.unit)      errors.push(`VitalSign[${i}] missing unit`);

    ["normal","mild","moderate","severe"].forEach(level => {
      const key = level as keyof typeof vital;
      const entry = vital[key] as { range: { min: number; max: number } } | undefined;
      if (!entry || entry.range.min === undefined || entry.range.max === undefined) {
        errors.push(`VitalSign "${vital.parameter}" missing range for severity: ${level}`);
      }
      if (entry && entry.range.min > entry.range.max) {
        errors.push(`VitalSign "${vital.parameter}" has min > max for ${level}`);
      }
    });
  });

  return errors;
}

// ─── Investigations ───────────────────────────

function validateInvestigations(disease: Disease): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  disease.investigations?.forEach((inv: Investigation, i) => {
    if (!inv.id)   errors.push(`Investigation[${i}] missing id`);
    if (!inv.name) errors.push(`Investigation[${i}] missing name`);

    if (ids.has(inv.id)) {
      errors.push(`Duplicate investigation id: ${inv.id}`);
    }
    ids.add(inv.id);

    if (inv.probability < 0 || inv.probability > 1) {
      errors.push(`Investigation "${inv.name}" probability must be between 0 and 1`);
    }

    ["normal","mild","moderate","severe"].forEach(level => {
      const result = inv.results[level as keyof typeof inv.results];
      if (!result) {
        errors.push(`Investigation "${inv.name}" missing results for ${level}`);
      }
    });
  });

  return errors;
}

// ─── Treatments ───────────────────────────────

function validateTreatments(disease: Disease): string[] {
  const errors: string[] = [];

  if (!disease.treatments?.correct || disease.treatments.correct.length === 0) {
    errors.push("Disease must have at least one correct treatment");
  }

  disease.treatments?.correct?.forEach((t, i) => {
    if (!t.medicineId) {
      errors.push(`Treatment[${i}] missing medicineId — use Medicine Engine reference`);
    }
  });

  return errors;
}

// ─── Reflection ───────────────────────────────

function validateReflection(disease: Disease): string[] {
  const errors: string[] = [];

  const totalWeight = disease.reflectionHooks?.reduce(
    (sum, hook) => sum + hook.weight, 0
  ) ?? 0;

  if (totalWeight !== 100) {
    errors.push(
      `Reflection hook weights must total 100. Current total: ${totalWeight}`
    );
  }

  return errors;
}

// ─── Status Warning ───────────────────────────

function validateStatus(disease: Disease): string[] {
  const warnings: string[] = [];
  if (disease.status === DataStatus.Draft) {
    warnings.push(`Disease "${disease.name}" is in Draft status and should not be used in production`);
  }
  return warnings;
}

// ─── Main Validator ───────────────────────────

export function validateDisease(disease: Disease): ValidationResult {
  const errors: string[] = [
    ...validateBaseFields(disease),
    ...validateSymptoms(disease),
    ...validateVitalSigns(disease),
    ...validateInvestigations(disease),
    ...validateTreatments(disease),
    ...validateReflection(disease),
  ];

  const warnings: string[] = [
    ...validateStatus(disease),
  ];

  return {
    valid:    errors.length === 0,
    errors,
    warnings,
  };
}
