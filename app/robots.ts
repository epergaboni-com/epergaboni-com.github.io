import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      },
      {
        userAgent: "Googlebot",
        allow: "/"
      },
      {
        userAgent: "Google-Extended",
        allow: "/"
      },
      {
        userAgent: "GPTBot",
        allow: "/"
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/"
      },
      {
        userAgent: "CCBot",
        allow: "/"
      },
      {
        userAgent: "PerplexityBot",
        allow: "/"
      },
      {
        userAgent: "ClaudeBot",
        allow: "/"
      },
      {
        userAgent: "anthropic-ai",
        allow: "/"
      },
      {
        userAgent: "Bingbot",
        allow: "/"
      }
    ],
    host: "https://www.epergaboni.com",
    sitemap: "https://www.epergaboni.com/sitemap.xml"
  };
}
