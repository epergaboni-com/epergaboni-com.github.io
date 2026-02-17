"use client";

import { useState } from "react";

interface FloatingShareProps {
  title: string;
  url: string;
}

export default function FloatingShare({ title, url }: FloatingShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    }
  ];

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-4 z-50 sm:bottom-8 sm:right-8">
      <div className="flex flex-col items-end gap-2">
        {isOpen ? (
          <div className="w-[170px] rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md px-3 py-2 text-sm font-semibold text-[var(--theme-green-deep)] transition hover:bg-[rgba(120,120,120,0.18)]"
              >
                Share on {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleCopyLink}
              className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-[var(--theme-green-deep)] transition hover:bg-[rgba(120,120,120,0.18)]"
            >
              {copied ? "Link copied" : "Copy link"}
            </button>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Share this post"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--theme-gold)] bg-[var(--theme-green)] text-lg font-black text-white shadow-[0_12px_26px_rgba(0,0,0,0.34)] transition hover:bg-[var(--theme-green-deep)]"
        >
          ↗
        </button>
      </div>
    </div>
  );
}
