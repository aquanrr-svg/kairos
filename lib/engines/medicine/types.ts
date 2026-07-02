// ─────────────────────────────────────────────
// KAIROS — Medicine Engine Types
// Medicines are stored once, referenced everywhere.
// Disease Engine never duplicates medicine data.
// ─────────────────────────────────────────────

import {
  BaseEntity,
  Range,
  MedicalReference,
} from "../../types/common";

import {
  RouteOfAdministration,
} from "../../types/enums";

// ─── Dose ─────────────────────────────────────

export interface Dose {
  value:     number | null;
  unit:      string;
  maxValue?: number;
  weightBased?: boolean;     // e.g. units/kg
  titratable?: boolean;
  condition?:  string;       // e.g. "if SpO₂ < 94%"
}

// ─── Dose Rule ────────────────────────────────

export interface DoseRule {
  population:  "adult" | "paediatric" | "elderly" | "renal_impaired";
  dose:         Dose;
  route:        RouteOfAdministration;
  frequency:    string;
  notes?:       string[];
}

// ─── Interaction ──────────────────────────────
// Future phase — interfaces prepared now.

export interface DrugInteraction {
  medicineId:  string;
  severity:    "contraindicated" | "caution" | "monitor";
  mechanism:   string;
  clinicalEffect: string;
}

// ─── Monitoring ───────────────────────────────

export interface MonitoringParameter {
  parameter:  string;
  frequency:  string;
  target?:    string;
  redFlag?:   string;
}

// ─── Medicine ─────────────────────────────────
// The core Medicine Engine entity.

export interface Medicine extends BaseEntity {
  genericName:      string;
  brandNames:       string[];          // future
  drugClass:        string;
  mechanism:        string;
  indications:      string[];
  contraindications: string[];
  doseRules:        DoseRule[];
  interactions:     DrugInteraction[]; // future
  monitoring:       MonitoringParameter[];
  sideEffects:      string[];
  educationalNotes: string[];
}

// ─── Treatment Reference ──────────────────────
// What Disease Engine stores — a reference,
// not a full medicine definition.

export interface TreatmentReference {
  medicineId:     string;             // → Medicine Engine
  priority:       string;             // TreatmentPriority enum
  timing:         string;             // TreatmentTiming enum
  doseRuleTarget: "adult";            // which DoseRule to use
  condition?:     string;             // clinical condition for use
  correctChoice:  boolean;
  educationalNotes: string[];
}
