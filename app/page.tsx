import { before } from "node:test";

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">
              <h1 className="text-5xl font-bold tracking-wide">
                      Kairos
                            </h1>

                                  <p className="mt-4 text-xl text-slate-300 italic">
                                          Free to Kill. Free to Learn.
                                                </p>

                                                      <p className="mt-8 max-w-xl text-center text-slate-400">
                                                              Improve your clinical reasoning through immersive patient
                                                                      simulations. Diagnose, investigate and treat patients in a living
                                                                              hospital where every decision matters.
                                                                                    </p>

                                                                                          <button className="mt-10 rounded-xl bg-blue-600 px-8 py-3 text-lg font-semibold hover:bg-blue-500 transition">
                                                                                                  Start Your Shift
                                                                                                        </button>
                                                                                                            </main>
                                                                                                              );
                                                                                                              }
