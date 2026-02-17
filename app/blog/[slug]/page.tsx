import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import FloatingShare from "../../../components/floating-share";
import {
  getAllBlogPosts,
  getAllBlogSlugs,
  getBlogPostBySlug,
  parseMarkdownBlocks
} from "../../../lib/blog";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

function formatDate(dateValue: string): string {
  return new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g;
  let cursor = 0;
  let matchIndex = 0;

  for (const match of text.matchAll(tokenRegex)) {
    const fullMatch = match[0];
    const position = match.index ?? 0;

    if (position > cursor) {
      nodes.push(text.slice(cursor, position));
    }

    const label = match[2];
    const href = match[3];
    const boldText = match[4];
    const key = `inline-${matchIndex}`;

    if (label && href) {
      if (href.startsWith("/")) {
        nodes.push(
          <Link key={key} href={href} className="underline decoration-2 underline-offset-2">
            {label}
          </Link>
        );
      } else {
        nodes.push(
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-2 underline-offset-2"
          >
            {label}
          </a>
        );
      }
    } else if (boldText) {
      nodes.push(<strong key={key}>{boldText}</strong>);
    } else {
      nodes.push(fullMatch);
    }

    cursor = position + fullMatch.length;
    matchIndex += 1;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found"
    };
  }

  const canonicalPath = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.coverImage }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage]
    }
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const contentBlocks = parseMarkdownBlocks(post.content);
  const canonicalUrl = `https://epergaboni.com/blog/${post.slug}`;
  const allPosts = getAllBlogPosts();
  const relatedCandidates = allPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => post.tags.includes(tag)).length;
      const categoryScore = candidate.category === post.category ? 2 : 0;
      const score = sharedTags + categoryScore;

      return {
        ...candidate,
        score
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const relatedPosts = relatedCandidates.slice(0, 3);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author
    },
    datePublished: post.date,
    mainEntityOfPage: canonicalUrl,
    image: `https://epergaboni.com${post.coverImage}`
  };

  return (
    <main className="px-4 py-10 sm:py-14">
      <article className="mx-auto max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#666666] sm:text-sm">
          <Link href="/blog" className="underline decoration-2 underline-offset-4">
            Back to Blog
          </Link>
        </p>

        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#666666] sm:text-sm">
            {post.category}
          </p>
          <h1 className="mt-2 break-words text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base text-[#3f3f3f] sm:text-lg lg:text-xl">{post.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-[#555555] sm:text-sm">
            <span>{post.author}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <figure className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#dcdcdc] bg-white">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </figure>
        </header>

        <section className="mt-10 space-y-5 pb-8">
          {contentBlocks.map((block, blockIndex) => {
            if (block.type === "heading-2") {
              return (
                <h2
                  key={`block-${blockIndex}`}
                  className="mt-12 break-words text-2xl font-extrabold leading-tight sm:text-3xl"
                >
                  {renderInlineMarkdown(block.text ?? "")}
                </h2>
              );
            }

            if (block.type === "heading-3") {
              return (
                <h3
                  key={`block-${blockIndex}`}
                  className="mt-8 break-words text-xl font-extrabold leading-tight sm:text-2xl"
                >
                  {renderInlineMarkdown(block.text ?? "")}
                </h3>
              );
            }

            if (block.type === "heading-4") {
              return (
                <h4 key={`block-${blockIndex}`} className="mt-6 text-lg font-bold leading-tight sm:text-xl">
                  {renderInlineMarkdown(block.text ?? "")}
                </h4>
              );
            }

            if (block.type === "list") {
              return (
                <ul
                  key={`block-${blockIndex}`}
                  className="list-disc space-y-2 pl-6 text-base leading-relaxed sm:text-lg"
                >
                  {(block.items ?? []).map((item, itemIndex) => (
                    <li key={`block-${blockIndex}-item-${itemIndex}`} className="break-words">
                      {renderInlineMarkdown(item)}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p
                key={`block-${blockIndex}`}
                className="break-words text-base leading-relaxed text-[#222222] sm:text-lg"
              >
                {renderInlineMarkdown(block.text ?? "")}
              </p>
            );
          })}
        </section>

        {relatedPosts.length > 0 ? (
          <section className="mt-8 border-t border-[#dddddd] pt-8">
            <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
              Related Blog Posts
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.slug}
                  className="rounded-xl border border-[#dddddd] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.04)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#666666]">
                    {relatedPost.category}
                  </p>
                  <h3 className="mt-2 text-base font-extrabold leading-tight sm:text-lg">
                    <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#454545]">
                    {relatedPost.description}
                  </p>
                  <p className="mt-3 text-xs font-medium text-[#666666]">
                    {formatDate(relatedPost.date)}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <FloatingShare title={post.title} url={canonicalUrl} />
    </main>
  );
}
