// ─────────────────────────────────────────────
// KAIROS — STEMI Disease Data
// Gold Standard Template — v1.0.0
// Source: ESC Guidelines 2023
//
// RULES:
// - No medicine definitions. References only.
// - No UI. No colors. No patient names.
// - No business logic.
// Medical truth only.
// ─────────────────────────────────────────────

import { Disease } from "../../../engines/disease/types";
import {
  DataStatus,
  Severity,
  Frequency,
  Typicality,
  InfarctLocation,
  Interpretation,
  InvestigationType,
  InvestigationPriority,
  InvestigationTiming,
  UnlockMethod,
  Reliability,
  ClinicalImportance,
  TreatmentPriority,
  TreatmentTiming,
  ComplicationCategory,
  ComplicationOnset,
  OutcomeType,
  ScoreCategory,
} from "../../../types/enums";

export const stemi: Disease = {

  // ─── Base ───────────────────────────────────
  id:          "stemi",
  version:     "1.0.0",
  lastUpdated: "2025-06-28",
  status:      DataStatus.Production,
  name:        "ST-Elevation Myocardial Infarction",
  icdCode:     "I21",
  category:    "cardiovascular",

  references: [
    {
      source:  "ESC",
      title:   "2023 ESC Guidelines for the management of acute coronary syndromes",
      year:    2023,
      url:     "https://academic.oup.com/eurheartj/article/44/38/3720/7243210",
    },
    {
      source:  "AHA",
      title:   "2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction",
      year:    2013,
    },
  ],

  // ─── Symptoms ───────────────────────────────
  symptoms: [
    {
      id:                 "chest_pain_central",
      name:               "Central chest pain",
      typicality:         Typicality.Classic,
      frequency:          Frequency.Most,
      severity:           [Severity.Mild, Severity.Moderate, Severity.Severe],
      redFlag:            true,
      clinicalImportance: ClinicalImportance.Critical,
      reliability:        Reliability.High,
      unlockMethod:       UnlockMethod.History,
      specialNotes: [
        "Lasts >20 minutes. Not relieved by rest or nitrates.",
        "Described as heavy, crushing, squeezing, or pressure-like — rarely sharp.",
      ],
      patientPhrases: [
        "It feels like an elephant is sitting on my chest.",
        "There is a heavy pressure in the middle of my chest.",
        "My chest feels very tight, like someone is squeezing it.",
        "It is a crushing pain, right here in the centre.",
      ],
    },
    {
      id:                 "radiation_left_arm",
      name:               "Pain radiating to left arm",
      typicality:         Typicality.Classic,
      frequency:          Frequency.Most,
      severity:           [Severity.Mild, Severity.Moderate, Severity.Severe],
      redFlag:            true,
      clinicalImportance: ClinicalImportance.Critical,
      reliability:        Reliability.High,
      unlockMethod:       UnlockMethod.History,
      specialNotes: [
        "Can extend to forearm or hand.",
        "Bilateral radiation increases suspicion further.",
      ],
      patientPhrases: [
        "The pain is going into my left arm.",
        "My left arm feels heavy and painful.",
        "The pain travels down my left arm to my fingers.",
      ],
    },
    {
      id:                 "radiation_jaw",
      name:               "Pain radiating to jaw or neck",
      typicality:         Typicality.Classic,
      frequency:          Frequency.Some,
      severity:           [Severity.Moderate, Severity.Severe],
      redFlag:            true,
      clinicalImportance: ClinicalImportance.High,
      reliability:        Reliability.High,
      locationDependency: [InfarctLocation.Inferior],
      unlockMethod:       UnlockMethod.History,
      specialNotes: ["More common in inferior wall infarction."],
      patientPhrases: [
        "My jaw is also hurting.",
        "I have pain going up into my neck.",
        "My teeth are aching along with the chest pain.",
      ],
    },
    {
      id:                 "diaphoresis",
      name:               "Diaphoresis",
      typicality:         Typicality.Classic,
      frequency:          Frequency.Most,
      severity:           [Severity.Mild, Severity.Moderate, Severity.Severe],
      redFlag:            true,
      clinicalImportance: ClinicalImportance.High,
      reliability:        Reliability.High,
      unlockMethod:       UnlockMethod.History,
      specialNotes: [
        "Cold, clammy sweating due to sympathetic activation.",
        "Highly suggestive when combined with chest pain.",
      ],
      patientPhrases: [
        "I am sweating a lot even though I feel cold.",
        "My shirt is soaked. I was sweating since early morning.",
        "I feel clammy all over.",
      ],
    },
    {
      id:                 "dyspnea",
      name:               "Shortness of breath",
      typicality:         Typicality.Classic,
      frequency:          Frequency.Most,
      severity:           [Severity.Mild, Severity.Moderate, Severity.Severe],
      redFlag:            true,
      clinicalImportance: ClinicalImportance.High,
      reliability:        Reliability.High,
      unlockMethod:       UnlockMethod.History,
      specialNotes: [
        "May occur with or without chest pain.",
        "Often indicates left ventricular dysfunction or pulmonary oedema.",
      ],
      patientPhrases: [
        "I cannot breathe properly.",
        "I feel breathless even when sitting still.",
        "Taking a deep breath is very difficult.",
      ],
    },
    {
      id:                 "nausea",
      name:               "Nausea",
      typicality:         Typicality.Typical,
      frequency:          Frequency.Some,
      severity:           [Severity.Moderate, Severity.Severe],
      redFlag:            false,
      clinicalImportance: ClinicalImportance.Moderate,
      reliability:        Reliability.Moderate,
      locationDependency: [InfarctLocation.Inferior],
      unlockMethod:       UnlockMethod.History,
      specialNotes: ["More common in inferior STEMI due to vagal stimulation."],
      patientPhrases: [
        "I feel like I want to vomit.",
        "My stomach is feeling sick.",
        "I vomited once this morning.",
      ],
    },
    {
      id:                 "epigastric",
      name:               "Epigastric discomfort",
      typicality:         Typicality.Atypical,
      frequency:          Frequency.Some,
      severity:           [Severity.Mild, Severity.Moderate],
      redFlag:            false,
      clinicalImportance: ClinicalImportance.Moderate,
      reliability:        Reliability.Low,
      locationDependency: [InfarctLocation.Inferior],
      unlockMethod:       UnlockMethod.History,
      specialNotes: [
        "Frequently mistaken for indigestion. Patients may self-treat with antacids, causing dangerous delays.",
      ],
      patientPhrases: [
        "I thought it was gas pain in my stomach.",
        "It felt like indigestion so I took some antacid.",
        "I have a burning feeling here in my upper stomach.",
      ],
    },
    {
      id:                 "silent",
      name:               "Silent presentation",
      typicality:         Typicality.Atypical,
      frequency:          Frequency.Rare,
      severity:           [Severity.Mild, Severity.Moderate, Severity.Severe],
      redFlag:            true,
      clinicalImportance: ClinicalImportance.Critical,
      reliability:        Reliability.Low,
      unlockMethod:       UnlockMethod.History,
      specialNotes: [
        "More common in diabetics (autonomic neuropathy), elderly, and women.",
        "Dyspnoea, fatigue, or confusion may be the only presenting features.",
        "One of the most common reasons STEMI is missed.",
      ],
      patientPhrases: [
        "I just feel very tired and weak, nothing else.",
        "I have no chest pain but I cannot breathe properly.",
        "I felt confused when I woke up this morning.",
      ],
    },
  ],

  // ─── Vital Signs ────────────────────────────
  vitalSigns: [
    {
      parameter: "Heart Rate",
      unit:      "bpm",
      normal:    { range: { min: 60,  max: 100 } },
      mild:      { range: { min: 60,  max: 100 } },
      moderate:  { range: { min: 90,  max: 120 } },
      severe:    { range: { min: 110, max: 150 } },
      exceptions: [
        {
          condition:         "inferior_wall_stemi_with_vagal_tone",
          range:             { min: 40, max: 60 },
          locationDependency: [InfarctLocation.Inferior],
          note:              "Bradycardia in inferior STEMI due to AV node involvement and increased vagal tone.",
        },
      ],
      redFlagBelow:  40,
      redFlagAbove:  150,
      specialNotes: [
        "Tachycardia suggests larger infarction, pain, heart failure, or impending shock.",
        "Bradycardia in inferior STEMI is common and may require pacing.",
      ],
    },
    {
      parameter:    "Systolic Blood Pressure",
      unit:         "mmHg",
      normal:       { range: { min: 100, max: 140 } },
      mild:         { range: { min: 110, max: 140 } },
      moderate:     { range: { min: 90,  max: 110 } },
      severe:       { range: { min: 70,  max: 90  } },
      redFlagBelow: 90,
      specialNotes: [
        "Hypotension (SBP <90) suggests cardiogenic shock or right ventricular infarction.",
        "Early hypertension may occur due to pain and sympathetic activation.",
        "SBP <90 is absolute contraindication for nitrates.",
      ],
    },
    {
      parameter:    "Diastolic Blood Pressure",
      unit:         "mmHg",
      normal:       { range: { min: 60, max: 90 } },
      mild:         { range: { min: 70, max: 90 } },
      moderate:     { range: { min: 60, max: 70 } },
      severe:       { range: { min: 40, max: 60 } },
      redFlagBelow: 40,
      specialNotes: [],
    },
    {
      parameter:    "SpO₂",
      unit:         "%",
      normal:       { range: { min: 96, max: 100 } },
      mild:         { range: { min: 96, max: 100 } },
      moderate:     { range: { min: 92, max: 95  } },
      severe:       { range: { min: 85, max: 92  } },
      redFlagBelow: 90,
      specialNotes: [
        "May remain normal if no pulmonary oedema present.",
        "Oxygen only indicated if SpO₂ <94%.",
      ],
    },
    {
      parameter:    "Respiratory Rate",
      unit:         "/min",
      normal:       { range: { min: 12, max: 20 } },
      mild:         { range: { min: 12, max: 20 } },
      moderate:     { range: { min: 20, max: 28 } },
      severe:       { range: { min: 28, max: 40 } },
      redFlagAbove: 30,
      specialNotes: [
        "Tachypnoea reflects pain, anxiety, pulmonary oedema, or metabolic acidosis.",
      ],
    },
    {
      parameter: "Temperature",
      unit:      "°C",
      normal:    { range: { min: 36.5, max: 37.5 } },
      mild:      { range: { min: 36.5, max: 37.5 } },
      moderate:  { range: { min: 37.0, max: 38.0 } },
      severe:    { range: { min: 37.5, max: 38.5 } },
      specialNotes: [
        "Low-grade fever within 24–48 hours is a normal inflammatory response.",
        "High fever >38.5°C should prompt evaluation for concurrent infection.",
      ],
    },
    {
      parameter:    "GCS",
      unit:         "/15",
      normal:       { range: { min: 15, max: 15 } },
      mild:         { range: { min: 15, max: 15 } },
      moderate:     { range: { min: 14, max: 15 } },
      severe:       { range: { min: 8,  max: 14 } },
      redFlagBelow: 14,
      specialNotes: [
        "Reduced GCS is not typical of STEMI itself.",
        "Usually indicates cardiogenic shock, cerebral hypoperfusion, or cardiac arrest.",
        "Any GCS <15 warrants urgent neurological assessment.",
      ],
    },
  ],

  // ─── Investigations ─────────────────────────
  investigations: [
    {
      id:           "ecg_12lead",
      name:         "12-Lead ECG",
      type:         InvestigationType.Bedside,
      priority:     InvestigationPriority.Mandatory,
      timing:       InvestigationTiming.Immediate,
      unlockMethod: UnlockMethod.Always,
      reliability:  Reliability.High,
      probability:  1.0,
      falsePositives: [
        "Left bundle branch block — may mimic or mask STEMI",
        "Early repolarisation pattern in young patients",
        "Pericarditis — diffuse ST elevation with saddle shape",
        "Takotsubo cardiomyopathy",
        "Hyperkalaemia — may cause ST changes",
      ],
      results: {
        normal: {
          severity:  "normal",
          findings: [],
          ecgFindings: [
            {
              leads:              ["all"],
              finding:            "Normal sinus rhythm",
              interpretation:     Interpretation.Normal,
              probability:        0.95,
              severity:           [],
              clinicalImportance: ClinicalImportance.High,
            },
          ],
          educationalNotes: "A normal ECG very early after symptom onset does not exclude STEMI. Repeat ECG at 15–30 minutes if suspicion remains.",
        },
        mild: {
          severity:  Severity.Mild,
          findings: [],
          ecgFindings: [
            {
              leads:              ["V1","V2","V3","V4"],
              finding:            "Hyperacute T waves",
              interpretation:     Interpretation.Present,
              probability:        0.60,
              severity:           [Severity.Mild],
              clinicalImportance: ClinicalImportance.Critical,
            },
            {
              leads:              ["V1","V2","V3","V4"],
              finding:            "ST elevation 1–2mm",
              interpretation:     Interpretation.Elevated,
              probability:        0.80,
              severity:           [Severity.Mild],
              clinicalImportance: ClinicalImportance.Critical,
            },
          ],
          educationalNotes: "Early STEMI. ST elevation may be subtle. Hyperacute T waves may precede classical ST elevation.",
        },
        moderate: {
          severity:  Severity.Moderate,
          findings: [],
          ecgFindings: [
            {
              leads:              ["V1","V2","V3","V4"],
              finding:            "ST elevation >2mm with reciprocal changes",
              interpretation:     Interpretation.Critical,
              probability:        0.95,
              severity:           [Severity.Moderate],
              clinicalImportance: ClinicalImportance.Critical,
            },
            {
              leads:              ["II","III","aVF"],
              finding:            "Reciprocal ST depression",
              interpretation:     Interpretation.Reduced,
              probability:        0.80,
              severity:           [Severity.Moderate],
              clinicalImportance: ClinicalImportance.High,
            },
          ],
          educationalNotes: "Classical STEMI pattern. Reciprocal changes confirm the diagnosis. Immediate Cath Lab activation.",
        },
        severe: {
          severity:  Severity.Severe,
          findings: [],
          ecgFindings: [
            {
              leads:              ["V1","V2","V3","V4"],
              finding:            "Marked ST elevation with pathological Q waves",
              interpretation:     Interpretation.Critical,
              probability:        0.90,
              severity:           [Severity.Severe],
              clinicalImportance: ClinicalImportance.Critical,
            },
            {
              leads:              ["all"],
              finding:            "Ventricular arrhythmia",
              interpretation:     Interpretation.Present,
              probability:        0.40,
              severity:           [Severity.Severe],
              clinicalImportance: ClinicalImportance.Critical,
            },
          ],
          educationalNotes: "Extensive infarction with risk of electrical instability. Complete AV block may be present in inferior STEMI.",
        },
      },
      redFlagFindings: [
        "ST elevation in contiguous leads",
        "New ventricular tachycardia or fibrillation",
        "Complete AV block",
        "New left bundle branch block",
      ],
      specialNotes: [
        "Single most important initial investigation in suspected STEMI.",
        "Must be obtained and interpreted within 10 minutes of first medical contact.",
        "Infarct location is stored internally — not shown to student unless ECG is interpreted correctly.",
        "Hospital Engine will render as interactive ECG viewer in future versions.",
      ],
    },

    {
      id:           "troponin_i",
      name:         "Troponin I",
      type:         InvestigationType.Lab,
      priority:     InvestigationPriority.Mandatory,
      timing:       InvestigationTiming.Immediate,
      unlockMethod: UnlockMethod.Always,
      reliability:  Reliability.High,
      probability:  1.0,
      kineticProfile: {
        riseOnset:  { hoursAfterEvent: { min: 3,   max: 6   } },
        peak:       { hoursAfterEvent: { min: 12,  max: 24  } },
        normalises: { hoursAfterEvent: { min: 120, max: 240 } },
        note:       "Values change with Clinical Time. Engine re-evaluates troponin based on clinical hours since symptom onset.",
      },
      falsePositives: [
        "Pulmonary embolism",
        "Myocarditis",
        "Sepsis with myocardial injury",
        "Renal failure",
        "Takotsubo cardiomyopathy",
        "Cardiac contusion",
      ],
      results: {
        normal: {
          severity: "normal",
          findings: [
            { parameter: "Troponin I", range: { min: 0.00, max: 0.04 }, unit: "ng/mL", interpretation: Interpretation.Normal },
            { parameter: "CK-MB",     range: { min: 0.00, max: 5.00 }, unit: "ng/mL", interpretation: Interpretation.Normal },
          ],
          educationalNotes: "Normal troponin within 3 hours of symptom onset does not exclude STEMI. Repeat at 3–6 hours is mandatory if clinical suspicion remains.",
        },
        mild: {
          severity: Severity.Mild,
          findings: [
            { parameter: "Troponin I", range: { min: 0.04, max: 1.0  }, unit: "ng/mL", interpretation: Interpretation.Elevated },
            { parameter: "CK-MB",     range: { min: 5.00, max: 15.0 }, unit: "ng/mL", interpretation: Interpretation.Elevated },
          ],
          educationalNotes: "Mild elevation. Early or small infarct. Serial troponin mandatory. Do not delay PCI for troponin results.",
        },
        moderate: {
          severity: Severity.Moderate,
          findings: [
            { parameter: "Troponin I", range: { min: 1.0,  max: 10.0 }, unit: "ng/mL", interpretation: Interpretation.Elevated },
            { parameter: "CK-MB",     range: { min: 15.0, max: 50.0 }, unit: "ng/mL", interpretation: Interpretation.Elevated },
          ],
          educationalNotes: "Significant myocardial necrosis confirmed. Urgent reperfusion indicated.",
        },
        severe: {
          severity: Severity.Severe,
          findings: [
            { parameter: "Troponin I", range: { min: 10.0, max: 100.0 }, unit: "ng/mL", interpretation: Interpretation.Critical },
            { parameter: "CK-MB",     range: { min: 50.0, max: 500.0 }, unit: "ng/mL", interpretation: Interpretation.Critical },
          ],
          educationalNotes: "Extensive myocardial necrosis. High risk of cardiogenic shock, arrhythmia, and mechanical complications.",
        },
      },
      redFlagFindings: [
        "Troponin >10 ng/mL with hemodynamic instability",
        "Rising troponin with persistent ST elevation",
        "Troponin elevation with new ventricular arrhythmia",
      ],
      serialTestingRule: {
        required: true,
        repeatAt: [
          { hoursAfterFirst: 3, reason: "Confirm rise if first sample drawn within 3 hours of symptom onset" },
          { hoursAfterFirst: 6, reason: "Confirm peak if diagnosis remains uncertain" },
        ],
      },
      specialNotes: [
        "Do not delay primary PCI while awaiting troponin result in ECG-confirmed STEMI.",
        "CK-MB normalises faster than Troponin I — useful for detecting reinfarction.",
        "High-sensitivity troponin assays have lower cutoffs — Kairos uses conventional assay values.",
      ],
    },
  ],

  // ─── Treatments ─────────────────────────────
  // Medicines referenced by ID only.
  // Full definitions live in Medicine Engine.

  treatments: {
    correct: [
      {
        medicineId:      "aspirin",
        priority:        TreatmentPriority.Mandatory,
        timing:          TreatmentTiming.Immediate,
        doseRuleTarget:  "adult",
        correctChoice:   true,
        educationalNotes: [
          "Give immediately regardless of other decisions.",
          "First drug in any ACS protocol.",
        ],
      },
      {
        medicineId:      "clopidogrel",
        priority:        TreatmentPriority.Mandatory,
        timing:          TreatmentTiming.Immediate,
        doseRuleTarget:  "adult",
        correctChoice:   true,
        educationalNotes: [
          "Dual antiplatelet with aspirin is the standard of care.",
          "600mg loading dose before primary PCI.",
        ],
      },
      {
        medicineId:      "heparin_uf",
        priority:        TreatmentPriority.Mandatory,
        timing:          TreatmentTiming.Immediate,
        doseRuleTarget:  "adult",
        correctChoice:   true,
        educationalNotes: [
          "Weight-based IV bolus before and during primary PCI.",
          "Anticoagulation prevents thrombus propagation.",
        ],
      },
      {
        medicineId:      "oxygen",
        priority:        TreatmentPriority.Important,
        timing:          TreatmentTiming.Immediate,
        doseRuleTarget:  "adult",
        condition:       "spo2 < 94",
        correctChoice:   true,
        educationalNotes: [
          "Only indicated if SpO₂ <94%.",
          "Routine oxygen in normoxic STEMI is not recommended.",
        ],
      },
      {
        medicineId:      "morphine",
        priority:        TreatmentPriority.Important,
        timing:          TreatmentTiming.Immediate,
        doseRuleTarget:  "adult",
        condition:       "pain_severe AND sbp > 90",
        correctChoice:   true,
        educationalNotes: [
          "Use cautiously. May delay oral antiplatelet absorption.",
          "Contraindicated if systolic BP <90 mmHg.",
        ],
      },
    ],

    incorrect: [
      {
        id:       "nitrates_hypotension",
        name:     "Nitrates when SBP <90 mmHg",
        reason:   "Nitrates cause vasodilation and will precipitate cardiovascular collapse. Absolutely contraindicated.",
        severity: "critical",
      },
      {
        id:       "echo_before_pci",
        name:     "Delaying PCI for echocardiography",
        reason:   "Every minute of delay causes irreversible myocardial necrosis. Echo must never delay reperfusion.",
        severity: "critical",
      },
      {
        id:       "thrombolysis_when_pci_available",
        name:     "Thrombolysis when PCI available within 120 minutes",
        reason:   "Primary PCI is superior when available within 120 minutes. Thrombolysis should only be used when PCI is unavailable.",
        severity: "high",
      },
      {
        id:       "iv_beta_blocker_acute",
        name:     "IV beta-blocker in acute phase with LV failure",
        reason:   "IV beta-blockers in acute STEMI with heart failure increase mortality. Oral beta-blockers after stabilisation are indicated.",
        severity: "high",
      },
    ],
  },

  // ─── Complications ──────────────────────────
  complications: [
    {
      id:               "vf",
      name:             "Ventricular Fibrillation",
      category:         ComplicationCategory.Electrical,
      onset:            ComplicationOnset.Immediate,
      timing:           { hoursAfterEvent: { min: 0, max: 24 } },
      frequency:        Frequency.Some,
      severityRequired: [Severity.Moderate, Severity.Severe],
      prerequisites:    ["severe_electrical_instability"],
      redFlag:          true,
      educationalNotes: "Most common cause of death in the first hour. Treated with immediate defibrillation. Continuous monitoring mandatory.",
    },
    {
      id:               "cardiogenic_shock",
      name:             "Cardiogenic Shock",
      category:         ComplicationCategory.Mechanical,
      onset:            ComplicationOnset.Early,
      timing:           { hoursAfterEvent: { min: 0, max: 24 } },
      frequency:        Frequency.Some,
      severityRequired: [Severity.Severe],
      prerequisites:    ["ef_below_35", "persistent_hypotension", "large_anterior_infarction"],
      redFlag:          true,
      educationalNotes: "Mortality >50%. Requires urgent revascularisation, inotropic support, and possible mechanical circulatory support.",
    },
    {
      id:               "av_block_complete",
      name:             "Complete AV Block",
      category:         ComplicationCategory.Electrical,
      onset:            ComplicationOnset.Early,
      timing:           { hoursAfterEvent: { min: 1, max: 24 } },
      frequency:        Frequency.Some,
      severityRequired: [Severity.Moderate, Severity.Severe],
      locationDependency: [InfarctLocation.Inferior],
      prerequisites:    ["inferior_stemi"],
      redFlag:          true,
      educationalNotes: "Particularly common in inferior STEMI involving the AV node artery. Often transient. Temporary pacing may be required.",
    },
    {
      id:               "free_wall_rupture",
      name:             "Left Ventricular Free Wall Rupture",
      category:         ComplicationCategory.Mechanical,
      onset:            ComplicationOnset.Subacute,
      timing:           { hoursAfterEvent: { min: 24, max: 120 } },
      frequency:        Frequency.Rare,
      severityRequired: [Severity.Severe],
      prerequisites:    ["large_infarction", "no_reperfusion_or_delayed"],
      redFlag:          true,
      educationalNotes: "Catastrophic. Presents as sudden haemodynamic collapse with tamponade. Surgical emergency.",
    },
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
      educationalNotes: "Pleuritic chest pain, friction rub. Treat with aspirin. Avoid NSAIDs and corticosteroids in early post-MI period.",
    },
  ],

  // ─── Outcome ────────────────────────────────
  outcome: {
    scenarios: [
      {
        type:            OutcomeType.FullRecovery,
        baseProbability: 0.80,
        conditions:      ["pci_within_90min", "dual_antiplatelet_given", "heparin_given"],
      },
      {
        type:            OutcomeType.PartialRecovery,
        baseProbability: 0.15,
        conditions:      ["pci_performed", "incomplete_pharmacotherapy"],
      },
      {
        type:            OutcomeType.Death,
        baseProbability: 0.05,
        conditions:      ["cardiogenic_shock", "no_reperfusion"],
      },
    ],
    modifiers: [
      { factor: "age_over_75",             survivalPenalty: 0.10 },
      { factor: "diabetes",                survivalPenalty: 0.05 },
      { factor: "anterior_stemi",          survivalPenalty: 0.05 },
      { factor: "cardiogenic_shock",       survivalPenalty: 0.40 },
      { factor: "anaemia_hb_under_8",      survivalPenalty: 0.08 },
      { factor: "correct_dual_antiplatelet", survivalBonus: 0.05 },
      { factor: "early_heparin",            survivalBonus: 0.03 },
    ],
    deathIsAllowed: true,
    deathIsCommon:  false,
    deathNote:      "Every death in Kairos must teach something specific. Death is never random or punitive.",
  },

  // ─── Reflection Hooks ───────────────────────
  reflectionHooks: [
    {
      id:         "ecg_10_minutes",
      trigger:    "ecg_not_ordered_within_10_clinical_minutes",
      importance: ClinicalImportance.Critical,
      category:   ScoreCategory.Timing,
      weight:     25,
      message:    "ECG within 10 minutes of first medical contact is a mandatory standard in STEMI management. Every minute of delay increases myocardial damage.",
    },
    {
      id:         "dual_antiplatelet",
      trigger:    "antiplatelet_incomplete",
      importance: ClinicalImportance.High,
      category:   ScoreCategory.TreatmentDecision,
      weight:     20,
      message:    "Dual antiplatelet therapy with aspirin and a P2Y12 inhibitor is the standard of care. Neither drug alone is sufficient.",
    },
    {
      id:         "cath_lab_timing",
      trigger:    "cath_lab_not_activated_early",
      importance: ClinicalImportance.Critical,
      category:   ScoreCategory.Timing,
      weight:     25,
      message:    "Door-to-balloon target is 90 minutes. Every minute of delay causes approximately 1 gram of irreversible myocardial necrosis.",
    },
    {
      id:         "echo_delay",
      trigger:    "echo_ordered_before_pci_activation",
      importance: ClinicalImportance.High,
      category:   ScoreCategory.Safety,
      weight:     15,
      message:    "Echocardiography must never delay reperfusion therapy in confirmed STEMI.",
    },
    {
      id:         "nitrate_contraindication",
      trigger:    "nitrate_given_with_hypotension",
      importance: ClinicalImportance.Critical,
      category:   ScoreCategory.Safety,
      weight:     15,
      message:    "Nitrates are absolutely contraindicated when systolic BP is below 90 mmHg or when right ventricular infarction is suspected.",
    },
  ],

  // ─── Scoring ────────────────────────────────
  scoring: {
    algorithm:   "weighted",
    totalPoints: 100,
    weights: {
      [ScoreCategory.Timing]:              25,
      [ScoreCategory.TreatmentDecision]:   25,
      [ScoreCategory.Safety]:              25,
      [ScoreCategory.DiagnosticReasoning]: 15,
      [ScoreCategory.InvestigationChoice]: 10,
    },
  },
};
