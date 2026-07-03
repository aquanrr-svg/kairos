// ─────────────────────────────────────────────
// KAIROS — Disease Registry
//
// The single authoritative source of all diseases
// in the Kairos platform.
//
// Rules:
//   - Engines never import individual disease files.
//   - All disease access goes through DiseaseRegistry.
//   - The internal data structure is an implementation
//     detail. The public API is stable.
//
// To add any disease:
//   1. Add it to the relevant category index.
//   2. Import it in the category block below.
//   3. Add it to the diseases array.
//   Three steps. Nothing else changes.
// ─────────────────────────────────────────────

import { Disease } from "../../engines/disease/types";
import { DataStatus } from "../../types/enums";

// ─── Category Imports ─────────────────────────
// One import per category index.
// Never import individual disease folders here.

import { stemi } from "./cardiovascular";

// ─── Source of Truth ──────────────────────────
// All diseases in Kairos. Order does not matter.
// This array is the only place diseases are registered.

const diseases: readonly Disease[] = [
  stemi,
];

// ─── Internal Indexes ─────────────────────────
// Built once at module load time.
// Never rebuilt. Never mutated.
// O(1) lookup by id. O(1) lookup by category.

const byId = new Map<string, Disease>(
  diseases.map(d => [d.id, d])
);

const byCategory = new Map<string, Disease[]>();
for (const disease of diseases) {
  const bucket = byCategory.get(disease.category) ?? [];
  byCategory.set(disease.category, [...bucket, disease]);
}

// ─── Registry API ─────────────────────────────
// Stable public surface. Engines depend on this.
// Internal implementation may change freely.

export const DiseaseRegistry = {

  // All registered diseases.
  getAll(): readonly Disease[] {
    return diseases;
  },

  // Find by ID. Returns undefined if not found.
  // O(1).
  getById(id: string): Disease | undefined {
    return byId.get(id);
  },

  // All diseases in a category.
  // Returns empty array if category is unknown.
  getByCategory(category: string): readonly Disease[] {
    return byCategory.get(category) ?? [];
  },

  // All diseases with a given lifecycle status.
  // Useful for filtering Draft diseases out of
  // production case generation.
  getByStatus(status: DataStatus): readonly Disease[] {
    return diseases.filter(d => d.status === status);
  },

  // True if a disease with this ID is registered.
  has(id: string): boolean {
    return byId.has(id);
  },

  // Total count of registered diseases.
  count(): number {
    return diseases.length;
  },

  // All registered disease IDs.
  // Used by cross-reference validators.
  getIds(): ReadonlySet<string> {
    return new Set(byId.keys());
  },

} as const;
