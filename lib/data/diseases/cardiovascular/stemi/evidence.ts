import { Disease } from "../../../../engines/disease/types";
import { GuidelineSource } from "../../../../types/enums";

export const references: Disease["references"] = [
  {
    source:  GuidelineSource.ESC,
    title:
      "2023 ESC Guidelines for the Management of Acute Coronary Syndromes",
    year:    2023,
    url:
      "https://academic.oup.com/eurheartj/article/44/38/3720/7243210",
    section:
      "Primary PCI, Antithrombotic Therapy, Reperfusion Strategy, Oxygen Therapy",
  },
  {
    source:  GuidelineSource.AHA,
    title:
      "2013 ACCF/AHA Guideline for the Management of ST-Elevation Myocardial Infarction",
    year:    2013,
    url:
      "https://www.ahajournals.org/doi/10.1161/CIR.0b013e3182742cf6",
    section:
      "Reperfusion, Antiplatelet Therapy, Door-to-Balloon Time, Antithrombotic Therapy",
  },
  {
    source:  "Circulation",
    title:
      "Oxygen Therapy in Suspected Acute Myocardial Infarction — The AVOID Trial",
    year:    2015,
    url:
      "https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.114.014494",
    section:
      "Supplemental oxygen in normoxic STEMI — evidence against routine use",
  },
  {
    source:  "JAMA",
    title:
      "Door-to-Balloon Time and Mortality Among Patients Undergoing Primary PCI",
    year:    2006,
    url:
      "https://jamanetwork.com/journals/jama/fullarticle/203347",
    section:
      "30-minute reduction in door-to-balloon time reduces one-year mortality by 7.5%",
  },
  {
    source:  "Lancet",
    title:
      "COMMIT/CCS-2 — Early Intravenous then Oral Metoprolol in 45,852 Patients with Acute Myocardial Infarction",
    year:    2005,
    url:
      "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(05)67338-2/fulltext",
    section:
      "IV beta-blocker in acute phase with LV failure increases mortality — supports incorrect choice classification",
  },
];
