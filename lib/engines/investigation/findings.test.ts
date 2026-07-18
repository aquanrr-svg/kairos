import { describe, it, expect } from "vitest";
import {
  generateFindings,
  generateECGFindings,
  deriveInvestigationSeed,
} from "@/lib/engines/investigation/findings";
import { SeededRNG } from "@/lib/shared/rng";
import type { ECGFinding } from "@/lib/engines/disease/types";
import type { FindingValue } from "@/lib/types/common";
import {
  Interpretation,
  Severity,
  ClinicalImportance,
  InfarctLocation,
} from "@/lib/types/enums";

function ecg(overrides: Partial<ECGFinding> = {}): ECGFinding {
  return {
    leads:              ["II", "III", "aVF"],
    finding:            "ST elevation",
    interpretation:     Interpretation.Elevated,
    probability:        1.0,
    severity:           [Severity.Moderate],
    clinicalImportance: ClinicalImportance.Critical,
    ...overrides,
  };
}

describe("deriveInvestigationSeed", () => {
  it("is deterministic and investigation-specific", () => {
    expect(deriveInvestigationSeed(123, "ecg_12lead")).toBe(deriveInvestigationSeed(123, "ecg_12lead"));
    expect(deriveInvestigationSeed(123, "ecg_12lead")).not.toBe(deriveInvestigationSeed(123, "troponin_i"));
  });

  it("never returns zero", () => {
    // Pick a base seed equal to the hash so the XOR is zero → must coerce to 1.
    const hashOnly = deriveInvestigationSeed(0, "x");
    expect(deriveInvestigationSeed(hashOnly, "x")).not.toBe(0);
  });
});

describe("generateFindings", () => {
  it("returns qualitative findings without sampling", () => {
    const findings: FindingValue[] = [
      { parameter: "Q waves", range: { min: 1, max: 1 }, unit: "none", interpretation: Interpretation.Present },
    ];
    const [f] = generateFindings(findings, [], new SeededRNG(1));
    expect(f.kind).toBe("qualitative");
  });

  it("samples quantitative values and flags abnormality against the normal range", () => {
    const tier: FindingValue[] = [
      { parameter: "Troponin I", range: { min: 10, max: 25 }, unit: "ng/mL", interpretation: Interpretation.Critical },
    ];
    const normal: FindingValue[] = [
      { parameter: "Troponin I", range: { min: 0, max: 0.04 }, unit: "ng/mL", interpretation: Interpretation.Normal },
    ];
    const [f] = generateFindings(tier, normal, new SeededRNG(1));
    expect(f.kind).toBe("quantitative");
    if (f.kind === "quantitative") {
      expect(f.value).toBeGreaterThanOrEqual(10);
      expect(f.value).toBeLessThanOrEqual(25);
      expect(f.isAbnormal).toBe(true);
    }
  });
});

describe("generateECGFindings — location filter", () => {
  it("always includes findings with no location dependency", () => {
    const out = generateECGFindings([ecg({ locationDependency: undefined })], undefined, new SeededRNG(1));
    expect(out).toHaveLength(1);
  });

  it("always includes findings matching the patient's infarct location", () => {
    const out = generateECGFindings(
      [ecg({ locationDependency: [InfarctLocation.Inferior] })],
      InfarctLocation.Inferior,
      new SeededRNG(1),
    );
    expect(out).toHaveLength(1);
  });

  it("includes mismatched-location findings only occasionally (crossover), not never", () => {
    const finding = ecg({ locationDependency: [InfarctLocation.Inferior] });
    let included = 0;
    const N = 400;
    for (let seed = 1; seed <= N; seed++) {
      // Patient location Anterior does not match the finding's Inferior dependency.
      included += generateECGFindings([finding], InfarctLocation.Anterior, new SeededRNG(seed)).length;
    }
    // Documented crossover ~10% — must be neither 0 (old bug) nor everything.
    expect(included).toBeGreaterThan(0);
    expect(included).toBeLessThan(N * 0.4);
  });

  it("still drops findings that fail their own probability gate", () => {
    const out = generateECGFindings([ecg({ probability: 0 })], InfarctLocation.Inferior, new SeededRNG(1));
    expect(out).toHaveLength(0);
  });
});
