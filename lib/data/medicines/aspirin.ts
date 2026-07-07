import { Medicine }             from "../../engines/medicine/types";
import { DataStatus, RouteOfAdministration, GuidelineSource } from "../../types/enums";

export const aspirin: Medicine = {
  id:          "aspirin",
  version:     "1.0.0",
  lastUpdated: "2025-06-28",
  status:      DataStatus.Production,
  references: [
    {
      source:  GuidelineSource.ESC,
      title:   "2023 ESC Guidelines for the management of acute coronary syndromes",
      year:    2023,
      section: "Antiplatelet therapy",
    },
  ],
  genericName:  "Aspirin",
  brandNames:   ["Disprin", "Ecosprin"],
  drugClass:    "Antiplatelet — COX-1 inhibitor",
  mechanism:
    "Irreversible inhibition of COX-1 enzyme. Reduces thromboxane A2 synthesis " +
    "and inhibits platelet aggregation. Effect persists for platelet lifespan (7–10 days).",
  indications: [
    "Acute coronary syndrome",
    "STEMI and NSTEMI",
    "Stroke prevention",
    "Secondary prevention of cardiovascular events",
  ],
  contraindications: [
    "True aspirin allergy or hypersensitivity",
    "Active significant gastrointestinal bleeding",
    "Severe hepatic failure",
    "Children under 16 (risk of Reye syndrome)",
  ],
  doseRules: [
    {
      population: "adult",
      dose: {
        value:     300,
        unit:      "mg",
        titratable: false,
      },
      route:     RouteOfAdministration.Oral,
      frequency: "stat",
      notes: [
        "Loading dose for ACS. Chewed — not swallowed whole — for faster absorption.",
        "Maintenance dose is 75mg daily thereafter.",
      ],
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
    "Gastrointestinal irritation and bleeding",
    "Increased bleeding risk",
    "Hypersensitivity reactions",
    "Aspirin-exacerbated respiratory disease in susceptible patients",
  ],
  educationalNotes: [
    "First drug given in any ACS. Never withhold unless true allergy is confirmed.",
    "Loading dose 300mg in ACS — maintenance 75mg daily thereafter.",
    "Chewing the tablet accelerates absorption compared to swallowing whole.",
    "Irreversible COX-1 inhibition means a new platelet population must be generated before effect wears off.",
  ],
};
