export default function LandingPage() {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 mb-8">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                                  <span className="text-[10px] tracking-[0.2em] text-blue-600 uppercase font-medium">
                                            Virtual Teaching Hospital
                                                    </span>
                                                          </div>

                                                                <h1 className="font-[family-name:var(--font-instrument-serif)] text-7xl sm:text-8xl text-slate-900 leading-none">
                                                                        Kai<span className="italic text-blue-600">ros.</span>
                                                                              </h1>

                                                                                    <p className="mt-8 text-slate-500 max-w-xs leading-relaxed">
                                                                                            Practice the decisions that define doctors. Real cases, real consequences.
                                                                                                  </p>

                                                                                                        <p className="mt-3 text-[11px] tracking-[0.25em] text-slate-900 uppercase font-semibold">
                                                                                                                Free to Kill. Free to Learn.
                                                                                                                      </p>

                                                                                                                            <a
                                                                                                                                    href="/reception"
                                                                                                                                            className="mt-12 px-10 py-4 rounded-2xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all hover:-translate-y-0.5 shadow-lg shadow-slate-900/20"
                                                                                                                                                  >
                                                                                                                                                          Enter Hospital →
                                                                                                                                                                </a>

                                                                                                                                                                      <button className="mt-3 text-sm text-slate-400 hover:text-slate-600 transition-colors">
                                                                                                                                                                              Browse Cases
                                                                                                                                                                                    </button>
                                                                                                                                                                                        </main>
                                                                                                                                                                                          );
                                                                                                                                                                                          }