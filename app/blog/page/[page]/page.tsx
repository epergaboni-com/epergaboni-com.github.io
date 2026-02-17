import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogPagination from "../../../../components/blog-pagination";
import {
  BLOGS_PER_PAGE,
  getBlogTotalPages,
  getPaginatedBlogPosts
} from "../../../../lib/blog";

const OG_IMAGE = "/illustrations/og.png";

interface BlogPaginationPageProps {
  params: {
    page: string;
  };
  searchParams?: {
    tag?: string | string[];
  };
}

function parseTagValue(tagValue?: string | string[]): string | undefined {
  const rawTag = Array.isArray(tagValue) ? tagValue[0] : tagValue;
  const cleaned = rawTag?.trim();
  return cleaned ? cleaned : undefined;
}

export function generateStaticParams() {
  const totalPages = getBlogTotalPages();

  return Array.from({ length: totalPages - 1 }, (_, index) => ({
    page: String(index + 2)
  }));
}

export function generateMetadata({ params, searchParams }: BlogPaginationPageProps): Metadata {
  const pageNumber = Number(params.page);
  const activeTag = parseTagValue(searchParams?.tag);
  const totalPages = getBlogTotalPages(BLOGS_PER_PAGE, activeTag);

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    return {
      title: "Blog"
    };
  }

  const canonicalPath = activeTag
    ? `/blog/page/${pageNumber}?tag=${encodeURIComponent(activeTag)}`
    : `/blog/page/${pageNumber}`;
  const descriptionText = activeTag
    ? `Page ${pageNumber} of the Eper Gaboni blog archive for tag "${activeTag}".`
    : `Page ${pageNumber} of the Eper Gaboni blog archive.`;

  return {
    title: `Blog - Page ${pageNumber}`,
    description: descriptionText,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      title: `Blog - Page ${pageNumber} | Eper Gaboni`,
      description: descriptionText,
      images: [{ url: OG_IMAGE }]
    },
    twitter: {
      card: "summary_large_image",
      title: `Blog - Page ${pageNumber} | Eper Gaboni`,
      description: descriptionText,
      images: [OG_IMAGE]
    }
  };
}

export default function BlogPaginationPage({ params, searchParams }: BlogPaginationPageProps) {
  const pageNumber = Number(params.page);
  const activeTag = parseTagValue(searchParams?.tag);
  const totalPages = getBlogTotalPages(BLOGS_PER_PAGE, activeTag);

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound();
  }

  const { posts, currentPage } = getPaginatedBlogPosts(
    pageNumber,
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
              ? `Tag "${activeTag}" • Page ${currentPage} of ${totalPages}.`
              : `Page ${currentPage} of ${totalPages}.`}
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
