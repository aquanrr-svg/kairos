"use client";
import { useState } from "react";

const findings = [
  {
    id: "gen",
    system: "General",
    finding: "Patient is conscious but restless. Diaphoretic. Pallor present. Unable to lie flat comfortably.",
  },
  {
    id: "cvs",
    system: "Cardiovascular",
    finding: "Heart rate 118 bpm, irregular. BP 94/62 mmHg. JVP raised. S3 gallop heard. No murmurs.",
  },
  {
    id: "resp",
    system: "Respiratory",
    finding: "RR 24/min. SpO₂ 93% on room air. Bilateral basal crepitations on auscultation.",
  },
  {
    id: "abd",
    system: "Abdomen",
    finding: "Soft, non-tender. No organomegaly. Bowel sounds present.",
  },
  {
    id: "neuro",
    system: "Neurological",
    finding: "GCS 11/15. Pupils equal and reactive. No focal neurological deficit.",
  },
];

export default function ExaminationPage() {
  const [examined, setExamined] = useState<string[]>([]);

  function toggle(id: string) {
    setExamined((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col px-6 py-10">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1">

        <a href="/patient" className="text-xs text-slate-400 hover:text-slate-600 mb-8 flex items-center gap-1">
          ← Back to Patient
        </a>

        <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl text-slate-900 mb-2">
          Physical Examination
        </h1>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          Examine each system. Tap to reveal findings.
        </p>

        <div className="flex flex-col gap-3 mb-10">
          {findings.map((f) => (
            <div key={f.id}>
              <button
                onClick={() => toggle(f.id)}
                className={`w-full text-left px-4 py-4 rounded-2xl border text-sm font-medium transition-all flex justify-between items-center ${
                  examined.includes(f.id)
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <span>{f.system}</span>
                <span className="text-xs">
                  {examined.includes(f.id) ? "▲" : "▼"}
                </span>
              </button>
              {examined.includes(f.id) && (
                <div className="mt-2 mx-2 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 leading-relaxed">
                  {f.finding}
                </div>
              )}
            </div>
          ))}
        </div>

        <a
          href="/patient"
          className="block text-center px-10 py-4 rounded-2xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
        >
          Return to Patient →
        </a>
      </div>
    </main>
  );
}
