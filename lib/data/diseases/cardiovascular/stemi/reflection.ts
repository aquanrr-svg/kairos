import { Disease } from "../../../../engines/disease/types";
import {
  ClinicalImportance,
  ScoreCategory,
} from "../../../../types/enums";

export const reflectionHooks: Disease["reflectionHooks"] = [

  // ─── Timing ─────────────────────────────────

  {
    id:         "ecg_10_minutes",
    trigger:    "ecg_not_ordered_within_10_clinical_minutes",
    importance: ClinicalImportance.Critical,
    category:   ScoreCategory.Timing,
    weight:     25,
    message:
      "ECG within 10 minutes of first medical contact is a mandatory international standard in STEMI management. " +
      "Diagnostic delay directly extends the ischaemic window and increases irreversible myocardial necrosis. " +
      "Source: ESC Guidelines for the Management of Acute Coronary Syndromes, 2023.",
  },

  {
    id:         "cath_lab_timing",
    trigger:    "cath_lab_not_activated_within_30_clinical_minutes",
    importance: ClinicalImportance.Critical,
    category:   ScoreCategory.Timing,
    weight:     20,
    message:
      "Door-to-balloon time target is 90 minutes. " +
      "Published evidence demonstrates that every 30-minute delay in primary PCI increases one-year mortality by approximately 7.5%. " +
      "Cath Lab activation should occur immediately after ECG confirms STEMI — not after investigations, not after echo, not after stabilisation. " +
      "Source: McNamara et al., JAMA 2006.",
  },

  // ─── Treatment Decision ──────────────────────

  {
    id:         "dual_antiplatelet",
    trigger:    "antiplatelet_incomplete_or_missing",
    importance: ClinicalImportance.High,
    category:   ScoreCategory.TreatmentDecision,
    weight:     20,
    message:
      "Dual antiplatelet therapy with aspirin and a P2Y12 inhibitor is the standard of care in STEMI. " +
      "Neither drug alone provides sufficient platelet inhibition before and during primary PCI. " +
      "Aspirin 300mg and clopidogrel 600mg loading doses should be given as early as possible after diagnosis. " +
      "Source: ESC Guidelines for the Management of Acute Coronary Syndromes, 2023.",
  },

  {
    id:         "oxygen_indication",
    trigger:    "oxygen_given_with_spo2_above_94",
    importance: ClinicalImportance.Moderate,
    category:   ScoreCategory.TreatmentDecision,
    weight:     5,
    message:
      "Routine supplemental oxygen in normoxic STEMI patients is not recommended. " +
      "Hyperoxia causes coronary vasoconstriction and has been shown to increase infarct size in normoxic patients. " +
      "Oxygen should only be given if SpO₂ falls below 94%. " +
      "Source: AVOID Trial, Stub et al., Circulation 2015.",
  },

  // ─── Safety ─────────────────────────────────

  {
    id:         "echo_before_pci",
    trigger:    "echo_ordered_before_cath_lab_activation",
    importance: ClinicalImportance.High,
    category:   ScoreCategory.Safety,
    weight:     15,
    message:
      "Echocardiography is a valuable investigation in STEMI but must never delay reperfusion. " +
      "In ECG-confirmed STEMI, the Cath Lab should be activated before any additional investigations are ordered. " +
      "Echo should be performed after Cath Lab activation — ideally in the catheterisation suite itself if mechanical complications are suspected. " +
      "Source: ESC Guidelines for the Management of Acute Coronary Syndromes, 2023.",
  },

  {
    id:         "nitrate_contraindication",
    trigger:    "nitrate_given_with_sbp_below_90",
    importance: ClinicalImportance.Critical,
    category:   ScoreCategory.Safety,
    weight:     10,
    message:
      "Nitrates are absolutely contraindicated when systolic BP is below 90 mmHg or when right ventricular infarction is suspected. " +
      "In these situations, nitrates cause systemic vasodilation without improving coronary perfusion, " +
      "precipitating cardiovascular collapse. " +
      "RV infarction should always be considered in inferior STEMI before administering any vasodilator. " +
      "Source: ESC Guidelines for the Management of Acute Coronary Syndromes, 2023.",
  },

  // ─── Diagnostic Reasoning ────────────────────

  {
    id:         "silent_mi_awareness",
    trigger:    "atypical_presentation_not_recognised",
    importance: ClinicalImportance.High,
    category:   ScoreCategory.DiagnosticReasoning,
    weight:     5,
    message:
      "STEMI does not always present with classic central chest pain. " +
      "Diabetic patients with autonomic neuropathy, elderly individuals, and women are significantly more likely " +
      "to present with atypical or absent chest pain. " +
      "Dyspnoea, fatigue, nausea, epigastric discomfort, or unexplained syncope may be the only presenting features. " +
      "A high index of suspicion and early ECG remain the most important tools in these presentations. " +
      "Source: ESC Guidelines for the Management of Acute Coronary Syndromes, 2023.",
  },

];

export const scoring: Disease["scoring"] = {
  algorithm:   "weighted",
  totalPoints: 100,
  weights: {
    [ScoreCategory.Timing]:              45,
    [ScoreCategory.TreatmentDecision]:   25,
    [ScoreCategory.Safety]:              25,
    [ScoreCategory.DiagnosticReasoning]:  5,
  },
};
