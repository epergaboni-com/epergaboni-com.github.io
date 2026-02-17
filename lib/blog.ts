import fs from "node:fs";
import path from "node:path";

const BLOG_DIRECTORY = path.join(process.cwd(), "blog");
export const BLOGS_PER_PAGE = 9;

type MarkdownBlockType = "heading-2" | "heading-3" | "heading-4" | "paragraph" | "list";

export interface MarkdownBlock {
  type: MarkdownBlockType;
  text?: string;
  items?: string[];
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  featured: boolean;
}

export interface BlogPostSummary extends BlogPostFrontmatter {
  slug: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
}

function listMarkdownFiles(): string[] {
  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort();
}

function parseScalar(value: string): string | boolean {
  const trimmedValue = value.trim();

  if (
    (trimmedValue.startsWith("'") && trimmedValue.endsWith("'")) ||
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"'))
  ) {
    return trimmedValue.slice(1, -1);
  }

  if (trimmedValue === "true") {
    return true;
  }

  if (trimmedValue === "false") {
    return false;
  }

  return trimmedValue;
}

function parseFrontmatterBlock(frontmatterBlock: string): Record<string, unknown> {
  const lines = frontmatterBlock.split("\n");
  const parsed: Record<string, unknown> = {};

  let currentKey: string | null = null;
  let currentMode: "scalar" | "array" | "folded" | null = null;
  let buffer: string[] = [];

  const commitCurrent = () => {
    if (!currentKey) {
      return;
    }

    if (currentMode === "array") {
      parsed[currentKey] = buffer.map((item) => String(parseScalar(item)));
    } else if (currentMode === "folded") {
      parsed[currentKey] = buffer.join(" ").trim();
    } else {
      parsed[currentKey] = buffer.length > 0 ? parseScalar(buffer.join(" ").trim()) : "";
    }

    currentKey = null;
    currentMode = null;
    buffer = [];
  };

  for (const line of lines) {
    const keyMatch = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);

    if (keyMatch) {
      commitCurrent();
      currentKey = keyMatch[1];
      const rawValue = keyMatch[2];

      if (rawValue === ">-") {
        currentMode = "folded";
      } else if (rawValue === "") {
        currentMode = "array";
      } else {
        currentMode = "scalar";
        buffer.push(rawValue);
      }
      continue;
    }

    if (!currentKey) {
      continue;
    }

    if (currentMode === "array") {
      const arrayItemMatch = line.match(/^\s*-\s*(.+)$/);
      if (arrayItemMatch) {
        buffer.push(arrayItemMatch[1]);
      }
      continue;
    }

    if (currentMode === "folded") {
      if (line.trim().length > 0) {
        buffer.push(line.trim());
      }
      continue;
    }

    if (line.trim().length > 0) {
      buffer.push(line.trim());
    }
  }

  commitCurrent();
  return parsed;
}

function parseMarkdownFile(rawMarkdown: string): {
  frontmatter: Record<string, unknown>;
  content: string;
} {
  const normalized = rawMarkdown.replace(/\r\n/g, "\n");

  if (!normalized.startsWith("---\n")) {
    return { frontmatter: {}, content: normalized.trim() };
  }

  const closingDelimiterIndex = normalized.indexOf("\n---\n", 4);
  if (closingDelimiterIndex === -1) {
    return { frontmatter: {}, content: normalized.trim() };
  }

  const frontmatterBlock = normalized.slice(4, closingDelimiterIndex);
  const contentBlock = normalized.slice(closingDelimiterIndex + 5).trim();

  return {
    frontmatter: parseFrontmatterBlock(frontmatterBlock),
    content: contentBlock
  };
}

function normalizeCoverImage(rawCoverImage: string): string {
  if (!rawCoverImage) {
    return "/illustrations/blog-default.svg";
  }

  if (rawCoverImage.startsWith("/images/illustrations/")) {
    return rawCoverImage.replace("/images/illustrations/", "/illustrations/");
  }

  if (rawCoverImage.startsWith("images/illustrations/")) {
    return `/${rawCoverImage.replace("images/illustrations/", "illustrations/")}`;
  }

  if (rawCoverImage.startsWith("/illustrations/")) {
    return rawCoverImage;
  }

  const fileName = path.basename(rawCoverImage);
  return `/illustrations/${fileName}`;
}

function stripMarkdownSyntax(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function createExcerpt(markdownContent: string): string {
  const firstParagraph = markdownContent
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .find((paragraph) => paragraph.length > 0 && !paragraph.startsWith("#") && !paragraph.startsWith("- "));

  if (!firstParagraph) {
    return "Read the full article.";
  }

  return stripMarkdownSyntax(firstParagraph);
}

function buildFrontmatter(
  frontmatter: Record<string, unknown>,
  fallbackSlug: string
): BlogPostFrontmatter {
  return {
    title: String(frontmatter.title ?? fallbackSlug),
    description: String(frontmatter.description ?? "Read this article from Eper Gaboni."),
    date: String(frontmatter.date ?? "2026-01-01"),
    author: String(frontmatter.author ?? "Eper Gaboni"),
    category: String(frontmatter.category ?? "Blog"),
    tags: Array.isArray(frontmatter.tags)
      ? frontmatter.tags.map((tag) => String(tag))
      : [],
    coverImage: normalizeCoverImage(String(frontmatter.coverImage ?? "")),
    featured: Boolean(frontmatter.featured)
  };
}

function toSummary(fileName: string): BlogPostSummary {
  const slug = fileName.replace(/\.md$/, "");
  const markdownPath = path.join(BLOG_DIRECTORY, fileName);
  const rawMarkdown = fs.readFileSync(markdownPath, "utf8");
  const { frontmatter, content } = parseMarkdownFile(rawMarkdown);
  const parsedFrontmatter = buildFrontmatter(frontmatter, slug);

  return {
    ...parsedFrontmatter,
    slug,
    excerpt: createExcerpt(content)
  };
}

export function getAllBlogPosts(): BlogPostSummary[] {
  return listMarkdownFiles()
    .map((fileName) => toSummary(fileName))
    .sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return bDate - aDate;
    });
}

export function getBlogTotalPages(postsPerPage: number = BLOGS_PER_PAGE): number {
  const totalPosts = getAllBlogPosts().length;
  return Math.max(1, Math.ceil(totalPosts / postsPerPage));
}

export function getPaginatedBlogPosts(
  pageNumber: number,
  postsPerPage: number = BLOGS_PER_PAGE
): {
  posts: BlogPostSummary[];
  currentPage: number;
  totalPages: number;
} {
  const allPosts = getAllBlogPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / postsPerPage));
  const safeCurrentPage = Math.min(Math.max(1, pageNumber), totalPages);
  const startIndex = (safeCurrentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return {
    posts: allPosts.slice(startIndex, endIndex),
    currentPage: safeCurrentPage,
    totalPages
  };
}

export function getAllBlogSlugs(): string[] {
  return listMarkdownFiles().map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const sanitizedSlug = slug.replace(/\.md$/, "");
  const markdownPath = path.join(BLOG_DIRECTORY, `${sanitizedSlug}.md`);

  if (!fs.existsSync(markdownPath)) {
    return null;
  }

  const rawMarkdown = fs.readFileSync(markdownPath, "utf8");
  const { frontmatter, content } = parseMarkdownFile(rawMarkdown);
  const parsedFrontmatter = buildFrontmatter(frontmatter, sanitizedSlug);

  return {
    ...parsedFrontmatter,
    slug: sanitizedSlug,
    excerpt: createExcerpt(content),
    content
  };
}

export function parseMarkdownBlocks(markdownContent: string): MarkdownBlock[] {
  const lines = markdownContent.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];

  let currentParagraph: string[] = [];
  let currentList: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length === 0) {
      return;
    }

    blocks.push({
      type: "paragraph",
      text: currentParagraph.join(" ").trim()
    });
    currentParagraph = [];
  };

  const flushList = () => {
    if (currentList.length === 0) {
      return;
    }

    blocks.push({
      type: "list",
      items: [...currentList]
    });
    currentList = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("#### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading-4", text: line.replace(/^####\s+/, "") });
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading-3", text: line.replace(/^###\s+/, "") });
      continue;
    }

    if (line.startsWith("## ") || line.startsWith("# ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading-2", text: line.replace(/^##?\s+/, "") });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      currentList.push(line.replace(/^-+\s+/, "").trim());
      continue;
    }

    flushList();
    currentParagraph.push(line);
  }

  flushParagraph();
  flushList();

  return blocks;
}
