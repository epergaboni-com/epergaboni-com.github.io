import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line-strong)] bg-[rgba(250,250,250,0.92)] backdrop-blur">
      <nav
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="text-[var(--text)]" aria-label="Go to homepage">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[var(--theme-green)] bg-[var(--surface)] text-xs font-black tracking-tight shadow-[0_8px_16px_rgba(0,0,0,0.14)] sm:h-10 sm:w-10 sm:text-sm">
            <span className="text-[#e33e2b]">E</span>
            <span className="text-[var(--theme-green)]">G</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-md border border-transparent px-3 py-2 text-xs font-bold text-[var(--theme-green-deep)] transition hover:border-[rgba(120,120,120,0.45)] hover:bg-[rgba(120,120,120,0.16)] sm:text-sm"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-transparent px-3 py-2 text-xs font-bold text-[var(--theme-green-deep)] transition hover:border-[rgba(120,120,120,0.45)] hover:bg-[rgba(120,120,120,0.16)] sm:text-sm"
          >
            Blog
          </Link>
        </div>
      </nav>
    </header>
  );
}
