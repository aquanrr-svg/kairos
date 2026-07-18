import PrimaryLink from '../../../components/kairos/PrimaryLink';

export default function NurseBriefingPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col px-6 py-14">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg">
            👩‍⚕️
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900">Sister Priya</p>
            <p className="text-xs text-slate-400 tracking-wide uppercase">Ward Nurse · ICU</p>
          </div>
        </div>
        <p className="font-[family-name:var(--font-instrument-serif)] text-2xl sm:text-3xl text-slate-800 leading-relaxed text-left">
          Good morning, Doctor.
          <br /><br />
          We have just admitted a{" "}
          <span className="italic text-blue-600">fifty-six-year-old male.</span>
          <br /><br />
          Severe chest pain. Diaphoretic. His BP dropped again in the last ten minutes.
          <br /><br />
          He is in Examination Room 3. His wife is outside. She looks frightened.
        </p>
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
          <p className="text-xs tracking-widest text-slate-400 uppercase font-medium mb-3">
            Patient · Admitted 06:15
          </p>
          <p className="text-base font-semibold text-slate-900 mb-1">Ramesh Kumar</p>
          <p className="text-xs text-slate-400 mb-4">56Y · Male · No known allergies on record</p>
          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-200">
            <div className="text-center">
              <p className="text-sm font-bold text-red-500">118</p>
              <p className="text-xs text-slate-400 uppercase tracking-wide">HR</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-amber-500">94/62</p>
              <p className="text-xs text-slate-400 uppercase tracking-wide">BP</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-amber-500">93%</p>
              <p className="text-xs text-slate-400 uppercase tracking-wide">SpO2</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-emerald-500">37.2</p>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Temp</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-md mx-auto w-full">
        <PrimaryLink href="/patient" className="block text-center hover:-translate-y-0.5">
          Accept Shift →
        </PrimaryLink>
        <p className="mt-3 text-center text-xs text-slate-400 italic">
          There is no going back once you accept.
        </p>
      </div>
    </main>
  );
}
