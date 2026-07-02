import { Medicine } from "../../engines/medicine/types";
import { DataStatus, RouteOfAdministration } from "../../types/enums";

export const oxygen: Medicine = {
  id:          "oxygen",
  version:     "1.0.0",
  lastUpdated: "2025-06-28",
  status:      DataStatus.Production,
  references: [
    {
      source: "ESC",
      title:  "ESC Guidelines for the management of acute myocardial infarction",
      year:   2023,
    },
  ],
  genericName: "Supplemental Oxygen",
  brandNames:  [],
  drugClass:   "Medical gas",
  mechanism:   "Increases alveolar oxygen partial pressure, improving myocardial oxygen delivery in hypoxic patients.",
  indications: ["Hypoxia with SpO₂ <94% in ACS"],
  contraindications: [
    "Normoxic patients with SpO₂ ≥94% — not indicated, may be harmful",
    "Type 2 respiratory failure — use with caution, target SpO₂ 88–92%",
  ],
  doseRules: [
    {
      population:  "adult",
      dose: { value: 2, unit: "L/min" },
      route:     RouteOfAdministration.NasalCannula,
      frequency: "continuous",
      notes:     [
        "Only if SpO₂ <94%. Titrate to maintain SpO₂ 94–98%.",
        "High-flow mask if SpO₂ remains low on nasal cannula.",
      ],
    },
  ],
  interactions: [],
  monitoring: [
    {
      parameter: "SpO₂",
      frequency: "Continuous",
      target:    "94–98% (88–92% in COPD patients)",
      redFlag:   "SpO₂ <90% despite supplemental oxygen — escalate",
    },
  ],
  sideEffects: [
    "Hyperoxia if over-administered — may worsen outcomes in normoxic ACS patients",
    "Absorption atelectasis with high concentrations",
  ],
  educationalNotes: [
    "Routine oxygen in normoxic STEMI is not recommended and may cause harm.",
    "Only give if SpO₂ is below 94%. This is a common examination trap.",
    "The AVOID trial demonstrated no benefit of routine oxygen in normoxic MI.",
  ],
};
