import { DiseaseRegistry } from "../lib/data/diseases";
import { generatePatientCase } from "../lib/engines/patient";
import { Severity } from "../lib/types/enums";

const disease = DiseaseRegistry.getById("stemi");

if (!disease) {
  throw new Error("STEMI not found.");
  }

  const patient = generatePatientCase(
    disease,
      Severity.Moderate,
        12
        );

        console.log(JSON.stringify(patient, null, 2));