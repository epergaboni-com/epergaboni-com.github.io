import type { MetadataRoute } from "next";
import { getAllBlogPosts, getBlogTotalPages } from "../lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.epergaboni.com";
  const posts = getAllBlogPosts();
  const serviceSlugs = ["web-design", "web-development", "seo"];
  const totalPages = getBlogTotalPages();
  const paginationUrls =
    totalPages > 1
      ? Array.from({ length: totalPages - 1 }, (_, index) => ({
          url: `${baseUrl}/blog/page/${index + 2}`,
          lastModified: "2026-02-17",
          changeFrequency: "weekly" as const,
          priority: 0.7
        }))
      : [];

  return [
    {
      url: `${baseUrl}/`,
      lastModified: "2026-02-17",
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: "2026-02-17",
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: "2026-02-17",
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${baseUrl}/services`,
      lastModified: "2026-02-17",
      changeFrequency: "monthly",
      priority: 0.8
    },
    ...serviceSlugs.map((slug) => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified: "2026-02-17",
      changeFrequency: "monthly" as const,
      priority: 0.75
    })),
    ...paginationUrls,
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
