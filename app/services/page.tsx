import type { Metadata } from "next";
import Link from "next/link";

const OG_IMAGE = "/illustrations/og.png";

export const metadata: Metadata = {
  title: "Services",
  description: "Web design, web development, and SEO services by Eper Gaboni.",
  alternates: {
    canonical: "/services"
  },
  openGraph: {
    type: "website",
    url: "/services",
    title: "Services | Eper Gaboni",
    description: "Web design, web development, and SEO services by Eper Gaboni.",
    images: [{ url: OG_IMAGE }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Eper Gaboni",
    description: "Web design, web development, and SEO services by Eper Gaboni.",
    images: [OG_IMAGE]
  }
};

const services = [
  { slug: "web-design", title: "Web Design" },
  { slug: "web-development", title: "Web Development" },
  { slug: "seo", title: "SEO" }
];

export default function ServicesPage() {
  return (
    <main className="px-4 py-10 sm:px-8 sm:py-14">
      <section className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#666666] sm:text-sm">
          Services
        </p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">What I can help with</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-xl border border-[#dddddd] bg-white p-5 text-base font-semibold shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
            >
              {service.title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
