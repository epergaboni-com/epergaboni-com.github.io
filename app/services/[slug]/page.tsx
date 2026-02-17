import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ServiceContent {
  title: string;
  summary: string;
  bullets: string[];
}

const serviceMap: Record<string, ServiceContent> = {
  "web-design": {
    title: "Web Design",
    summary:
      "Design systems and interfaces focused on clarity, usability, and conversion outcomes.",
    bullets: [
      "UX-focused wireframes and page structure",
      "Conversion-oriented layout and visual hierarchy",
      "Responsive UI patterns for mobile and desktop"
    ]
  },
  "web-development": {
    title: "Web Development",
    summary:
      "Performance-first implementation for marketing websites, landing pages, and service funnels.",
    bullets: [
      "Next.js and modern frontend implementation",
      "Technical SEO and structured metadata integration",
      "Scalable content architecture and component systems"
    ]
  },
  seo: {
    title: "SEO",
    summary:
      "Technical and on-page SEO execution to improve rankings, crawl quality, and qualified organic leads.",
    bullets: [
      "SEO audits, issue prioritization, and implementation",
      "Site speed and Core Web Vitals improvements",
      "Content and internal linking frameworks for growth"
    ]
  }
};

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(serviceMap).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = serviceMap[params.slug];
  if (!service) {
    return { title: "Service Not Found" };
  }

  const canonicalPath = `/services/${params.slug}`;
  return {
    title: service.title,
    description: service.summary,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      title: `${service.title} | Eper Gaboni`,
      description: service.summary
    },
    twitter: {
      card: "summary",
      title: `${service.title} | Eper Gaboni`,
      description: service.summary
    }
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = serviceMap[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <main className="px-4 py-10 sm:px-8 sm:py-14">
      <section className="mx-auto max-w-3xl rounded-2xl border border-[#dddddd] bg-white p-6 shadow-[0_8px_25px_rgba(0,0,0,0.04)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#666666] sm:text-sm">
          Service
        </p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{service.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-[#2d2d2d] sm:text-lg">{service.summary}</p>
        <ul className="mt-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-[#2d2d2d] sm:text-lg">
          {service.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
