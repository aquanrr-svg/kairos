import { Medicine } from "../../engines/medicine/types";
import { DataStatus, RouteOfAdministration } from "../../types/enums";

export const heparin: Medicine = {
  id:          "heparin_uf",
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
  genericName: "Unfractionated Heparin",
  brandNames:  ["Heparin Sodium"],
  drugClass:   "Anticoagulant — indirect thrombin inhibitor",
  mechanism:   "Potentiates antithrombin III activity, inhibiting thrombin (factor IIa) and factor Xa. Prevents thrombus propagation.",
  indications: ["STEMI — adjunct to primary PCI", "ACS anticoagulation", "DVT/PE treatment"],
  contraindications: [
    "Active major bleeding",
    "Heparin-induced thrombocytopenia (HIT)",
    "Severe thrombocytopenia",
    "Hypersensitivity to heparin",
  ],
  doseRules: [
    {
      population:  "adult",
      dose: {
        value:       60,
        unit:        "units/kg",
        maxValue:    4000,
        weightBased: true,
      },
      route:     RouteOfAdministration.IVBolus,
      frequency: "stat",
      notes:     [
        "60 units/kg IV bolus, maximum 4000 units, given before primary PCI.",
        "Additional boluses may be required during procedure under cath lab guidance.",
      ],
    },
  ],
  interactions: [],
  monitoring: [
    {
      parameter: "aPTT",
      frequency: "Every 6 hours on infusion",
      target:    "60–100 seconds (1.5–2.5× control)",
      redFlag:   "aPTT >120 seconds — reduce infusion rate",
    },
    {
      parameter: "Platelet count",
      frequency: "Day 4–14 of treatment",
      redFlag:   "Platelet count fall >50% — suspect HIT",
    },
    {
      parameter: "Active bleeding",
      frequency: "Continuous clinical monitoring",
      redFlag:   "Active bleeding — hold heparin, assess reversal with protamine",
    },
  ],
  sideEffects: [
    "Bleeding",
    "Heparin-induced thrombocytopenia (HIT)",
    "Osteoporosis with long-term use",
    "Hyperkalaemia",
    "Hypersensitivity",
  ],
  educationalNotes: [
    "Weight-based dosing is essential. Never give a flat dose.",
    "HIT is a life-threatening immune reaction — monitor platelets in all patients.",
    "Protamine sulphate reverses heparin effect in emergencies.",
  ],
};
