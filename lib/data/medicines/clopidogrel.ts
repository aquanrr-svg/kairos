import { Medicine }             from "../../engines/medicine/types";
import { DataStatus, RouteOfAdministration, GuidelineSource } from "../../types/enums";

export const clopidogrel: Medicine = {
  id:          "clopidogrel",
  version:     "1.0.0",
  lastUpdated: "2025-06-28",
  status:      DataStatus.Production,
  references: [
    {
      source:  GuidelineSource.ESC,
      title:   "2023 ESC Guidelines for the management of acute coronary syndromes",
      year:    2023,
      section: "Antiplatelet therapy, P2Y12 inhibitors",
    },
  ],
  genericName:  "Clopidogrel",
  brandNames:   ["Plavix", "Clopilet"],
  drugClass:    "Antiplatelet — P2Y12 receptor antagonist",
  mechanism:
    "Irreversible blockade of ADP-mediated P2Y12 platelet receptor. " +
    "Prevents platelet aggregation independent of the COX pathway. " +
    "Prodrug requiring hepatic CYP2C19 activation.",
  indications: [
    "Acute coronary syndrome",
    "STEMI and NSTEMI pre-PCI",
    "Post-PCI antiplatelet therapy",
    "Stroke and TIA prevention",
  ],
  contraindications: [
    "Active pathological bleeding",
    "Severe hepatic impairment",
    "Hypersensitivity to clopidogrel",
  ],
  doseRules: [
    {
      population: "adult",
      dose: {
        value:     600,
        unit:      "mg",
        titratable: false,
      },
      route:     RouteOfAdministration.Oral,
      frequency: "stat_loading",
      notes: [
        "600mg loading dose before primary PCI.",
        "Provides faster and greater platelet inhibition than 300mg loading dose.",
        "Maintenance 75mg once daily thereafter.",
      ],
    },
  ],
  interactions: [],
  monitoring: [
    {
      parameter: "Bleeding signs",
      frequency: "Continuous",
      redFlag:   "Active bleeding — do not discontinue without cardiology input",
    },
    {
      parameter: "CYP2C19 genotype (if available)",
      frequency: "Once",
      redFlag:   "Poor metabolisers have reduced drug efficacy — consider ticagrelor",
    },
  ],
  sideEffects: [
    "Increased bleeding risk",
    "Gastrointestinal upset",
    "Thrombotic thrombocytopenic purpura (rare)",
    "Variable efficacy in CYP2C19 poor metabolisers",
    "Hypersensitivity reactions",
  ],
  educationalNotes: [
    "Used as dual antiplatelet therapy alongside aspirin in ACS.",
    "600mg loading dose preferred over 300mg before primary PCI for faster onset.",
    "Never discontinue within 12 months of drug-eluting stent without cardiology advice.",
    "CYP2C19 poor metabolisers may benefit from ticagrelor or prasugrel instead.",
  ],
};
