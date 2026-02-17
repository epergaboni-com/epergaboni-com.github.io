import type { Metadata } from "next";
import { profileBlogPost } from "../blog/eper-gaboni-profile";
import HeroAvatar from "../components/hero-avatar";

const canonicalPath = "/";
const OG_IMAGE = "/illustrations/og.png";

export const metadata: Metadata = {
  title: "Eper Gaboni - Full-Stack Web Developer & SEO Specialist",
  description: profileBlogPost.description,
  alternates: {
    canonical: canonicalPath
  },
  openGraph: {
    type: "profile",
    url: canonicalPath,
    title: profileBlogPost.title,
    description: profileBlogPost.description,
    images: [{ url: OG_IMAGE }]
  },
  twitter: {
    card: "summary_large_image",
    title: profileBlogPost.title,
    description: profileBlogPost.description,
    images: [OG_IMAGE]
  }
};

export default function HomePage() {
  const introColumns = [
    "With over 20 years of experience in SEO, web design, and full-stack development, I've worked with startups, corporations, and global clients.",
    "From building custom websites and managing servers to implementing technical SEO strategies, I focus on delivering solutions that are fast, mobile-optimized, and SEO-friendly.",
    "What sets my work apart is not just visual design - but measurable results: higher search engine rankings, lower bounce rates, faster load times, and scalable solutions that grow with your business."
  ];

  const companies = profileBlogPost.professionalExperience.map(
    (experience) => experience.split(" - ")[0]
  );

  const experienceMetrics = [
    { label: "Years in Practice", value: "20+" },
    { label: "Core Disciplines", value: "SEO + Dev + Design" },
    { label: "Engagements", value: "Startup to Enterprise" }
  ];

  const professionalTimeline = profileBlogPost.professionalExperience.map((experience, index) => {
    const [company, rawDetails = ""] = experience.split(" - ");
    const yearMatch = rawDetails.match(/\(([^)]+)\)\s*$/);
    const period = yearMatch?.[1] ?? "";
    const role = rawDetails.replace(/\s*\([^)]+\)\s*$/, "").trim();

    return {
      id: `${company}-${index}`,
      company,
      role,
      period
    };
  });

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profileBlogPost.author,
      jobTitle: "Full-Stack Web Developer & SEO Specialist",
      description: profileBlogPost.description,
      email: profileBlogPost.email,
      url: "https://www.epergaboni.com/"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: profileBlogPost.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    }
  ];

  return (
    <main className="theme-shell relative overflow-hidden px-4 py-8 sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-[#ececec] blur-3xl" />
      <div className="pointer-events-none absolute right-[22%] top-[-90px] h-64 w-64 rounded-full bg-[#ffeeb6] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-100px] right-[-80px] h-72 w-72 rounded-full bg-[#e4e4e4] blur-3xl" />

      <article className="mx-auto max-w-6xl text-[var(--text)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <header className="reveal-up mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--theme-green-deep)] sm:text-sm">
              Eper Gaboni
            </p>
            <h1 className="mt-5 text-3xl font-black leading-[1.08] tracking-tight text-[var(--theme-green-deep)] sm:text-5xl lg:text-7xl">
              Full-Stack Web Developer & SEO Specialist in the Philippines.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#3f3f3f] sm:text-lg lg:text-2xl">
              {profileBlogPost.intro}{" "}
              <a
                href={`mailto:${profileBlogPost.email}`}
                className="theme-btn-primary inline-block rounded-md px-3 py-1 font-bold transition"
              >
                {profileBlogPost.email}
              </a>
            </p>
          </div>

          <div className="reveal-up mx-auto w-full max-w-[520px]">
            <HeroAvatar />
          </div>
        </header>

        <section className="reveal-up theme-section mt-12 grid gap-4 rounded-2xl px-5 py-8 md:grid-cols-3 md:gap-6 md:px-6">
          {introColumns.map((column) => (
            <p key={column} className="text-base leading-relaxed text-[#444444] sm:text-lg">
              {column}
            </p>
          ))}
        </section>

        <section className="reveal-up mt-8 grid grid-cols-2 gap-3 border-b border-[var(--line)] pb-8 text-center sm:grid-cols-3 lg:grid-cols-5">
          {companies.map((company) => (
            <div
              key={company}
              className="theme-chip rounded-lg px-3 py-3 text-[11px] font-extrabold uppercase tracking-wide sm:text-xs md:text-sm"
            >
              {company}
            </div>
          ))}
        </section>

        <section className="reveal-up mt-16" aria-labelledby="skills-heading">
          <h2
            id="skills-heading"
            className="theme-heading text-3xl font-extrabold sm:text-4xl"
          >
            Skills
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {profileBlogPost.skills.map((skill) => (
              <div
                key={skill.heading}
                className="theme-card-soft rounded-2xl p-6"
              >
                <h3 className="text-xl font-extrabold leading-tight text-[var(--theme-green-deep)] sm:text-2xl">
                  {skill.heading}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#444444] sm:text-lg">
                  {skill.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal-up mt-16" aria-labelledby="experience-summary-heading">
          <h2
            id="experience-summary-heading"
            className="theme-heading text-3xl font-extrabold sm:text-4xl"
          >
            Experience Summary
          </h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="theme-section relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="pointer-events-none absolute right-[-70px] top-[-70px] h-44 w-44 rounded-full bg-[#ececec]" />
              <div className="pointer-events-none absolute bottom-[-80px] left-[-50px] h-44 w-44 rounded-full bg-[#e4e4e4]" />
              <p className="relative text-base leading-relaxed text-[#3f3f3f] sm:text-lg lg:text-xl">
                {profileBlogPost.experienceSummary}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {experienceMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="theme-card rounded-2xl p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#707070]">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-lg font-extrabold leading-tight text-[var(--theme-green)] sm:text-xl">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal-up mt-16" aria-labelledby="professional-experience-heading">
          <h2
            id="professional-experience-heading"
            className="theme-heading text-3xl font-extrabold sm:text-4xl"
          >
            Professional Experience
          </h2>
          <div className="mt-8 space-y-4">
            {professionalTimeline.map((experience, index) => (
              <article
                key={experience.id}
                className="theme-card relative rounded-2xl p-5 pl-8 sm:p-6 sm:pl-10"
              >
                <span className="absolute left-3 top-8 h-3 w-3 rounded-full bg-[var(--theme-green)] sm:left-4" />
                {index < professionalTimeline.length - 1 ? (
                  <span className="absolute bottom-[-18px] left-[17px] top-11 w-[2px] bg-[rgba(120,120,120,0.8)] sm:left-[20px]" />
                ) : null}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-extrabold leading-tight text-[var(--theme-green-deep)] sm:text-2xl">
                    {experience.company}
                  </h3>
                  {experience.period ? (
                    <span className="theme-btn-secondary rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide sm:text-sm">
                      {experience.period}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-base leading-relaxed text-[#444444] sm:text-lg">
                  {experience.role}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal-up mt-16" aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="theme-heading text-3xl font-extrabold sm:text-4xl"
          >
            FAQs
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {profileBlogPost.faqs.map((faq) => (
              <div
                key={faq.question}
                className="theme-card-soft rounded-2xl p-6"
              >
                <h3 className="text-xl font-extrabold leading-tight text-[var(--theme-green-deep)] sm:text-2xl">
                  {faq.question}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#444444] sm:text-lg">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

      </article>
    </main>
  );
}
