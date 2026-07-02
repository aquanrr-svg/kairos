// ─────────────────────────────────────────────
// KAIROS — Medicine Validator
// ─────────────────────────────────────────────

import { Medicine } from "../engines/medicine/types";
import { ValidationResult } from "./disease";

export function validateMedicine(medicine: Medicine): ValidationResult {
  const errors:   string[] = [];
  const warnings: string[] = [];

  if (!medicine.id)          errors.push("Missing id");
  if (!medicine.genericName) errors.push("Missing genericName");
  if (!medicine.mechanism)   errors.push("Missing mechanism");
  if (!medicine.references || medicine.references.length === 0) {
    errors.push("Medicine must have at least one reference");
  }
  if (!medicine.doseRules || medicine.doseRules.length === 0) {
    errors.push("Medicine must have at least one dose rule");
  }

  medicine.doseRules?.forEach((rule, i) => {
    if (!rule.dose.unit) {
      errors.push(`DoseRule[${i}] missing unit`);
    }
    if (rule.dose.value === null && !rule.dose.condition) {
      warnings.push(`DoseRule[${i}] has null value without a condition — verify this is intentional`);
    }
  });

  if (medicine.contraindications.length === 0) {
    warnings.push(`Medicine "${medicine.genericName}" has no contraindications listed`);
  }

  return { valid: errors.length === 0, errors, warnings };
}
