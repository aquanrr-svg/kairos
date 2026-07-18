// ─────────────────────────────────────────────
// KAIROS — Cardiovascular Disease Category Registry
//
// Single entry point for all cardiovascular diseases.
// The DiseaseRegistry imports from here.
// Engines never import individual disease folders.
//
// To add a cardiovascular disease:
//   1. Create lib/data/diseases/cardiovascular/<name>/
//   2. Add one export line below.
//   That is all.
// ─────────────────────────────────────────────

export { stemi } from "./stemi/index";
