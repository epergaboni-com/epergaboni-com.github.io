import type { Metadata } from "next";
import BlogPagination from "../../components/blog-pagination";
import { getPaginatedBlogPosts } from "../../lib/blog";

const canonicalPath = "/blog";

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
      "Web design, development, SEO, and conversion strategy articles from Eper Gaboni."
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Eper Gaboni",
    description:
      "Web design, development, SEO, and conversion strategy articles from Eper Gaboni."
  }
};

export default function BlogIndexPage() {
  const { posts, currentPage, totalPages } = getPaginatedBlogPosts(1);

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
            Covering SEO, web design, development, and conversion optimization.
          </p>
        </header>

        <BlogPagination posts={posts} currentPage={currentPage} totalPages={totalPages} />
      </section>
    </main>
  );
}
