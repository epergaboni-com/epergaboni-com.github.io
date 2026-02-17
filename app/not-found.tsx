import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="px-4 py-16">
      <section className="mx-auto max-w-2xl rounded-2xl border border-[#dddddd] bg-white p-8 text-center">
        <h1 className="text-3xl font-extrabold">Page Not Found</h1>
        <p className="mt-3 text-lg text-[#3b3b3b]">
          The page you requested does not exist.
        </p>
        <p className="mt-6">
          <Link href="/" className="font-semibold underline decoration-2 underline-offset-4">
            Go back to homepage
          </Link>
        </p>
      </section>
    </main>
  );
}
