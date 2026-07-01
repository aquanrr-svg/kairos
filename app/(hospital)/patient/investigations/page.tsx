"use client";
import { useState } from "react";

const tests = [
  {
    id: "ecg",
    name: "12-Lead ECG",
    desc: "Electrical activity of heart",
    results: [
      { label: "Rhythm", value: "Sinus Tachycardia", color: "amber" },
      { label: "ST Elevation", value: "V1–V4 (+3mm)", color: "red" },
      { label: "Q Waves", value: "Developing", color: "amber" },
      { label: "Interpretation", value: "Anterior STEMI", color: "red" },
    ],
  },
  {
    id: "trop",
    name: "Troponin I",
    desc: "Cardiac biomarker",
    results: [
      { label: "Troponin I", value: "4.8 ng/mL", color: "red", ref: "<0.04" },
      { label: "CK-MB", value: "68 U/L", color: "red", ref: "<25" },
    ],
  },
  {
    id: "cbc",
    name: "CBC + RFT + LFT",
    desc: "Complete blood work",
    results: [
      { label: "Haemoglobin", value: "13.2 g/dL", color: "green" },
      { label: "WBC", value: "11,400", color: "amber", ref: "4–11k" },
      { label: "Creatinine", value: "1.1 mg/dL", color: "green" },
      { label: "Platelets", value: "2.1 L", color: "green" },
    ],
  },
  {
    id: "cxr",
    name: "Chest X-Ray",
    desc: "Cardiopulmonary assessment",
    results: [
      { label: "Heart Size", value: "Mildly enlarged", color: "amber" },
      { label: "Lung Fields", value: "Pulmonary oedema", color: "red" },
      { label: "Pleural Effusion", value: "None", color: "green" },
    ],
  },
];

const colorMap: Record<string, string> = {
  red: "text-red-500",
  amber: "text-amber-500",
  green: "text-emerald-500",
};

export default function InvestigationsPage() {
  const [ordered, setOrdered] = useState<string[]>([]);

  function toggle(id: string) {
    setOrdered((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col px-6 py-10">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1">

        <a href="/patient" className="text-xs text-slate-400 hover:text-slate-600 mb-8 flex items-center gap-1">
          ← Back to Patient
        </a>

        <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl text-slate-900 mb-2">
          Investigations
        </h1>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          Order what you need. Every unnecessary test costs time.
        </p>

        <div className="flex flex-col gap-3 mb-10">
          {tests.map((t) => (
            <div key={t.id}>
              <button
                onClick={() => toggle(t.id)}
                className={`w-full text-left px-4 py-4 rounded-2xl border transition-all flex justify-between items-center ${
                  ordered.includes(t.id)
                    ? "border-blue-200 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div>
                  <p className={`text-sm font-semibold ${ordered.includes(t.id) ? "text-blue-700" : "text-slate-800"}`}>
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.desc}</p>
                </div>
                <span className={`text-xs font-bold ${ordered.includes(t.id) ? "text-blue-600" : "text-slate-300"}`}>
                  {ordered.includes(t.id) ? "✓" : "○"}
                </span>
              </button>

              {ordered.includes(t.id) && (
                <div className="mt-2 mx-2 rounded-xl border border-slate-100 bg-slate-50 divide-y divide-slate-100">
                  {t.results.map((r, i) => (
                    <div key={i} className="flex justify-between items-center px-4 py-2.5">
                      <span className="text-xs text-slate-500">{r.label}</span>
                      <div className="text-right">
                        <span className={`text-xs font-bold ${colorMap[r.color]}`}>
                          {r.value}
                        </span>
                        {r.ref && (
                          <span className="text-xs text-slate-300 ml-1.5">
                            ref: {r.ref}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <a
          href="/patient/treatment"
          className="block text-center px-10 py-4 rounded-2xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
        >
          Proceed to Treatment →
        </a>
      </div>
    </main>
  );
}
