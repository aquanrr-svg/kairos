import { describe, it, expect } from "vitest";
import { DiseaseRegistry } from "@/lib/data/diseases";
import { getRegisteredTriggers } from "@/lib/engines/scoring/triggers";
import { scoreEncounter } from "@/lib/engines/scoring/evaluate";
import { makeHospitalState, makePatientCase } from "@/lib/test-utils/fixtures";

const stemi = DiseaseRegistry.getById("stemi")!;

describe("active STEMI disease (registry)", () => {
  it("is the modular definition (richer investigation & complication set)", () => {
    // The legacy monolithic stemi.ts shipped only 2 investigations / 5 complications.
    // The canonical modular folder ships the full set.
    expect(stemi.investigations.map(i => i.id)).toContain("echo_2d");
    expect(stemi.investigations.length).toBeGreaterThanOrEqual(5);
    expect(stemi.complications.length).toBeGreaterThanOrEqual(9);
  });

  it("every reflection hook maps to a registered scoring evaluator", () => {
    const registered = getRegisteredTriggers();
    for (const hook of stemi.reflectionHooks) {
      expect(registered.has(hook.trigger), `trigger "${hook.trigger}" is not registered`).toBe(true);
    }
  });

  it("hook weights sum to scoring.totalPoints", () => {
    const sum = stemi.reflectionHooks.reduce((s, h) => s + h.weight, 0);
    expect(sum).toBe(stemi.scoring.totalPoints);
  });

  it("penalises a completely mismanaged encounter (hooks actually fire)", () => {
    // Empty encounter: nothing ordered, nothing administered.
    // Every trigger that represents an omission should fire, so the score
    // must be well below full marks — proving the hooks are wired to evaluators.
    const score = scoreEncounter({
      state:       makeHospitalState(),
      disease:     stemi,
      patientCase: makePatientCase(),
    });
    expect(score.total).toBeLessThan(stemi.scoring.totalPoints);
    expect(score.hookResults.some(r => r.triggered)).toBe(true);
  });
});
