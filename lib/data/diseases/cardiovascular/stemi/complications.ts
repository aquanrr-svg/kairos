import { Disease } from "../../../../engines/disease/types";
import {
  Severity,
  Frequency,
  ComplicationCategory,
  ComplicationOnset,
  InfarctLocation,
} from "../../../../types/enums";

export const complications: Disease["complications"] = [

  // ─── Electrical ─────────────────────────────

  {
    id:               "ventricular_fibrillation",
    name:             "Ventricular Fibrillation",
    category:         ComplicationCategory.Electrical,
    onset:            ComplicationOnset.Immediate,
    timing:           { hoursAfterEvent: { min: 0, max: 24 } },
    frequency:        Frequency.Some,
    severityRequired: [Severity.Moderate, Severity.Severe],
    prerequisites:    [
      "large_infarction",
      "electrical_instability_on_ecg",
    ],
    redFlag:          true,
    educationalNotes:
      "Most common cause of death in the first hour of STEMI. Treated with immediate unsynchronised defibrillation. Continuous ECG monitoring is mandatory from the point of first contact.",
  },

  {
    id:               "ventricular_tachycardia",
    name:             "Ventricular Tachycardia",
    category:         ComplicationCategory.Electrical,
    onset:            ComplicationOnset.Immediate,
    timing:           { hoursAfterEvent: { min: 0, max: 48 } },
    frequency:        Frequency.Some,
    severityRequired: [Severity.Moderate, Severity.Severe],
    prerequisites:    [
      "electrical_instability_on_ecg",
    ],
    redFlag:          true,
    educationalNotes:
      "Sustained VT with haemodynamic compromise requires immediate synchronised cardioversion. Amiodarone is used for recurrent or haemodynamically stable episodes.",
  },

  {
    id:               "complete_av_block",
    name:             "Complete AV Block",
    category:         ComplicationCategory.Electrical,
    onset:            ComplicationOnset.Early,
    timing:           { hoursAfterEvent: { min: 1, max: 24 } },
    frequency:        Frequency.Some,
    severityRequired: [Severity.Moderate, Severity.Severe],
    locationDependency: [InfarctLocation.Inferior],
    prerequisites:    [
      "inferior_stemi",
    ],
    redFlag:          true,
    educationalNotes:
      "Occurs in inferior STEMI due to involvement of the AV nodal artery, which arises from the RCA in most patients. Often transient and may resolve after reperfusion. Temporary pacing is required if the patient is haemodynamically compromised.",
  },

  // ─── Mechanical ─────────────────────────────

  {
    id:               "cardiogenic_shock",
    name:             "Cardiogenic Shock",
    category:         ComplicationCategory.Mechanical,
    onset:            ComplicationOnset.Early,
    timing:           { hoursAfterEvent: { min: 0, max: 24 } },
    frequency:        Frequency.Some,
    severityRequired: [Severity.Severe],
    prerequisites:    [
      "ef_below_35",
      "persistent_hypotension_sbp_below_90",
      "large_anterior_infarction",
    ],
    redFlag:          true,
    educationalNotes:
      "Defined as sustained SBP below 90 mmHg with evidence of end-organ hypoperfusion despite adequate filling. Mortality exceeds 50%. Requires urgent revascularisation, inotropic support, and consideration of mechanical circulatory support such as IABP.",
  },

  {
    id:               "free_wall_rupture",
    name:             "Left Ventricular Free Wall Rupture",
    category:         ComplicationCategory.Mechanical,
    onset:            ComplicationOnset.Subacute,
    timing:           { hoursAfterEvent: { min: 24, max: 120 } },
    frequency:        Frequency.Rare,
    severityRequired: [Severity.Severe],
    prerequisites:    [
      "large_infarction",
      "no_reperfusion_or_significantly_delayed",
    ],
    redFlag:          true,
    educationalNotes:
      "Catastrophic mechanical complication presenting as sudden haemodynamic collapse with tamponade physiology. Echo shows pericardial effusion with right heart compression. Immediate pericardiocentesis and emergency surgery are required.",
  },

  {
    id:               "ventricular_septal_defect",
    name:             "Ventricular Septal Defect",
    category:         ComplicationCategory.Mechanical,
    onset:            ComplicationOnset.Subacute,
    timing:           { hoursAfterEvent: { min: 24, max: 120 } },
    frequency:        Frequency.Rare,
    severityRequired: [Severity.Severe],
    prerequisites:    [
      "large_infarction",
    ],
    redFlag:          true,
    educationalNotes:
      "Presents as a new harsh pansystolic murmur with sudden haemodynamic deterioration. Echo confirms a left-to-right shunt. Percutaneous or surgical closure is required. Must be distinguished from papillary muscle rupture, which presents similarly.",
  },

  {
    id:               "papillary_muscle_rupture",
    name:             "Papillary Muscle Rupture",
    category:         ComplicationCategory.Mechanical,
    onset:            ComplicationOnset.Subacute,
    timing:           { hoursAfterEvent: { min: 24, max: 96 } },
    frequency:        Frequency.Rare,
    severityRequired: [Severity.Severe],
    locationDependency: [InfarctLocation.Inferior],
    prerequisites:    [
      "inferior_stemi",
    ],
    redFlag:          true,
    educationalNotes:
      "The posterior papillary muscle has a single blood supply from the RCA, making it more vulnerable than the anterior papillary muscle. Presents as acute severe mitral regurgitation with flash pulmonary oedema. Emergency surgical repair is required.",
  },

  // ─── Inflammatory ────────────────────────────

  {
    id:               "early_pericarditis",
    name:             "Early Pericarditis",
    category:         ComplicationCategory.Inflammatory,
    onset:            ComplicationOnset.Early,
    timing:           { hoursAfterEvent: { min: 24, max: 72 } },
    frequency:        Frequency.Some,
    severityRequired: [Severity.Mild, Severity.Moderate, Severity.Severe],
    prerequisites:    [],
    redFlag:          false,
    educationalNotes:
      "Pleuritic chest pain worsened by lying flat and relieved by sitting forward. A pericardial friction rub may be heard on auscultation. Treat with high-dose aspirin. NSAIDs and corticosteroids should be avoided in the early post-MI period as they impair myocardial scar formation.",
  },

  {
    id:               "dressler_syndrome",
    name:             "Dressler Syndrome",
    category:         ComplicationCategory.Inflammatory,
    onset:            ComplicationOnset.Late,
    timing:           { hoursAfterEvent: { min: 336, max: 1680 } },
    frequency:        Frequency.Rare,
    severityRequired: [Severity.Mild, Severity.Moderate],
    prerequisites:    [],
    redFlag:          false,
    educationalNotes:
      "Autoimmune pericarditis occurring 2 to 10 weeks after myocardial infarction. Mediated by antibodies against myocardial antigens released during necrosis. Presents with fever, pleuritic chest pain, and elevated inflammatory markers. Treat with aspirin or colchicine. Corticosteroids reserved for refractory cases.",
  },
];
