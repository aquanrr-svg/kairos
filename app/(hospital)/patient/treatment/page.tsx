"use client";
import { useState } from "react";
import ScreenShell from "../../../../components/kairos/ScreenShell";
import PrimaryLink from "../../../../components/kairos/PrimaryLink";
import { useToggleSet } from "../../../../lib/shared/useToggleSet";

const diagnoses = [
  "Acute ST-Elevation Myocardial Infarction (STEMI)",
  "Unstable Angina / NSTEMI",
  "Aortic Dissection",
  "Pulmonary Embolism",
];

const treatments = [
  { id: "asp", drug: "Aspirin 325mg", detail: "Stat oral — antiplatelet" },
  { id: "clop", drug: "Clopidogrel 600mg", detail: "Loading dose — dual antiplatelet" },
  { id: "morph", drug: "Morphine 2-4mg IV", detail: "Pain relief — titrate to effect" },
  { id: "o2", drug: "O₂ via mask", detail: "Target SpO₂ >94%" },
  { id: "cath", drug: "Activate Cath Lab", detail: "Primary PCI within 90 min" },
  { id: "hep", drug: "Heparin IV", detail: "Anticoagulation — weight based" },
];

export default function TreatmentPage() {
  const [diagnosis, setDiagnosis] = useState<string>("");
  const { items: selected, toggle: toggleTreatment, has } = useToggleSet();

  const canSubmit = diagnosis !== "" && selected.length > 0;

  return (
    <ScreenShell
      title="Diagnosis & Treatment"
      subtitle="Based on your assessment. The call is yours."
    >
      {/* Diagnosis */}
      <p className="text-xs tracking-widest text-slate-400 uppercase mb-3">
        Working Diagnosis
      </p>
      <div className="flex flex-col gap-2 mb-8">
        {diagnoses.map((d) => (
            <button
              key={d}
              onClick={() => setDiagnosis(d)}
              className={`w-full text-left px-4 py-3.5 rounded-2xl border text-sm transition-all flex items-center gap-3 ${
                diagnosis === d
                  ? "border-blue-300 bg-blue-50 text-blue-800 font-semibold"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <span className={`h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                diagnosis === d ? "border-blue-500 bg-blue-500" : "border-slate-300"
              }`}>
                {diagnosis === d && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>
              {d}
            </button>
          ))}
        </div>

        {/* Treatment */}
        <p className="text-xs tracking-widest text-slate-400 uppercase mb-3">
          Treatment Orders
        </p>
        <div className="flex flex-col gap-2 mb-10">
          {treatments.map((t) => (
            <button
              key={t.id}
              onClick={() => toggleTreatment(t.id)}
              className={`w-full text-left px-4 py-3.5 rounded-2xl border text-sm transition-all flex items-center gap-3 ${
                has(t.id)
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className={`h-5 w-5 rounded-lg border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                has(t.id)
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-slate-300 text-transparent"
              }`}>
                ✓
              </span>
              <div>
                <p className={`font-semibold ${has(t.id) ? "text-emerald-800" : "text-slate-800"}`}>
                  {t.drug}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{t.detail}</p>
              </div>
            </button>
          ))}
        </div>

      <PrimaryLink href="/outcome" disabled={!canSubmit} className="block text-center">
        Submit Treatment Plan →
      </PrimaryLink>

      {!canSubmit && (
        <p className="text-center text-xs text-slate-400 mt-3 italic">
          Select a diagnosis and at least one treatment to continue.
        </p>
      )}
    </ScreenShell>
  );
}
