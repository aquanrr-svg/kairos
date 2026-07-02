import { Disease } from "../../../../engines/disease/types";
import { InfarctLocation } from "../../../../types/enums";

export const vitalSigns: Disease["vitalSigns"] = [
  {
    parameter:    "Heart Rate",
    unit:         "bpm",
    normal:       { range: { min: 60,  max: 100 } },
    mild:         { range: { min: 60,  max: 100 } },
    moderate:     { range: { min: 90,  max: 120 } },
    severe:       { range: { min: 110, max: 150 } },
    exceptions: [
      {
        condition:          "inferior_wall_stemi_with_vagal_tone",
        range:              { min: 40, max: 60 },
        locationDependency: [InfarctLocation.Inferior],
        note: "Bradycardia in inferior STEMI due to AV node involvement and increased vagal tone.",
      },
    ],
    redFlagBelow: 40,
    redFlagAbove: 150,
    specialNotes: [
      "Tachycardia suggests larger infarction, pain, heart failure, or impending shock.",
      "Bradycardia in inferior STEMI is common and may require temporary pacing.",
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
      "May remain normal if no pulmonary oedema is present.",
      "Supplemental oxygen only indicated if SpO₂ falls below 94%.",
      "Routine oxygen in normoxic STEMI is not recommended and may cause harm.",
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
      "Respiratory distress with SpO₂ <90% requires urgent escalation.",
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
      "Low-grade fever within 24–48 hours is a normal post-infarction inflammatory response.",
      "Temperature >38.5°C should prompt evaluation for concurrent infection.",
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
      "Any GCS below 15 requires urgent neurological and haemodynamic assessment.",
    ],
  },
];
