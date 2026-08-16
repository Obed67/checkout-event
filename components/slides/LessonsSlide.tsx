"use client";

import { motion } from "framer-motion";
import { presentation } from "@/data/presentation";
import {
  SlideShell,
  accentSoft,
  staggerContainer,
  staggerItem,
} from "@/components/presentation/SlideShell";

export function LessonsSlide() {
  const { lessons } = presentation;
  const [hero, ...rest] = lessons.words;

  return (
    <SlideShell align="center">
      <div className="flex w-full max-w-5xl flex-col items-center gap-10">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-[family-name:var(--font-display)] text-[clamp(1.7rem,3.4vw,2.85rem)] leading-[1.08] font-extrabold tracking-[-0.04em] text-[var(--tcc-ink)]"
        >
          {lessons.title}
        </motion.h1>

        <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-end justify-center rounded-[2rem] bg-[var(--tcc-blue-soft)] p-8 text-center font-[family-name:var(--font-display)] text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] font-extrabold tracking-[-0.05em] text-[var(--tcc-blue)] sm:p-10"
          >
            {hero}
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-4"
          >
            {rest.map((word, index) => (
              <motion.li
                key={word}
                variants={staggerItem}
                className={`flex items-end justify-center rounded-[1.5rem] p-5 text-center font-[family-name:var(--font-display)] text-[clamp(1.2rem,2.2vw,1.7rem)] font-bold tracking-[-0.03em] text-[var(--tcc-ink)] ${accentSoft[(index + 1) % 3]}`}
              >
                {word}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </SlideShell>
  );
}
