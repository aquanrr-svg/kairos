import { Medicine } from "../../engines/medicine/types";
import { DataStatus, RouteOfAdministration } from "../../types/enums";

export const aspirin: Medicine = {
  id:          "aspirin",
  version:     "1.0.0",
  lastUpdated: "2025-06-28",
  status:      DataStatus.Production,
  references: [
    {
      source:  "ESC",
      title:   "ESC Guidelines for the management of acute myocardial infarction in patients presenting with ST-segment elevation",
      year:    2023,
    },
  ],
  genericName: "Aspirin",
  brandNames:  ["Disprin", "Ecosprin"],
  drugClass:   "Antiplatelet — COX-1 inhibitor",
  mechanism:   "Irreversible inhibition of COX-1 enzyme. Reduces thromboxane A2 synthesis, inhibiting platelet aggregation.",
  indications: ["ACS", "STEMI", "NSTEMI", "Stroke prevention", "Antiplatelet therapy"],
  contraindications: [
    "True aspirin allergy or hypersensitivity",
    "Active significant gastrointestinal bleeding",
    "Severe hepatic failure",
  ],
  doseRules: [
    {
      population: "adult",
      dose: { value: 300, unit: "mg" },
      route:     RouteOfAdministration.Oral,
      frequency: "stat",
      notes:     ["Loading dose for ACS. Chewed, not swallowed whole, for faster absorption."],
    },
  ],
  interactions: [],
  monitoring: [
    {
      parameter: "Bleeding signs",
      frequency: "Continuous",
      redFlag:   "Active bleeding — reassess antiplatelet therapy",
    },
  ],
  sideEffects: [
    "Gastrointestinal irritation",
    "Increased bleeding risk",
    "Hypersensitivity reactions",
    "Aspirin-exacerbated respiratory disease in susceptible patients",
  ],
  educationalNotes: [
    "First drug given in any ACS presentation. Never withhold unless true allergy is confirmed.",
    "Loading dose 300mg in ACS — maintenance 75mg daily thereafter.",
    "Chewing the tablet accelerates absorption compared to swallowing whole.",
  ],
};
