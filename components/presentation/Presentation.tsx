"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { PresentationControls } from "./PresentationControls";
import { PresentationLogo } from "./PresentationLogo";
import { SlideContainer } from "./SlideContainer";
import { TricolorRail } from "./TricolorRail";
import { CoverSlide } from "@/components/slides/CoverSlide";
import { AboutTccSlide } from "@/components/slides/AboutTccSlide";
import { BeginningSlide } from "@/components/slides/BeginningSlide";
import { LeadSlide } from "@/components/slides/LeadSlide";
import { CoreTeamFormationSlide } from "@/components/slides/CoreTeamFormationSlide";
import { CoreTeamSlide } from "@/components/slides/CoreTeamSlide";
import { ActivitiesSlide } from "@/components/slides/ActivitiesSlide";
import { StatsSlide } from "@/components/slides/StatsSlide";
import { TeamStoriesSlide } from "@/components/slides/TeamStoriesSlide";
import { LessonsSlide } from "@/components/slides/LessonsSlide";
import { ClosingSlide } from "@/components/slides/ClosingSlide";

const slides = [
  CoverSlide,
  AboutTccSlide,
  BeginningSlide,
  LeadSlide,
  CoreTeamFormationSlide,
  CoreTeamSlide,
  ActivitiesSlide,
  StatsSlide,
  TeamStoriesSlide,
  LessonsSlide,
  ClosingSlide,
] as const;

export function Presentation() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = slides.length;

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setDirection(clamped > index ? 1 : clamped < index ? -1 : 0);
      setIndex(clamped);
    },
    [index, total],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          event.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          prev();
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          break;
        case "End":
          event.preventDefault();
          goTo(total - 1);
          break;
        case "f":
        case "F":
          event.preventDefault();
          if (!document.fullscreenElement) {
            void document.documentElement.requestFullscreen();
          } else {
            void document.exitFullscreen();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, next, prev, total]);

  const CurrentSlide = slides[index];

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[var(--tcc-paper)] text-[var(--tcc-ink)]">
      <TricolorRail />
      <div className="presentation-grain" />

      <AnimatePresence mode="wait" custom={direction}>
        <SlideContainer key={index} direction={direction}>
          <CurrentSlide />
        </SlideContainer>
      </AnimatePresence>

      <PresentationLogo />
      <ProgressIndicator current={index} total={total} />
      <PresentationControls current={index} total={total} />
    </div>
  );
}
