// ─────────────────────────────────────────────
// KAIROS — PrimaryLink
//
// Shared primary call-to-action anchor. Centralises the
// dark pill button styling repeated across the hospital
// flow, including the disabled ("cannot continue") state.
// ─────────────────────────────────────────────

interface PrimaryLinkProps {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export default function PrimaryLink({
  href,
  children,
  disabled = false,
  className = '',
}: PrimaryLinkProps) {
  const base = 'px-10 py-4 rounded-2xl text-sm font-semibold transition-all';
  const state = disabled
    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20';

  return (
    <a
      href={disabled ? '#' : href}
      aria-disabled={disabled || undefined}
      className={`${base} ${state} ${className}`.trim()}
    >
      {children}
    </a>
  );
}
