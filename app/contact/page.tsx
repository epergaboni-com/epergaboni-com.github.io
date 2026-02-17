import type { Metadata } from "next";

const OG_IMAGE = "/illustrations/og.png";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Eper Gaboni for web design, development, and SEO support.",
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact | Eper Gaboni",
    description: "Contact Eper Gaboni for web design, development, and SEO support.",
    images: [{ url: OG_IMAGE }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Eper Gaboni",
    description: "Contact Eper Gaboni for web design, development, and SEO support.",
    images: [OG_IMAGE]
  }
};

export default function ContactPage() {
  return (
    <main className="px-4 py-10 sm:px-8 sm:py-14">
      <section className="mx-auto max-w-3xl rounded-2xl border border-[#dddddd] bg-white p-6 shadow-[0_8px_25px_rgba(0,0,0,0.04)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#666666] sm:text-sm">
          Contact
        </p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
          Let&apos;s work together
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#2d2d2d] sm:text-lg">
          For web design, full-stack development, technical SEO, or performance work, email me
          directly and include your project goals.
        </p>
        <a
          href="mailto:hi@epergaboni.com"
          className="mt-6 inline-block rounded-md bg-[#111111] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2c2c2c] sm:text-base"
        >
          hi@epergaboni.com
        </a>
      </section>
    </main>
  );
}
