import { Medicine }             from "../../engines/medicine/types";
import { DataStatus, RouteOfAdministration, GuidelineSource } from "../../types/enums";

export const heparin: Medicine = {
  id:          "heparin_uf",
  version:     "1.0.0",
  lastUpdated: "2025-06-28",
  status:      DataStatus.Production,
  references: [
    {
      source:  GuidelineSource.ESC,
      title:   "2023 ESC Guidelines for the management of acute coronary syndromes",
      year:    2023,
      section: "Anticoagulation therapy, primary PCI",
    },
  ],
  genericName:  "Unfractionated Heparin",
  brandNames:   ["Heparin Sodium"],
  drugClass:    "Anticoagulant — indirect thrombin inhibitor",
  mechanism:
    "Potentiates antithrombin III activity, inhibiting thrombin (factor IIa) " +
    "and factor Xa. Prevents thrombus propagation without dissolving existing clot.",
  indications: [
    "STEMI — adjunct anticoagulation during primary PCI",
    "ACS anticoagulation",
    "DVT and PE treatment",
    "Prevention of thrombus propagation",
  ],
  contraindications: [
    "Active major bleeding",
    "Heparin-induced thrombocytopenia (HIT)",
    "Severe thrombocytopenia",
    "Hypersensitivity to heparin or pork products",
  ],
  doseRules: [
    {
      population: "adult",
      dose: {
        value:       60,
        unit:        "units/kg",
        maxValue:    4000,
        weightBased: true,
      },
      route:     RouteOfAdministration.IVBolus,
      frequency: "stat",
      notes: [
        "60 units/kg IV bolus before primary PCI. Maximum 4000 units.",
        "Additional boluses may be required during PCI under cath lab guidance.",
        "Weight-based dosing is mandatory — never give a flat dose.",
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
      redFlag:   "Platelet count fall >50% — suspect HIT immediately",
    },
    {
      parameter: "Active bleeding",
      frequency: "Continuous clinical monitoring",
      redFlag:   "Active bleeding — hold heparin, consider protamine reversal",
    },
  ],
  sideEffects: [
    "Bleeding (major and minor)",
    "Heparin-induced thrombocytopenia (HIT) — immune-mediated, life-threatening",
    "Osteoporosis with long-term use",
    "Hyperkalaemia via aldosterone suppression",
    "Hypersensitivity reactions",
  ],
  educationalNotes: [
    "Weight-based dosing is essential. Maximum 4000 units for PCI bolus.",
    "HIT is a life-threatening immune reaction — monitor platelets on all patients.",
    "Protamine sulphate reverses heparin effect: 1mg per 100 units heparin given.",
    "HIT causes paradoxical thrombosis — do not give platelet transfusions.",
  ],
};
