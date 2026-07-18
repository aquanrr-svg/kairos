// ─────────────────────────────────────────────
// KAIROS — ScreenShell
//
// Shared page scaffold for the standalone patient
// sub-screens (History, Examination, Investigations,
// Treatment): a back link, serif title and optional
// subtitle wrapped in the standard narrow column.
// ─────────────────────────────────────────────

interface ScreenShellProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}

export default function ScreenShell({
  title,
  subtitle,
  backHref = '/patient',
  backLabel = 'Back to Patient',
  children,
}: ScreenShellProps) {
  return (
    <main className="min-h-screen bg-white flex flex-col px-6 py-10">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1">
        <a
          href={backHref}
          className="text-xs text-slate-400 hover:text-slate-600 mb-8 flex items-center gap-1"
        >
          ← {backLabel}
        </a>

        <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl text-slate-900 mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-slate-400 mb-8 leading-relaxed">{subtitle}</p>
        )}

        {children}
      </div>
    </main>
  );
}
