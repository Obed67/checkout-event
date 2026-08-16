"use client";

import { motion } from "framer-motion";
import { presentation } from "@/data/presentation";
import {
  SlideHeader,
  SlideShell,
  accentOnSoft,
  accentSoft,
  staggerContainer,
  staggerItem,
} from "@/components/presentation/SlideShell";

export function AboutTccSlide() {
  const { aboutTcc } = presentation;

  return (
    <SlideShell>
      <SlideHeader title={aboutTcc.title} />

      <div className="grid min-h-0 flex-1 items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.95] font-extrabold tracking-[-0.05em] text-[var(--tcc-ink)]"
        >
          Tech
          <br />
          <span className="text-[var(--tcc-blue)]">Campus</span>
          <br />
          <span className="text-[var(--tcc-pink)]">Clubs</span>
        </motion.p>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-4"
        >
          {aboutTcc.points.map((point, index) => (
            <motion.li
              key={point}
              variants={staggerItem}
              className={`rounded-3xl px-6 py-5 ${accentSoft[index % 3]}`}
            >
              <p
                className={`mb-2 font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.16em] uppercase ${accentOnSoft[index % 3]}`}
              >
                {index === 0 ? "Le lieu" : index === 1 ? "L’esprit" : "Le geste"}
              </p>
              <p className="text-[clamp(1.05rem,1.7vw,1.3rem)] leading-snug text-[var(--tcc-ink)]">
                {point}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </SlideShell>
  );
}
