import { Medicine }             from "../../engines/medicine/types";
import { DataStatus, RouteOfAdministration, GuidelineSource } from "../../types/enums";

export const oxygen: Medicine = {
  id:          "oxygen",
  version:     "1.0.0",
  lastUpdated: "2025-06-28",
  status:      DataStatus.Production,
  references: [
    {
      source:  GuidelineSource.ESC,
      title:   "2023 ESC Guidelines for the management of acute coronary syndromes",
      year:    2023,
      section: "Oxygen therapy in ACS",
    },
    {
      source:  "Circulation",
      title:   "AVOID Trial — Oxygen Therapy in Suspected Acute Myocardial Infarction",
      year:    2015,
      section: "Supplemental oxygen in normoxic STEMI",
    },
  ],
  genericName:  "Supplemental Oxygen",
  brandNames:   [],
  drugClass:    "Medical gas",
  mechanism:
    "Increases alveolar oxygen partial pressure, improving myocardial oxygen " +
    "delivery in hypoxic patients. In normoxic patients, excess oxygen may cause " +
    "coronary vasoconstriction and increased infarct size.",
  indications: [
    "Hypoxia with SpO2 <94% in ACS",
    "Cardiogenic shock with respiratory compromise",
    "Type 1 respiratory failure",
  ],
  contraindications: [
    "Normoxic patients with SpO2 ≥94% — not indicated, may cause harm",
    "Type 2 respiratory failure without monitoring — use with caution, target SpO2 88–92%",
  ],
  doseRules: [
    {
      population: "adult",
      dose: {
        value:     2,
        unit:      "L/min",
        condition: "spo2 < 94",
      },
      route:     RouteOfAdministration.NasalCannula,
      frequency: "continuous",
      notes: [
        "Only if SpO2 <94%. Titrate to maintain SpO2 94–98%.",
        "High-flow mask if SpO2 remains low on nasal cannula.",
        "Reduce or discontinue once SpO2 ≥94% on room air.",
      ],
    },
  ],
  interactions: [],
  monitoring: [
    {
      parameter: "SpO2",
      frequency: "Continuous pulse oximetry",
      target:    "94–98% (88–92% in COPD/type 2 failure patients)",
      redFlag:   "SpO2 <90% despite supplemental oxygen — escalate urgently",
    },
  ],
  sideEffects: [
    "Hyperoxia in normoxic patients — may increase infarct size and worsen outcomes",
    "Absorption atelectasis at high concentrations",
    "Retinopathy of prematurity in neonates (not applicable in ACS context)",
  ],
  educationalNotes: [
    "Routine oxygen in normoxic STEMI is NOT recommended and may cause harm.",
    "Only administer if SpO2 is below 94%. This is a common examination trap.",
    "The AVOID trial (Circulation 2015) demonstrated no benefit and possible harm from routine oxygen in normoxic MI.",
    "Coronary vasoconstriction from hyperoxia is the proposed mechanism of harm.",
  ],
};
