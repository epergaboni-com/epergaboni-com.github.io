import type { Metadata } from "next";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://epergaboni.com"),
  title: {
    default: "Eper Gaboni | Full-Stack Developer & SEO Specialist",
    template: "%s | Eper Gaboni"
  },
  description:
    "Portfolio blog of Eper Gaboni, a full-stack developer and SEO specialist in the Philippines.",
  keywords: [
    "web designer Philippines",
    "full-stack developer Philippines",
    "SEO specialist Philippines",
    "technical SEO",
    "website speed optimization"
  ],
  authors: [{ name: "Eper Gaboni" }],
  creator: "Eper Gaboni",
  publisher: "Eper Gaboni",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "/",
    siteName: "Eper Gaboni",
    title: "Eper Gaboni | Full-Stack Developer & SEO Specialist",
    description:
      "Web design, full-stack development, SEO audits, technical SEO fixes, and server management."
  },
  twitter: {
    card: "summary",
    title: "Eper Gaboni | Full-Stack Developer & SEO Specialist",
    description:
      "Portfolio blog of Eper Gaboni, a full-stack developer and SEO specialist in the Philippines."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  other: {
    bingbot: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    "applebot": "index, follow"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
