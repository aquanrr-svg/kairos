import { Medicine }             from "../../engines/medicine/types";
import { DataStatus, RouteOfAdministration, GuidelineSource } from "../../types/enums";

export const morphine: Medicine = {
  id:          "morphine",
  version:     "1.0.0",
  lastUpdated: "2025-06-28",
  status:      DataStatus.Production,
  references: [
    {
      source:  GuidelineSource.ESC,
      title:   "2023 ESC Guidelines for the management of acute coronary syndromes",
      year:    2023,
      section: "Analgesia in ACS",
    },
  ],
  genericName:  "Morphine Sulphate",
  brandNames:   ["Morphine"],
  drugClass:    "Opioid analgesic — mu-receptor agonist",
  mechanism:
    "Mu-opioid receptor agonist. Reduces pain and sympathetic activation, " +
    "decreasing myocardial oxygen demand. Causes venodilation reducing preload.",
  indications: [
    "Severe pain in ACS unresponsive to nitrates",
    "Acute cardiogenic pulmonary oedema",
  ],
  contraindications: [
    "Hypotension (systolic BP <90 mmHg)",
    "Respiratory depression or hypoventilation",
    "Concurrent use of MAO inhibitors",
    "Severe obstructive airways disease",
  ],
  doseRules: [
    {
      population: "adult",
      dose: {
        value:      4,
        unit:       "mg",
        titratable: true,
      },
      route:     RouteOfAdministration.IV,
      frequency: "prn_pain",
      notes: [
        "2–4mg IV titrated to pain. Can repeat every 5–10 minutes.",
        "Use with caution — morphine delays absorption of oral P2Y12 inhibitors.",
        "Absolutely contraindicated if systolic BP <90 mmHg.",
      ],
    },
  ],
  interactions: [],
  monitoring: [
    {
      parameter: "Respiratory rate",
      frequency: "Continuous after administration",
      redFlag:   "RR <10/min — withhold next dose, consider naloxone 400mcg IV",
    },
    {
      parameter: "Blood pressure",
      frequency: "Every 5 minutes for 30 minutes after IV administration",
      redFlag:   "Systolic BP <90 mmHg — withhold morphine",
    },
    {
      parameter: "Sedation level",
      frequency: "Continuous",
      redFlag:   "Excessive sedation — reduce dose, ensure airway",
    },
  ],
  sideEffects: [
    "Nausea and vomiting",
    "Respiratory depression",
    "Hypotension and bradycardia",
    "Delayed gastric emptying — clinically relevant for oral antiplatelet absorption",
    "Pruritus",
    "Urinary retention",
  ],
  educationalNotes: [
    "Use for pain relief only if patient is significantly distressed and not hypotensive.",
    "Morphine delays absorption of oral antiplatelets — clinically significant in STEMI.",
    "The CRUSADE and other registry data suggest association with worse outcomes in NSTEMI.",
    "Naloxone 400mcg IV reverses opioid effects — have available at bedside.",
    "Do not use routinely — use only when pain is severe and other measures insufficient.",
  ],
};
