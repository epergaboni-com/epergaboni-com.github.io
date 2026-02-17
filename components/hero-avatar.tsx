"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaSearch } from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import {
  SiCss3,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiWordpress
} from "react-icons/si";

const programmingLanguages: { name: string; Icon: IconType; color: string }[] = [
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "WordPress", Icon: SiWordpress, color: "#21759B" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "SQL", Icon: SiMysql, color: "#4479A1" },
  { name: "CSS", Icon: SiCss3, color: "#1572B6" },
  { name: "SEO", Icon: FaSearch, color: "#16A34A" }
];

function withAlpha(hex: string, alpha: number): string {
  const normalizedHex = hex.replace("#", "");
  const r = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const g = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const b = Number.parseInt(normalizedHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function HeroAvatar() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const baseImageFilter =
    "saturate(1.45) hue-rotate(-10deg) contrast(1.08) drop-shadow(0 16px 28px rgba(214, 126, 38, 0.28))";

  useEffect(() => {
    const rootElement = rootRef.current;
    const heroElement = heroRef.current;
    const imageElement = imageRef.current;
    if (!rootElement || !heroElement || !imageElement) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      return;
    }

    const animationContext = gsap.context(() => {
      const languageElements = gsap.utils.toArray<HTMLElement>("[data-lang-chip]", rootElement);

      gsap.set(heroElement, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        transformOrigin: "50% 50%"
      });
      gsap.set(imageElement, { filter: baseImageFilter });
      languageElements.forEach((element) => {
        gsap.set(element, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          transformOrigin: "50% 50%"
        });
      });

      gsap.to(heroElement, {
        rotation: 360,
        duration: 12,
        ease: "none",
        repeat: -1
      });

      gsap.to(languageElements, {
        x: 26,
        duration: 1.25,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.1,
          from: "start"
        }
      });
    }, rootRef);

    return () => animationContext.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div ref={heroRef}>
        <svg
          viewBox="0 0 420 420"
          className="h-auto w-full"
          role="img"
          aria-label="Eper Gaboni avatar"
        >
          <image
            href="/illustrations/avatar.png"
            x="-110"
            y="-130"
            width="600"
            height="600"
            preserveAspectRatio="xMidYMid slice"
            ref={imageRef}
            style={{
              filter: baseImageFilter
            }}
          />
        </svg>
      </div>
      <div
        className="pointer-events-none mt-2 flex flex-wrap items-center justify-center gap-1"
        aria-hidden="true"
      >
        {programmingLanguages.map(({ name, Icon, color }) => (
          <span
            key={name}
            data-lang-chip
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-[20px] sm:h-10 sm:w-10 sm:text-[22px]"
            title={name}
            style={{
              color,
              borderColor: withAlpha(color, 0.45),
              backgroundColor: withAlpha(color, 0.12)
            }}
          >
            <Icon aria-label={name} />
          </span>
        ))}
      </div>
    </div>
  );
}
