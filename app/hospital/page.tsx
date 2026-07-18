import PrimaryLink from "../../components/kairos/PrimaryLink";

export default function ReceptionPage() {
          return (
              <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
                    <p className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-medium mb-10">
                            Tuesday · Morning Shift · 07:42
                                  </p>

                                        <h1 className="font-[family-name:var(--font-instrument-serif)] text-5xl sm:text-6xl text-slate-900 leading-tight">
                                                Good morning,
                                                        <br />
                                                                <span className="italic text-blue-600">Doctor.</span>
                                                                      </h1>

                                                                            <p className="mt-7 text-slate-500 max-w-xs leading-relaxed">
                                                                                    The ward is quiet.
                                                                                            <br />
                                                                                                    Your first patient is waiting.
                                                                                                          </p>

                                                                                                                <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                                                                                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                                                                                                <span className="text-[11px] text-slate-500 font-medium">
                                                                                                                                          1 patient assigned
                                                                                                                                                  </span>
                                                                                                                                                        </div>

                                                                                                                                                              <PrimaryLink
                                                                                                                                                                      href="/nurse-briefing"
                                                                                                                                                                              className="mt-14 hover:-translate-y-0.5"
                                                                                                                                                                                    >
                                                                                                                                                                                            Proceed to Ward →
                                                                                                                                                                                                  </PrimaryLink>
                                                                                                                                                                                                      </main>
                                                                                                                                                                                                        );
                                                                                                                                                                                                        }