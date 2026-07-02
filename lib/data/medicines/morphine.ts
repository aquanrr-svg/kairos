import { Medicine } from "../../engines/medicine/types";
import { DataStatus, RouteOfAdministration } from "../../types/enums";

export const morphine: Medicine = {
  id:          "morphine",
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
  genericName: "Morphine Sulphate",
  brandNames:  ["Morphine"],
  drugClass:   "Opioid analgesic",
  mechanism:   "Mu-opioid receptor agonist. Reduces pain and sympathetic activation, decreasing myocardial oxygen demand.",
  indications: ["Severe pain in ACS", "Acute pulmonary oedema"],
  contraindications: [
    "Hypotension (systolic BP <90 mmHg)",
    "Respiratory depression",
    "Concurrent use of MAOIs",
  ],
  doseRules: [
    {
      population:  "adult",
      dose: {
        value:      4,
        unit:       "mg",
        titratable: true,
      },
      route:     RouteOfAdministration.IV,
      frequency: "prn_pain",
      notes:     [
        "2–4mg IV titrated to pain. Can repeat every 5–10 minutes as needed.",
        "Use with caution — evidence suggests morphine may delay absorption of oral P2Y12 inhibitors.",
      ],
    },
  ],
  interactions: [],
  monitoring: [
    {
      parameter: "Respiratory rate",
      frequency: "Continuous after administration",
      redFlag:   "RR <10/min — withhold next dose, consider naloxone",
    },
    {
      parameter: "Blood pressure",
      frequency: "Continuous",
      redFlag:   "Systolic BP <90 mmHg — withhold morphine",
    },
  ],
  sideEffects: [
    "Nausea and vomiting",
    "Respiratory depression",
    "Hypotension",
    "Delayed gastric emptying — may delay oral drug absorption",
    "Pruritus",
  ],
  educationalNotes: [
    "Use for pain relief only if patient is significantly distressed and not hypotensive.",
    "Morphine delays absorption of oral antiplatelets — clinically relevant in STEMI.",
    "Some studies suggest association with worse outcomes — use judiciously, not routinely.",
  ],
};
