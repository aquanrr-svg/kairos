import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-instrument-serif)] text-xl text-slate-900"
        >
          Kai<em className="italic text-blue-600">ros</em>
        </Link>
        <Link
          href="/reception"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          Enter Hospital →
        </Link>
      </div>
    </nav>
  );
}
