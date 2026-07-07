// ─────────────────────────────────────────────
// KAIROS — Medicine Data Index
//
// Single export point for all medicine data.
// Neither engines nor other data layers import
// individual medicine files directly.
// All medicine access goes through MedicineRegistry.
//
// To add a medicine:
//   1. Create lib/data/medicines/<name>.ts
//   2. Add one export line here.
//   3. Add to the medicines array in registry.ts.
// ─────────────────────────────────────────────

export { aspirin }     from "./aspirin";
export { clopidogrel } from "./clopidogrel";
export { heparin }     from "./heparin";
export { morphine }    from "./morphine";
export { oxygen }      from "./oxygen";
