import type { Metadata } from "next";
import Link from "next/link";
import BlogPagination from "../../components/blog-pagination";
import { BLOGS_PER_PAGE, getPaginatedBlogPosts } from "../../lib/blog";

const canonicalPath = "/blog";
const OG_IMAGE = "/illustrations/og.png";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Web design, development, SEO, and conversion strategy articles from Eper Gaboni.",
  alternates: {
    canonical: canonicalPath
  },
  openGraph: {
    type: "website",
    url: canonicalPath,
    title: "Blog | Eper Gaboni",
    description:
      "Web design, development, SEO, and conversion strategy articles from Eper Gaboni.",
    images: [{ url: OG_IMAGE }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Eper Gaboni",
    description:
      "Web design, development, SEO, and conversion strategy articles from Eper Gaboni.",
    images: [OG_IMAGE]
  }
};

interface BlogIndexPageProps {
  searchParams?: {
    tag?: string | string[];
  };
}

function parseTagValue(tagValue?: string | string[]): string | undefined {
  const rawTag = Array.isArray(tagValue) ? tagValue[0] : tagValue;
  const cleaned = rawTag?.trim();
  return cleaned ? cleaned : undefined;
}

export default function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const activeTag = parseTagValue(searchParams?.tag);
  const { posts, currentPage, totalPages } = getPaginatedBlogPosts(
    1,
    BLOGS_PER_PAGE,
    activeTag
  );

  return (
    <main className="theme-shell px-4 py-10 sm:py-14">
      <section className="mx-auto max-w-6xl">
        <header className="theme-section mb-12 rounded-2xl px-5 py-6 sm:px-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--theme-green-deep)] sm:text-sm">
            Articles
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[var(--theme-green-deep)] sm:text-4xl lg:text-5xl">
            Blog
          </h1>
          <p className="mt-4 max-w-3xl text-base text-[#444444] sm:text-lg lg:text-xl">
            {activeTag
              ? `Showing posts tagged "${activeTag}".`
              : "Covering SEO, web design, development, and conversion optimization."}
          </p>
          {activeTag ? (
            <p className="mt-3">
              <Link
                href="/blog"
                className="text-sm font-semibold text-[var(--theme-green-deep)] underline decoration-2 underline-offset-4"
              >
                Clear tag filter
              </Link>
            </p>
          ) : null}
        </header>

        {posts.length === 0 ? (
          <p className="theme-card rounded-xl p-5 text-base text-[#444444]">
            No posts found for this tag.
          </p>
        ) : (
          <BlogPagination
            posts={posts}
            currentPage={currentPage}
            totalPages={totalPages}
            activeTag={activeTag}
          />
        )}
      </section>
    </main>
  );
}
