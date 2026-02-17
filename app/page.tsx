import type { Metadata } from "next";
import { profileBlogPost } from "../blog/eper-gaboni-profile";
import HeroAvatar from "../components/hero-avatar";

const canonicalPath = "/";
const OG_IMAGE = "/illustrations/og.png";

export const metadata: Metadata = {
  title: "Eper Gaboni - Full-Stack Developer & SEO Specialist",
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
      jobTitle: "Full-Stack Developer & SEO Specialist",
      description: profileBlogPost.description,
      email: profileBlogPost.email,
      url: "https://epergaboni.com/"
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
    <main className="relative overflow-hidden px-4 py-8 sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-[#dde6ff] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-100px] right-[-80px] h-72 w-72 rounded-full bg-[#dfffee] blur-3xl" />

      <article className="mx-auto max-w-6xl text-[#111111]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <header className="reveal-up mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4d4d4d] sm:text-sm">
              Eper Gaboni
            </p>
            <h1 className="mt-5 text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-7xl">
              Full-Stack Developer & SEO Specialist in the Philippines.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#252525] sm:text-lg lg:text-2xl">
              {profileBlogPost.intro}{" "}
              <a
                href={`mailto:${profileBlogPost.email}`}
                className="inline-block rounded-md bg-[#111111] px-3 py-1 font-bold text-white transition hover:bg-[#303030]"
              >
                {profileBlogPost.email}
              </a>
            </p>
          </div>

          <div className="reveal-up mx-auto w-full max-w-[460px]">
            <HeroAvatar />
          </div>
        </header>

        <section className="reveal-up mt-12 grid gap-4 border-y border-[#d8d8d8] py-8 md:grid-cols-3 md:gap-6">
          {introColumns.map((column) => (
            <p key={column} className="text-base leading-relaxed text-[#313131] sm:text-lg">
              {column}
            </p>
          ))}
        </section>

        <section className="reveal-up mt-8 grid grid-cols-2 gap-3 border-b border-[#d8d8d8] pb-8 text-center sm:grid-cols-3 lg:grid-cols-5">
          {companies.map((company) => (
            <div
              key={company}
              className="rounded-lg border border-[#dbdbdb] bg-white/75 px-3 py-3 text-[11px] font-extrabold uppercase tracking-wide text-[#282828] sm:text-xs md:text-sm"
            >
              {company}
            </div>
          ))}
        </section>

        <section className="reveal-up mt-16" aria-labelledby="skills-heading">
          <h2
            id="skills-heading"
            className="inline-block border-b-4 border-[#111111] pb-2 text-3xl font-extrabold sm:text-4xl"
          >
            Skills
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {profileBlogPost.skills.map((skill) => (
              <div
                key={skill.heading}
                className="rounded-2xl border border-[#dfdfdf] bg-white p-6 shadow-[0_8px_25px_rgba(0,0,0,0.04)]"
              >
                <h3 className="text-xl font-extrabold leading-tight sm:text-2xl">
                  {skill.heading}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#2b2b2b] sm:text-lg">
                  {skill.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal-up mt-16" aria-labelledby="experience-summary-heading">
          <h2
            id="experience-summary-heading"
            className="inline-block border-b-4 border-[#111111] pb-2 text-3xl font-extrabold sm:text-4xl"
          >
            Experience Summary
          </h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="relative overflow-hidden rounded-3xl border border-[#d9d9d9] bg-white p-6 shadow-[0_14px_35px_rgba(0,0,0,0.07)] sm:p-8">
              <div className="pointer-events-none absolute right-[-70px] top-[-70px] h-44 w-44 rounded-full bg-[#e9efff]" />
              <div className="pointer-events-none absolute bottom-[-80px] left-[-50px] h-44 w-44 rounded-full bg-[#e6fff2]" />
              <p className="relative text-base leading-relaxed text-[#202020] sm:text-lg lg:text-xl">
                {profileBlogPost.experienceSummary}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {experienceMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-[#d9d9d9] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#666666]">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-lg font-extrabold leading-tight text-[#141414] sm:text-xl">
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
            className="inline-block border-b-4 border-[#111111] pb-2 text-3xl font-extrabold sm:text-4xl"
          >
            Professional Experience
          </h2>
          <div className="mt-8 space-y-4">
            {professionalTimeline.map((experience, index) => (
              <article
                key={experience.id}
                className="relative rounded-2xl border border-[#dddddd] bg-white p-5 pl-8 shadow-[0_8px_24px_rgba(0,0,0,0.05)] sm:p-6 sm:pl-10"
              >
                <span className="absolute left-3 top-8 h-3 w-3 rounded-full bg-[#111111] sm:left-4" />
                {index < professionalTimeline.length - 1 ? (
                  <span className="absolute bottom-[-18px] left-[17px] top-11 w-[2px] bg-[#d5d5d5] sm:left-[20px]" />
                ) : null}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-extrabold leading-tight sm:text-2xl">
                    {experience.company}
                  </h3>
                  {experience.period ? (
                    <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#253a77] sm:text-sm">
                      {experience.period}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-base leading-relaxed text-[#2d2d2d] sm:text-lg">
                  {experience.role}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal-up mt-16" aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="inline-block border-b-4 border-[#111111] pb-2 text-3xl font-extrabold sm:text-4xl"
          >
            FAQs
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {profileBlogPost.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-[#dfdfdf] bg-white p-6 shadow-[0_8px_25px_rgba(0,0,0,0.04)]"
              >
                <h3 className="text-xl font-extrabold leading-tight sm:text-2xl">
                  {faq.question}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#2b2b2b] sm:text-lg">
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
