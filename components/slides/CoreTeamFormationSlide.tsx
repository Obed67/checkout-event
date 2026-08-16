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

type Segment = { x1: number; y1: number; x2: number; y2: number };

const placements = [
  "sm:col-start-1 sm:row-start-1",
  "sm:col-start-2 sm:row-start-1",
  "sm:col-start-2 sm:row-start-2",
  "sm:col-start-1 sm:row-start-2",
] as const;

const connectorColors = [
  "var(--tcc-blue)",
  "var(--tcc-yellow)",
  "var(--tcc-pink)",
] as const;

const GUTTER = 12;

function segmentsFromCards(
  cards: HTMLElement[],
  box: DOMRect,
): Segment[] {
  const rects = cards.map((el) => el.getBoundingClientRect());
  const segs: Segment[] = [];

  for (let i = 0; i < rects.length - 1; i++) {
    const from = rects[i];
    const to = rects[i + 1];
    const fromCx = from.left + from.width / 2;
    const fromCy = from.top + from.height / 2;
    const toCx = to.left + to.width / 2;
    const toCy = to.top + to.height / 2;
    const dx = toCx - fromCx;
    const dy = toCy - fromCy;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        segs.push({
          x1: from.right - box.left + GUTTER,
          y1: fromCy - box.top,
          x2: to.left - box.left - GUTTER,
          y2: toCy - box.top,
        });
      } else {
        segs.push({
          x1: from.left - box.left - GUTTER,
          y1: fromCy - box.top,
          x2: to.right - box.left + GUTTER,
          y2: toCy - box.top,
        });
      }
    } else if (dy > 0) {
      segs.push({
        x1: fromCx - box.left,
        y1: from.bottom - box.top + GUTTER,
        x2: toCx - box.left,
        y2: to.top - box.top - GUTTER,
      });
    } else {
      segs.push({
        x1: fromCx - box.left,
        y1: from.top - box.top - GUTTER,
        x2: toCx - box.left,
        y2: to.bottom - box.top + GUTTER,
      });
    }
  }

  return segs;
}

export function CoreTeamFormationSlide() {
  const { coreTeamFormation } = presentation;
  const { candidatures, entretiens, selectionnes } = coreTeamFormation.counts;
  const last = coreTeamFormation.steps.length - 1;
  const listRef = useRef<HTMLOListElement>(null);
  const [segments, setSegments] = useState<Segment[]>([]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const update = () => {
      const cards = [
        ...list.querySelectorAll<HTMLElement>("[data-step-card]"),
      ];
      if (cards.length < 2) return;
      setSegments(segmentsFromCards(cards, list.getBoundingClientRect()));
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

  return (
    <SlideShell>
      <SlideHeader
        title={coreTeamFormation.title}
        subtitle={coreTeamFormation.intro}
      />

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-8">
        <motion.ol
          ref={listRef}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          aria-label="Parcours de formation de la Core Team, de la candidature à l'équipe"
          className="relative grid min-h-0 flex-1 grid-cols-1 content-center gap-16 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-28 sm:gap-y-20"
        >
          {segments.length > 0 ? (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            >
              <defs>
                {connectorColors.map((color, index) => (
                  <marker
                    id={`formation-arrow-${index}`}
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
                  stroke={connectorColors[index % connectorColors.length]}
                  strokeWidth="5"
                  strokeLinecap="round"
                  markerEnd={`url(#formation-arrow-${index % connectorColors.length})`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </svg>
          ) : null}

          {coreTeamFormation.steps.map((step, index) => (
            <motion.li
              key={step}
              data-step-card
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className={`relative z-10 flex min-h-[8.5rem] flex-col justify-between rounded-[1.75rem] p-6 sm:min-h-[10.5rem] sm:p-7 ${
                placements[index]
              } ${accentSoft[index % 3]} ${
                index === last
                  ? "ring-2 ring-[var(--tcc-pink)] ring-offset-4 ring-offset-[var(--tcc-paper)]"
                  : ""
              }`}
            >
              <span
                className={`font-[family-name:var(--font-display)] text-sm font-bold ${accentOnSoft[index % 3]}`}
              >
                {String(index + 1).padStart(2, "0")}
                {index === 0 ? (
                  <span className="ml-2 font-[family-name:var(--font-body)] text-xs font-semibold tracking-wide text-[var(--tcc-muted)] uppercase">
                    Départ
                  </span>
                ) : null}
                {index === last ? (
                  <span className="ml-2 font-[family-name:var(--font-body)] text-xs font-semibold tracking-wide text-[var(--tcc-pink)] uppercase">
                    {/* Arrivée */}
                  </span>
                ) : null}
              </span>
              <p
                className={`font-[family-name:var(--font-display)] leading-snug tracking-[-0.03em] ${
                  index === last
                    ? "text-[clamp(1.5rem,2.6vw,2.05rem)] font-extrabold text-[var(--tcc-pink)]"
                    : "text-[clamp(1.35rem,2.4vw,1.85rem)] font-bold text-[var(--tcc-ink)]"
                }`}
              >
                {step}
              </p>
            </motion.li>
          ))}
        </motion.ol>

        {(candidatures !== null ||
          entretiens !== null ||
          selectionnes !== null) && (
          <div className="flex flex-wrap gap-10">
            {candidatures !== null ? (
              <p className="text-[var(--tcc-muted)]">
                <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] text-[var(--tcc-blue)]">
                  {candidatures}
                </span>{" "}
                candidatures
              </p>
            ) : null}
            {entretiens !== null ? (
              <p className="text-[var(--tcc-muted)]">
                <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] text-[var(--tcc-yellow)]">
                  {entretiens}
                </span>{" "}
                entretiens
              </p>
            ) : null}
            {selectionnes !== null ? (
              <p className="text-[var(--tcc-muted)]">
                <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.04em] text-[var(--tcc-pink)]">
                  {selectionnes}
                </span>{" "}
                sélectionnés
              </p>
            ) : null}
          </div>
        )}
      </div>
    </SlideShell>
  );
}
