import Link from "next/link";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-[#d7d7d7] bg-[rgba(255,255,255,0.65)]">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#111111] bg-white text-xs font-black tracking-tight sm:h-9 sm:w-9 sm:text-sm"
              aria-hidden="true"
            >
              <span className="text-[#d41818]">E</span>
              <span className="text-[#1e53ff]">G</span>
            </span>
            <p className="text-xs font-semibold tracking-wide text-[#2b2b2b] sm:text-sm">
              Built for speed, SEO, and scalable growth.
            </p>
          </div>
          <p className="mt-3 text-xs text-[#525252] sm:text-sm">
            © {currentYear} Eper Gaboni. Made with care in the Philippines.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-2" aria-label="Footer">
          <Link
            href="/"
            className="rounded-md border border-[#d2d2d2] bg-white px-3 py-2 text-xs font-semibold text-[#222222] transition hover:bg-[#f7f7f7] sm:text-sm"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-[#d2d2d2] bg-white px-3 py-2 text-xs font-semibold text-[#222222] transition hover:bg-[#f7f7f7] sm:text-sm"
          >
            Blog
          </Link>
          <a
            href="mailto:hi@epergaboni.com"
            className="rounded-md bg-[#111111] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#303030] sm:text-sm"
          >
            hi@epergaboni.com
          </a>
        </nav>
      </div>
    </footer>
  );
}
