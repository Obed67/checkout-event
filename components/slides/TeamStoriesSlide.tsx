"use client";

import { motion } from "framer-motion";
import { presentation } from "@/data/presentation";
import { SlideShell } from "@/components/presentation/SlideShell";

export function TeamStoriesSlide() {
  const { teamStories } = presentation;

  return (
    <SlideShell align="center">
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,6.4rem)] leading-[0.92] font-extrabold tracking-[-0.06em] text-[var(--tcc-ink)]"
      >
        {teamStories.title}
      </motion.h1>
    </SlideShell>
  );
}
