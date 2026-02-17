import Image from "next/image";
import Link from "next/link";
import type { BlogPostSummary } from "../lib/blog";

interface BlogPaginationProps {
  posts: BlogPostSummary[];
  currentPage: number;
  totalPages: number;
}

function formatDate(dateValue: string): string {
  return new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function getPageHref(page: number): string {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

export default function BlogPagination({
  posts,
  currentPage,
  totalPages
}: BlogPaginationProps) {
  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded-xl border border-[#dedede] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
              <div className="relative aspect-[16/10] w-full bg-[#ececec]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </Link>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#666666] sm:text-sm">
                {post.category}
              </p>
              <h2 className="mt-2 text-lg font-extrabold leading-tight sm:text-xl">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#454545] sm:text-base">
                {post.description}
              </p>
              <p className="mt-4 text-[11px] font-medium text-[#666666] sm:text-xs">
                {formatDate(post.date)}
              </p>
              {post.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={`${post.slug}-${tag}`}
                      className="rounded-full bg-[#f0f0f0] px-3 py-1 text-[11px] font-semibold text-[#333333] sm:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 ? (
        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          aria-label="Blog pagination"
        >
          {currentPage > 1 ? (
            <Link
              href={getPageHref(currentPage - 1)}
              className="rounded-md border border-[#d0d0d0] bg-white px-3 py-2 text-xs font-semibold text-[#222222] transition hover:bg-[#f7f7f7] sm:px-4 sm:text-sm"
            >
              Prev
            </Link>
          ) : null}

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
            const isActive = page === currentPage;
            return (
              <Link
                key={`page-${page}`}
                href={getPageHref(page)}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                  isActive
                    ? "bg-[#111111] text-white"
                    : "border border-[#d0d0d0] bg-white text-[#222222] hover:bg-[#f7f7f7]"
                }`}
              >
                {page}
              </Link>
            );
          })}

          {currentPage < totalPages ? (
            <Link
              href={getPageHref(currentPage + 1)}
              className="rounded-md border border-[#d0d0d0] bg-white px-3 py-2 text-xs font-semibold text-[#222222] transition hover:bg-[#f7f7f7] sm:px-4 sm:text-sm"
            >
              Next
            </Link>
          ) : null}
        </nav>
      ) : null}
    </>
  );
}
