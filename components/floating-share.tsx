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
          <div className="w-[170px] rounded-xl border border-[#d8d8d8] bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md px-3 py-2 text-sm font-semibold text-[#222222] transition hover:bg-[#f3f3f3]"
              >
                Share on {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handleCopyLink}
              className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-[#222222] transition hover:bg-[#f3f3f3]"
            >
              {copied ? "Link copied" : "Copy link"}
            </button>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Share this post"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] text-lg font-black text-white shadow-[0_12px_26px_rgba(0,0,0,0.28)] transition hover:bg-[#2e2e2e]"
        >
          ↗
        </button>
      </div>
    </div>
  );
}
