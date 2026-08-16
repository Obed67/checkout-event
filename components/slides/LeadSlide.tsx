"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { presentation } from "@/data/presentation";
import {
  SlideHeader,
  SlideShell,
  accentOnSoft,
  accentSoft,
  staggerContainer,
} from "@/components/presentation/SlideShell";

type Segment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
};

const GUTTER = 14;
const connectorColors = [
  "var(--tcc-blue)",
  "var(--tcc-yellow)",
  "var(--tcc-pink)",
] as const;

const labels = ["Vision", "Décisions", "Équipe"] as const;

function leadSegments(cards: HTMLElement[], box: DOMRect): Segment[] {
  const rects = cards.map((el) => el.getBoundingClientRect());
  if (rects.length < 3) return [];

  const [vision, decisions, team] = rects;
  const stacked = vision.bottom <= decisions.top + 12;

  if (stacked) {
    return [vision, decisions].map((from, index) => {
      const to = rects[index + 1];
      return {
        x1: from.left + from.width / 2 - box.left,
        y1: from.bottom - box.top + GUTTER,
        x2: to.left + to.width / 2 - box.left,
        y2: to.top - box.top - GUTTER,
        color: connectorColors[index],
      };
    });
  }

  const targetY = team.top - box.top - GUTTER;
  const targetX = team.left + team.width / 2 - box.left;

  return [
    {
      x1: vision.left + vision.width / 2 - box.left,
      y1: vision.bottom - box.top + GUTTER,
      x2: targetX,
      y2: targetY,
      color: connectorColors[0],
    },
    {
      x1: decisions.left + decisions.width / 2 - box.left,
      y1: decisions.bottom - box.top + GUTTER,
      x2: targetX,
      y2: targetY,
      color: connectorColors[1],
    },
  ];
}

export function LeadSlide() {
  const { lead } = presentation;
  const [first, second, third] = lead.points;
  const kicker = "Et surtout,";
  const thirdBody = third.startsWith(kicker)
    ? third.slice(kicker.length).trim()
    : third;
  const items = [first, second, thirdBody];
  const last = items.length - 1;
  const listRef = useRef<HTMLOListElement>(null);
  const [segments, setSegments] = useState<Segment[]>([]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const update = () => {
      const cards = [...list.querySelectorAll<HTMLElement>("[data-lead-card]")];
      if (cards.length < 3) return;
      setSegments(leadSegments(cards, list.getBoundingClientRect()));
    };

    update();
    const frame = requestAnimationFrame(update);
    const observer = new ResizeObserver(update);
    observer.observe(list);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const isFunnel =
    segments.length === 2 &&
    segments[0].x2 === segments[1].x2 &&
    segments[0].y2 === segments[1].y2;
  const merge = isFunnel ? segments[0] : null;

  return (
    <SlideShell>
      <SlideHeader title={lead.title} />

      <motion.ol
        ref={listRef}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        aria-label="Ce que prenait le lead : vision, décisions, puis l'équipe"
        className="relative grid min-h-0 flex-1 grid-cols-1 content-center gap-14 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-24"
      >
        {segments.length > 0 ? (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
              {connectorColors.map((color, index) => (
                <marker
                  id={`lead-arrow-${index}`}
                  key={color}
                  viewBox="0 0 12 12"
                  refX="10"
                  refY="6"
                  markerWidth="9"
                  markerHeight="9"
                  orient="auto"
                >
                  <path d="M 0 0 L 12 6 L 0 12 z" fill={color} />
                </marker>
              ))}
            </defs>
            {segments.map((segment, index) => (
              <motion.line
                key={`${segment.x1}-${segment.y1}-${segment.x2}-${segment.y2}`}
                x1={segment.x1}
                y1={segment.y1}
                x2={segment.x2}
                y2={segment.y2}
                stroke={segment.color}
                strokeWidth="5"
                strokeLinecap="round"
                markerEnd={isFunnel ? undefined : `url(#lead-arrow-${index})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.18 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
            {merge ? (
              <motion.circle
                cx={merge.x2}
                cy={merge.y2}
                r="6"
                fill="var(--tcc-pink)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.42 }}
              />
            ) : null}
          </svg>
        ) : null}

        {items.map((text, index) => (
          <motion.li
            key={labels[index]}
            data-lead-card
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className={`relative z-10 flex flex-col justify-end rounded-[1.75rem] p-6 sm:p-7 ${
              index === last
                ? "min-h-[11rem] sm:col-span-2 sm:min-h-[13.5rem] sm:p-9"
                : "min-h-[9.5rem] sm:min-h-[11rem]"
            } ${accentSoft[index % 3]}`}
          >
            {index === last ? (
              <>
                <p className="mb-4 font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.18em] text-[var(--tcc-pink)] uppercase">
                  Et surtout
                </p>
                <p className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.92] font-extrabold tracking-[-0.05em] text-[var(--tcc-pink)]">
                  {labels[index]}
                </p>
                <p className="mt-3 max-w-3xl text-[clamp(1.05rem,1.8vw,1.35rem)] leading-snug text-[var(--tcc-ink)]">
                  {text}
                </p>
              </>
            ) : (
              <>
                <p
                  className={`font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.1rem)] leading-[0.95] font-extrabold tracking-[-0.05em] ${accentOnSoft[index]}`}
                >
                  {labels[index]}
                </p>
                <p className="mt-3 max-w-md text-[clamp(1.05rem,1.6vw,1.25rem)] leading-snug text-[var(--tcc-ink)]">
                  {text}
                </p>
              </>
            )}
          </motion.li>
        ))}
      </motion.ol>
    </SlideShell>
  );
}
