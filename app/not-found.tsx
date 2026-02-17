import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="theme-shell px-4 py-16">
      <section className="theme-section mx-auto max-w-2xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-[var(--theme-green-deep)]">Page Not Found</h1>
        <p className="mt-3 text-lg text-[#454545]">
          The page you requested does not exist.
        </p>
        <p className="mt-6">
          <Link
            href="/"
            className="font-semibold text-[var(--theme-green)] underline decoration-2 underline-offset-4"
          >
            Go back to homepage
          </Link>
        </p>
      </section>
    </main>
  );
}
