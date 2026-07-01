export default function PatientPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <p className="text-xs tracking-widest text-slate-400 uppercase">
            Examination Room 3 · ICU
          </p>
          <p className="text-sm font-semibold text-slate-900 mt-0.5">
            Ramesh Kumar · 56M
          </p>
        </div>
        <a
          href="/patient/nurse"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-600 text-xs font-semibold hover:bg-amber-100 transition-colors"
        >
          🔔 Call Nurse
        </a>
      </div>

      {/* Patient Scene */}
      <div className="px-6 pt-7 pb-5 border-b border-slate-100">
        <p className="font-[family-name:var(--font-instrument-serif)] text-xl text-slate-700 leading-relaxed">
          Ramesh Kumar lies on the examination bed, visibly distressed.
          Diaphoretic, clutching his chest. His wife stands at the door,
          eyes fixed on you.
          <br /><br />
          He looks up.{" "}
          <span className="italic text-slate-900">
            &ldquo;Doctor, please. It hurts very badly.&rdquo;
          </span>
        </p>
      </div>

      {/* Vitals Monitor */}
      <div className="mx-6 mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs tracking-widest text-slate-400 uppercase mb-4">
          Vitals · Live Monitor
        </p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <p className="text-xl font-bold text-red-500">118</p>
            <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">HR</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-amber-500">94/62</p>
            <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">BP</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-amber-500">93%</p>
            <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">SpO₂</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-emerald-500">37.2°</p>
            <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">Temp</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-red-500">24</p>
            <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">RR</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-amber-500">11</p>
            <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">GCS</p>
          </div>
        </div>

        {/* ECG Strip */}
        <div className="rounded-xl bg-slate-900 p-3">
          <p className="text-xs text-slate-500 mb-2 tracking-widest uppercase">
            ECG · Lead II
          </p>
          <svg
            viewBox="0 0 300 40"
            className="w-full h-8"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="#34d399"
              strokeWidth="1.5"
              points="0,20 25,20 32,20 37,4 42,36 47,20 72,20 79,20 84,4 89,36 94,20 119,20 126,20 131,4 136,36 141,20 166,20 173,20 178,4 183,36 188,20 213,20 220,20 225,4 230,36 235,20 260,20 267,20 272,4 277,36 282,20 300,20"
            />
          </svg>
        </div>
      </div>

      {/* Action Cards */}
      <div className="px-6 mt-6 mb-8">
        <p className="text-xs tracking-widest text-slate-400 uppercase mb-4">
          What do you do?
        </p>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="/patient/history"
            className="flex flex-col p-4 rounded-2xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all group"
          >
            <span className="text-2xl mb-3">💬</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
              Take History
            </span>
            <span className="text-xs text-slate-400 mt-1 leading-relaxed">
              Ask the patient questions
            </span>
          </a>

          <a
            href="/patient/examination"
            className="flex flex-col p-4 rounded-2xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all group"
          >
            <span className="text-2xl mb-3">🩺</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
              Examine
            </span>
            <span className="text-xs text-slate-400 mt-1 leading-relaxed">
              Physical examination
            </span>
          </a>

          <a
            href="/patient/investigations"
            className="flex flex-col p-4 rounded-2xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all group"
          >
            <span className="text-2xl mb-3">🔬</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
              Investigations
            </span>
            <span className="text-xs text-slate-400 mt-1 leading-relaxed">
              Order tests and labs
            </span>
          </a>

          <a
            href="/patient/treatment"
            className="flex flex-col p-4 rounded-2xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all group"
          >
            <span className="text-2xl mb-3">💊</span>
            <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
              Treatment
            </span>
            <span className="text-xs text-slate-400 mt-1 leading-relaxed">
              Prescribe and manage
            </span>
          </a>
        </div>
      </div>

    </main>
  );
}
