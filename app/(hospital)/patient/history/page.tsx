"use client";
import ScreenShell from "../../../../components/kairos/ScreenShell";
import PrimaryLink from "../../../../components/kairos/PrimaryLink";
import { useToggleSet } from "../../../../lib/shared/useToggleSet";

const questions = [
  {
    id: "q1",
    question: "Where is the pain and does it go anywhere?",
    answer: "Here, in the centre of my chest. It goes to my left arm. Like someone is sitting on my chest.",
  },
  {
    id: "q2",
    question: "How long has the pain been there?",
    answer: "Started around 5 in the morning. Two hours ago. I thought it was gas so I waited. Then I could not breathe.",
  },
  {
    id: "q3",
    question: "Any diabetes, blood pressure or heart problems?",
    answer: "Yes, BP since 10 years. I take amlodipine. No sugar. My father had heart attack at 60.",
  },
  {
    id: "q4",
    question: "Any sweating, vomiting or dizziness?",
    answer: "Yes sweating a lot since morning. Vomited once. Very dizzy when I try to stand.",
  },
  {
    id: "q5",
    question: "Do you smoke? Any previous episodes like this?",
    answer: "I smoked for 20 years. Stopped 2 years back. Never had chest pain like this before.",
  },
];

export default function HistoryPage() {
  const { toggle, has } = useToggleSet();

  return (
    <ScreenShell
      title="History Taking"
      subtitle="Ramesh looks at you, slightly breathless. Ask what matters most."
    >
      <div className="flex flex-col gap-3 mb-10">
        {questions.map((q) => (
          <div key={q.id}>
            <button
              onClick={() => toggle(q.id)}
              className={`w-full text-left px-4 py-4 rounded-2xl border text-sm font-medium transition-all ${
                has(q.id)
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              {q.question}
            </button>
            {has(q.id) && (
              <div className="mt-2 mx-2 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 italic leading-relaxed">
                &ldquo;{q.answer}&rdquo;
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
