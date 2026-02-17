import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPagination from "../../../../components/blog-pagination";
import { getBlogTotalPages, getPaginatedBlogPosts } from "../../../../lib/blog";

interface BlogPaginationPageProps {
  params: {
    page: string;
  };
}

export function generateStaticParams() {
  const totalPages = getBlogTotalPages();

  return Array.from({ length: totalPages - 1 }, (_, index) => ({
    page: String(index + 2)
  }));
}

export function generateMetadata({ params }: BlogPaginationPageProps): Metadata {
  const pageNumber = Number(params.page);
  const totalPages = getBlogTotalPages();

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    return {
      title: "Blog"
    };
  }

  const canonicalPath = `/blog/page/${pageNumber}`;

  return {
    title: `Blog - Page ${pageNumber}`,
    description: `Page ${pageNumber} of the Eper Gaboni blog archive.`,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      title: `Blog - Page ${pageNumber} | Eper Gaboni`,
      description: `Page ${pageNumber} of the Eper Gaboni blog archive.`
    },
    twitter: {
      card: "summary_large_image",
      title: `Blog - Page ${pageNumber} | Eper Gaboni`,
      description: `Page ${pageNumber} of the Eper Gaboni blog archive.`
    }
  };
}

export default function BlogPaginationPage({ params }: BlogPaginationPageProps) {
  const pageNumber = Number(params.page);
  const totalPages = getBlogTotalPages();

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > totalPages) {
    notFound();
  }

  const { posts, currentPage } = getPaginatedBlogPosts(pageNumber);

  return (
    <main className="px-4 py-10 sm:py-14">
      <section className="mx-auto max-w-6xl">
        <header className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#585858] sm:text-sm">
            Eper Gaboni
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Blog
          </h1>
          <p className="mt-4 max-w-3xl text-base text-[#2f2f2f] sm:text-lg lg:text-xl">
            Page {currentPage} of {totalPages}.
          </p>
        </header>

        <BlogPagination posts={posts} currentPage={currentPage} totalPages={totalPages} />
      </section>
    </main>
  );
}
