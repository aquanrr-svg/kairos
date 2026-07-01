"use client";
import { useState } from "react";

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
  const [asked, setAsked] = useState<string[]>([]);

  function toggle(id: string) {
    setAsked((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  }

  return (
    <main className="min-h-screen bg-white flex flex-col px-6 py-10">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1">

        <a href="/patient" className="text-xs text-slate-400 hover:text-slate-600 mb-8 flex items-center gap-1">
          ← Back to Patient
        </a>

        <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl text-slate-900 mb-2">
          History Taking
        </h1>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          Ramesh looks at you, slightly breathless. Ask what matters most.
        </p>

        <div className="flex flex-col gap-3 mb-10">
          {questions.map((q) => (
            <div key={q.id}>
              <button
                onClick={() => toggle(q.id)}
                className={`w-full text-left px-4 py-4 rounded-2xl border text-sm font-medium transition-all ${
                  asked.includes(q.id)
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {q.question}
              </button>
              {asked.includes(q.id) && (
                <div className="mt-2 mx-2 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;{q.answer}&rdquo;
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
