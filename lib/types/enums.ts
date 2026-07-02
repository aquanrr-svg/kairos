// ─────────────────────────────────────────────
// KAIROS — Shared Enums
// Source of truth for all engine type literals.
// Never duplicate these values elsewhere.
// ─────────────────────────────────────────────

// Medical data lifecycle
export enum DataStatus {
  Draft      = "draft",
  Reviewed   = "reviewed",
  Production = "production",
}

// Clinical severity levels
export enum Severity {
  Mild     = "mild",
  Moderate = "moderate",
  Severe   = "severe",
}

// Symptom/finding frequency in population
export enum Frequency {
  Most = "most",   // >66% of patients
  Some = "some",   // 33–66%
  Rare = "rare",   // <33%
}

// Clinical presentation pattern
export enum Typicality {
  Classic  = "classic",
  Typical  = "typical",
  Atypical = "atypical",
}

// Coronary territory / infarct location
export enum InfarctLocation {
  Anterior  = "anterior",
  Inferior  = "inferior",
  Posterior = "posterior",
  Lateral   = "lateral",
  Global    = "global",
}

// Semantic meaning of a result — never a UI color
export enum Interpretation {
  Normal   = "normal",
  Elevated = "elevated",
  Reduced  = "reduced",
  Critical = "critical",
  Absent   = "absent",
  Present  = "present",
}

// Investigation modality
export enum InvestigationType {
  Bedside   = "bedside",
  Lab       = "lab",
  Imaging   = "imaging",
  Procedure = "procedure",
}

// How urgently an investigation should be ordered
export enum InvestigationPriority {
  Mandatory  = "mandatory",
  Important  = "important",
  Optional   = "optional",
}

// When in the clinical timeline to order
export enum InvestigationTiming {
  Immediate = "immediate",
  Urgent    = "urgent",
  Routine   = "routine",
}

// What action unlocks access to this investigation
export enum UnlockMethod {
  Always        = "always",
  History       = "history",
  Examination   = "examination",
  Investigation = "investigation",
}

// Data quality confidence
export enum Reliability {
  High     = "high",
  Moderate = "moderate",
  Low      = "low",
}

// How clinically significant a finding/symptom is
export enum ClinicalImportance {
  Critical = "critical",
  High     = "high",
  Moderate = "moderate",
  Low      = "low",
}

// Route of medicine administration
export enum RouteOfAdministration {
  Oral          = "oral",
  IV            = "iv",
  IVBolus       = "iv_bolus",
  IVInfusion    = "iv_infusion",
  IM            = "im",
  SC            = "sc",
  Sublingual    = "sublingual",
  Inhalation    = "inhalation",
  Topical       = "topical",
  NasalCannula  = "nasal_cannula",
  Procedure     = "procedure",
}

// How critical a treatment is
export enum TreatmentPriority {
  Mandatory  = "mandatory",
  Important  = "important",
  Optional   = "optional",
}

// When a treatment must be given
export enum TreatmentTiming {
  Immediate = "immediate",
  Urgent    = "urgent",
  Elective  = "elective",
}

// Category of complication
export enum ComplicationCategory {
  Electrical    = "electrical",
  Mechanical    = "mechanical",
  Inflammatory  = "inflammatory",
  Metabolic     = "metabolic",
  Thromboembolic = "thromboembolic",
}

// When a complication appears relative to event
export enum ComplicationOnset {
  Immediate = "immediate",  // 0–1 hour
  Early     = "early",      // 1–24 hours
  Subacute  = "subacute",   // 24–120 hours
  Late      = "late",       // >120 hours
}

// Patient outcome category
export enum OutcomeType {
  FullRecovery    = "full_recovery",
  PartialRecovery = "partial_recovery",
  Transfer        = "transfer",
  Death           = "death",
}

// Reflection depth
export enum ReflectionType {
  Immediate = "immediate",
  Deep      = "deep",
}

// Performance weight category
export enum ScoreCategory {
  DiagnosticReasoning = "diagnostic_reasoning",
  InvestigationChoice = "investigation_choice",
  TreatmentDecision   = "treatment_decision",
  Safety              = "safety",
  Timing              = "timing",
}

// Medical guideline source
export enum GuidelineSource {
  WHO   = "WHO",
  ESC   = "ESC",
  AHA   = "AHA",
  NICE  = "NICE",
  ICMR  = "ICMR",
}

// Clinical career level
export enum CareerLevel {
  FirstYear      = "first_year_mbbs",
  SecondYear     = "second_year_mbbs",
  ThirdYear      = "third_year_mbbs",
  FinalYear      = "final_year_mbbs",
  Intern         = "intern",
  JuniorResident = "junior_resident",
  SeniorResident = "senior_resident",
  Registrar      = "registrar",
  Consultant     = "consultant",
  HoD            = "head_of_department",
}
