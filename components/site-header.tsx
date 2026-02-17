import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#dddddd] bg-[rgba(242,242,242,0.92)] backdrop-blur">
      <nav
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="text-[#111111]" aria-label="Go to homepage">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#111111] bg-white text-xs font-black tracking-tight sm:h-10 sm:w-10 sm:text-sm">
            <span className="text-[#d41818]">E</span>
            <span className="text-[#1e53ff]">G</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-xs font-bold text-[#1d1d1d] transition hover:bg-white sm:text-sm"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="rounded-md px-3 py-2 text-xs font-bold text-[#1d1d1d] transition hover:bg-white sm:text-sm"
          >
            Blog
          </Link>
        </div>
      </nav>
    </header>
  );
}
