"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { presentation } from "@/data/presentation";
import {
  SlideHeader,
  SlideShell,
  accentBg,
  staggerContainer,
} from "@/components/presentation/SlideShell";

type Line = { x1: number; y1: number; x2: number; y2: number };

export function BeginningSlide() {
  const { beginning } = presentation;
  const last = beginning.timeline.length - 1;
  const listRef = useRef<HTMLOListElement>(null);
  const [line, setLine] = useState<Line | null>(null);
  const [stepPad, setStepPad] = useState(0);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updatePad = () => {
      const width = list.getBoundingClientRect().width;
      const titleRoom = Math.min(width * 0.4, 520);
      const reserved = 112 + titleRoom;
      const next = last > 0 ? Math.max(0, width - reserved) / last : 0;
      setStepPad((prev) => (Math.abs(prev - next) > 0.5 ? next : prev));
    };

    updatePad();
    const observer = new ResizeObserver(updatePad);
    observer.observe(list);
    window.addEventListener("resize", updatePad);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePad);
    };
  }, [last]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updateLine = () => {
      const markers = list.querySelectorAll<HTMLElement>("[data-marker]");
      const first = markers[0]?.getBoundingClientRect();
      const lastMarker = markers[markers.length - 1]?.getBoundingClientRect();
      const box = list.getBoundingClientRect();
      if (!first || !lastMarker) return;

      setLine({
        x1: first.left + first.width / 2 - box.left,
        y1: first.top + first.height / 2 - box.top,
        x2: lastMarker.left + lastMarker.width / 2 - box.left,
        y2: lastMarker.top + lastMarker.height / 2 - box.top,
      });
    };

    updateLine();
    const frame = requestAnimationFrame(updateLine);
    return () => cancelAnimationFrame(frame);
  }, [stepPad]);

  return (
    <SlideShell>
      <SlideHeader title={beginning.title} subtitle={beginning.intro} />

      <motion.ol
        ref={listRef}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative flex min-h-0 flex-1 flex-col"
      >
        {line ? (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient
                id="beginning-path"
                gradientUnits="userSpaceOnUse"
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
              >
                <stop offset="0%" stopColor="var(--tcc-blue)" />
                <stop offset="50%" stopColor="var(--tcc-yellow)" />
                <stop offset="100%" stopColor="var(--tcc-pink)" />
              </linearGradient>
            </defs>
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#beginning-path)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        ) : null}

        {beginning.timeline.map((event, i) => (
          <motion.li
            key={event.title}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="relative flex min-h-0 flex-1 items-center gap-6 sm:gap-8"
            style={{ paddingLeft: i * stepPad }}
          >
            <span
              data-marker
              className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-lg font-bold ring-4 ring-[var(--tcc-paper)] sm:h-16 sm:w-16 sm:text-xl ${
                i % 3 === 1
                  ? "bg-[var(--tcc-yellow)] text-[var(--tcc-ink)]"
                  : `${accentBg[i % 3]} text-white`
              }`}
            >
              {i + 1}
            </span>

            <div className="min-w-0">
              {event.date ? (
                <p className="mb-1 text-sm tracking-wide text-[var(--tcc-muted)] uppercase">
                  {event.date}
                </p>
              ) : null}
              <p
                className={`font-[family-name:var(--font-display)] leading-[1.05] tracking-[-0.04em] ${
                  i === last
                    ? "text-[clamp(2.1rem,4.4vw,3.4rem)] font-extrabold text-[var(--tcc-pink)]"
                    : "text-[clamp(1.7rem,3.6vw,2.75rem)] font-bold text-[var(--tcc-ink)]"
                }`}
              >
                {event.title}
              </p>
              {event.detail ? (
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-[var(--tcc-muted)] sm:text-lg">
                  {event.detail}
                </p>
              ) : null}
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </SlideShell>
  );
}
