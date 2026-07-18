"use client";
import ScreenShell from "../../../../components/kairos/ScreenShell";
import PrimaryLink from "../../../../components/kairos/PrimaryLink";
import { useToggleSet } from "../../../../lib/shared/useToggleSet";

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
  const { toggle, has } = useToggleSet();

  return (
    <ScreenShell
      title="Physical Examination"
      subtitle="Examine each system. Tap to reveal findings."
    >
      <div className="flex flex-col gap-3 mb-10">
        {findings.map((f) => (
          <div key={f.id}>
            <button
              onClick={() => toggle(f.id)}
              className={`w-full text-left px-4 py-4 rounded-2xl border text-sm font-medium transition-all flex justify-between items-center ${
                has(f.id)
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <span>{f.system}</span>
              <span className="text-xs">{has(f.id) ? "▲" : "▼"}</span>
            </button>
            {has(f.id) && (
              <div className="mt-2 mx-2 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 leading-relaxed">
                {f.finding}
              </div>
            )}
          </div>
        ))}
      </div>

      <PrimaryLink href="/patient" className="block text-center">
        Return to Patient →
      </PrimaryLink>
    </ScreenShell>
  );
}
