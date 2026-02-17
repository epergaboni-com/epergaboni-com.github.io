import Link from "next/link";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-[var(--line-strong)] bg-[linear-gradient(135deg,rgba(74,74,74,0.09)_0%,rgba(140,140,140,0.09)_42%,rgba(200,155,43,0.08)_100%)]">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[var(--theme-green)] bg-white text-xs font-black tracking-tight shadow-[0_8px_16px_rgba(0,0,0,0.14)] sm:h-9 sm:w-9 sm:text-sm"
              aria-hidden="true"
            >
              <span className="text-[#e33e2b]">E</span>
              <span className="text-[var(--theme-green)]">G</span>
            </span>
            <p className="text-xs font-semibold tracking-wide text-[var(--theme-green-deep)] sm:text-sm">
              Built for speed, SEO, and scalable growth.
            </p>
          </div>
          <p className="mt-3 text-xs text-[#666666] sm:text-sm">
            © {currentYear} Eper Gaboni. Made with care in the Philippines.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-2" aria-label="Footer">
          <Link
            href="/"
            className="rounded-md border border-[var(--line)] bg-white px-3 py-2 text-xs font-semibold text-[var(--theme-green-deep)] transition hover:border-[rgba(120,120,120,0.45)] hover:bg-[rgba(120,120,120,0.16)] sm:text-sm"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-[var(--line)] bg-white px-3 py-2 text-xs font-semibold text-[var(--theme-green-deep)] transition hover:border-[rgba(120,120,120,0.45)] hover:bg-[rgba(120,120,120,0.16)] sm:text-sm"
          >
            Blog
          </Link>
          <a
            href="mailto:hi@epergaboni.com"
            className="theme-btn-primary rounded-md px-3 py-2 text-xs font-semibold transition sm:text-sm"
          >
            hi@epergaboni.com
          </a>
        </nav>
      </div>
    </footer>
  );
}
