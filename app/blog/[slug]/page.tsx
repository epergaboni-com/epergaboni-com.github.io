import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import FloatingShare from "../../../components/floating-share";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  parseMarkdownBlocks
} from "../../../lib/blog";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
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
  const canonicalUrl = `https://www.epergaboni.com/blog/${post.slug}`;
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
    image: `https://www.epergaboni.com${post.coverImage}`
  };

  return (
    <main className="theme-shell px-4 py-10 sm:py-14">
      <article className="theme-card mx-auto max-w-4xl rounded-2xl px-5 py-6 sm:px-8 sm:py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--theme-green-deep)] sm:text-sm">
          <Link href="/blog" className="underline decoration-2 underline-offset-4">
            Back to Blog
          </Link>
        </p>

        <header>
          <p className="theme-btn-secondary inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide sm:text-sm">
            {post.category}
          </p>
          <h1 className="mt-3 break-words text-3xl font-extrabold leading-tight text-[var(--theme-green-deep)] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base text-[#444444] sm:text-lg lg:text-xl">{post.description}</p>
          <figure className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--line-strong)] bg-[var(--surface-soft)]">
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
                  className="mt-12 break-words border-l-4 border-[var(--theme-gold)] pl-3 text-2xl font-extrabold leading-tight text-[var(--theme-green-deep)] sm:text-3xl"
                >
                  {renderInlineMarkdown(block.text ?? "")}
                </h2>
              );
            }

            if (block.type === "heading-3") {
              return (
                <h3
                  key={`block-${blockIndex}`}
                  className="mt-8 break-words text-xl font-extrabold leading-tight text-[var(--theme-green-deep)] sm:text-2xl"
                >
                  {renderInlineMarkdown(block.text ?? "")}
                </h3>
              );
            }

            if (block.type === "heading-4") {
              return (
                <h4
                  key={`block-${blockIndex}`}
                  className="mt-6 text-lg font-bold leading-tight text-[var(--theme-green-deep)] sm:text-xl"
                >
                  {renderInlineMarkdown(block.text ?? "")}
                </h4>
              );
            }

            if (block.type === "list") {
              return (
                <ul
                  key={`block-${blockIndex}`}
                  className="list-disc space-y-2 pl-6 text-base leading-relaxed text-[#444444] sm:text-lg"
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
                className="break-words text-base leading-relaxed text-[#444444] sm:text-lg"
              >
                {renderInlineMarkdown(block.text ?? "")}
              </p>
            );
          })}
        </section>
      </article>
      <FloatingShare title={post.title} url={canonicalUrl} />
    </main>
  );
}
