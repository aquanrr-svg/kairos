// ─────────────────────────────────────────────
// KAIROS — Disease Validator
//
// Two validation tiers:
//
//   Structural — verifies required fields, ranges,
//     and duplicate IDs. No external dependencies.
//     Always runs.
//
//   Semantic — verifies cross-engine references.
//     Requires ValidationContext. Only runs when
//     context is provided.
//
// Extension pattern:
//   Add new validators to structuralValidators[]
//   or semanticValidators[]. Never modify
//   validateDisease() itself.
//
// Architecture note:
//   ValidationContext uses ReadonlySet<string>
//   rather than engine types (e.g. Medicine[]).
//   This decouples the validator from engine
//   implementations. If the Medicine Engine is
//   refactored, this file is unaffected.
// ─────────────────────────────────────────────

import { Disease, Investigation } from "../engines/disease/types";
import { DataStatus } from "../types/enums";
import { getRegisteredTriggers } from "../engines/scoring/triggers";

// ─── Public Types ─────────────────────────────

export interface ValidationResult {
  valid:    boolean;
  errors:   string[];
  warnings: string[];
}

// ValidationContext carries external registry data
// for semantic validation. Extend this interface as
// new cross-reference needs emerge.
// Existing validators are unaffected by additions.

export interface ValidationContext {
  availableMedicineIds: ReadonlySet<string>;
  // Future:
  // availableInvestigationIds?: ReadonlySet<string>;
  // availableDiseaseIds?: ReadonlySet<string>;
}

// ─── Structural Validators ────────────────────
// Pure functions. Return string[] of error messages.
// No external dependencies.

function validateBaseFields(disease: Disease): string[] {
  const errors: string[] = [];
  if (!disease.id)          errors.push("Missing field: id");
  if (!disease.version)     errors.push("Missing field: version");
  if (!disease.lastUpdated) errors.push("Missing field: lastUpdated");
  if (!disease.status)      errors.push("Missing field: status");
  if (!disease.name)        errors.push("Missing field: name");
  if (!disease.icdCode)     errors.push("Missing field: icdCode");
  if (!disease.category)    errors.push("Missing field: category");
  if (!disease.references || disease.references.length === 0) {
    errors.push("Disease must have at least one reference");
  }
  return errors;
}

function validateSymptoms(disease: Disease): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  if (!disease.symptoms || disease.symptoms.length === 0) {
    return ["Disease must have at least one symptom"];
  }

  disease.symptoms.forEach((symptom, i) => {
    if (!symptom.id) {
      errors.push(`Symptom[${i}] missing id`);
    } else {
      if (ids.has(symptom.id)) {
        errors.push(`Duplicate symptom id: "${symptom.id}"`);
      }
      ids.add(symptom.id);
    }
    if (!symptom.name) {
      errors.push(`Symptom[${i}] missing name`);
    }
    if (!symptom.patientPhrases || symptom.patientPhrases.length === 0) {
      errors.push(
        `Symptom "${symptom.name ?? i}" must have at least one patientPhrase`
      );
    }
  });

  return errors;
}

function validateVitalSigns(disease: Disease): string[] {
  const errors: string[] = [];

  if (!disease.vitalSigns || disease.vitalSigns.length === 0) {
    return ["Disease must define vital signs"];
  }

  disease.vitalSigns.forEach((vital, i) => {
    if (!vital.parameter) errors.push(`VitalSign[${i}] missing parameter`);
    if (!vital.unit)      errors.push(`VitalSign[${i}] missing unit`);

    (["normal", "mild", "moderate", "severe"] as const).forEach(level => {
      const entry = vital[level];
      if (!entry || entry.range.min === undefined || entry.range.max === undefined) {
        errors.push(
          `VitalSign "${vital.parameter}" missing range for severity: ${level}`
        );
      } else if (entry.range.min > entry.range.max) {
        errors.push(
          `VitalSign "${vital.parameter}" has min > max for severity: ${level}`
        );
      }
    });
  });

  return errors;
}

function validateInvestigations(disease: Disease): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  (disease.investigations ?? []).forEach((inv: Investigation, i) => {
    if (!inv.id) {
      errors.push(`Investigation[${i}] missing id`);
    } else {
      if (ids.has(inv.id)) {
        errors.push(`Duplicate investigation id: "${inv.id}"`);
      }
      ids.add(inv.id);
    }
    if (!inv.name) {
      errors.push(`Investigation[${i}] missing name`);
    }
    if (inv.probability < 0 || inv.probability > 1) {
      errors.push(
        `Investigation "${inv.name}" probability must be between 0 and 1`
      );
    }
    (["normal", "mild", "moderate", "severe"] as const).forEach(level => {
      if (!inv.results[level]) {
        errors.push(
          `Investigation "${inv.name}" missing results for severity: ${level}`
        );
      }
    });
  });

  return errors;
}

function validateTreatmentStructure(disease: Disease): string[] {
  const errors: string[] = [];

  if (!disease.treatments?.correct || disease.treatments.correct.length === 0) {
    errors.push("Disease must have at least one correct treatment");
  }

  (disease.treatments?.correct ?? []).forEach((t, i) => {
    if (!t.medicineId) {
      errors.push(
        `Treatment[${i}] missing medicineId. ` +
        `Treatments must reference the Medicine Engine by ID.`
      );
    }
  });

  return errors;
}

function validateReflectionWeights(disease: Disease): string[] {
  const errors: string[] = [];

  const hookTotal = (disease.reflectionHooks ?? []).reduce(
    (sum, hook) => sum + hook.weight, 0
  );

  if (hookTotal !== disease.scoring.totalPoints) {
    errors.push(
      `Reflection hook weights sum to ${hookTotal} ` +
      `but scoring.totalPoints is ${disease.scoring.totalPoints}. ` +
      `These must be equal.`
    );
  }

  // Architecture note:
  // Per-category weight consistency (hook weights per category must equal
  // scoring.weights[category]) is intentionally not validated here.
  // This check will be added when PerformanceScoring is refactored to
  // derive category weights dynamically from hook weights.
  // Tracking issue: Architectural Review — C3.

  return errors;
}

function validateReflectionTriggers(disease: Disease): string[] {
  const errors: string[] = [];
  const registered = getRegisteredTriggers();

  (disease.reflectionHooks ?? []).forEach((hook, i) => {
    if (!registered.has(hook.trigger)) {
      errors.push(
        `Reflection hook[${i}] ("${hook.id}") references unknown trigger ` +
        `"${hook.trigger}". No evaluator is registered for it in the Scoring ` +
        `Engine, so this hook would silently award full points. ` +
        `Register an evaluator in lib/engines/scoring/triggers.ts or fix the trigger name.`
      );
    }
  });

  return errors;
}

function validateOutcomeProbabilities(disease: Disease): string[] {
  const errors: string[] = [];

  const total = (disease.outcome?.scenarios ?? []).reduce(
    (sum, s) => sum + s.baseProbability, 0
  );

  // Allow floating point tolerance of 0.001
  if (Math.abs(total - 1.0) > 0.001) {
    errors.push(
      `Outcome scenario baseProbability values sum to ${total.toFixed(4)}, ` +
      `expected 1.0000. Adjust scenario probabilities.`
    );
  }

  return errors;
}

// ─── Semantic Validators ──────────────────────
// Require ValidationContext.
// Verify cross-engine reference integrity.

function validateMedicineReferences(
  disease: Disease,
  context: ValidationContext
): string[] {
  const errors: string[] = [];

  (disease.treatments?.correct ?? []).forEach((treatment, i) => {
    if (
      treatment.medicineId &&
      !context.availableMedicineIds.has(treatment.medicineId)
    ) {
      errors.push(
        `Treatment[${i}] references unknown medicineId: "${treatment.medicineId}". ` +
        `This medicine does not exist in the Medicine Engine registry. ` +
        `Check for typos or add the medicine to lib/data/medicines/.`
      );
    }
  });

  return errors;
}

// ─── Validator Pipelines ─────────────────────
// To add a new structural validator: append to structuralValidators.
// To add a new semantic validator:   append to semanticValidators.
// Never modify validateDisease() to add new checks.

type StructuralValidator = (disease: Disease) => string[];
type SemanticValidator   = (disease: Disease, ctx: ValidationContext) => string[];

const structuralValidators: readonly StructuralValidator[] = [
  validateBaseFields,
  validateSymptoms,
  validateVitalSigns,
  validateInvestigations,
  validateTreatmentStructure,
  validateReflectionWeights,
  validateReflectionTriggers,
  validateOutcomeProbabilities,
];

const semanticValidators: readonly SemanticValidator[] = [
  validateMedicineReferences,
];

// ─── Status Warnings ──────────────────────────

function collectWarnings(
  disease: Disease,
  contextProvided: boolean
): string[] {
  const warnings: string[] = [];

  if (disease.status === DataStatus.Draft) {
    warnings.push(
      `Disease "${disease.name}" has status Draft ` +
      `and must not be used in production case generation.`
    );
  }

  if (!contextProvided) {
    warnings.push(
      `validateDisease called without ValidationContext. ` +
      `Semantic cross-reference validation was skipped. ` +
      `Provide a ValidationContext to verify medicine and ` +
      `investigation references.`
    );
  }

  return warnings;
}

// ─── Public API ───────────────────────────────

export function validateDisease(
  disease: Disease,
  context?: ValidationContext
): ValidationResult {
  const errors: string[] = [
    ...structuralValidators.flatMap(v => v(disease)),
    ...(context
      ? semanticValidators.flatMap(v => v(disease, context))
      : []
    ),
  ];

  return {
    valid:    errors.length === 0,
    errors,
    warnings: collectWarnings(disease, context !== undefined),
  };
}
