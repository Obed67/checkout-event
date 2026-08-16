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

export function ActivitiesSlide() {
  const { activities } = presentation;

  return (
    <SlideShell>
      <SlideHeader title={activities.title} subtitle={activities.intro} />

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid min-h-0 flex-1 grid-cols-1 content-center gap-4 sm:grid-cols-2 sm:gap-5"
      >
        {activities.groups.map((group, index) => (
          <motion.li
            key={group.label}
            variants={staggerItem}
            className={`flex flex-col justify-between rounded-[1.75rem] p-6 sm:p-7 ${accentSoft[index % 3]}`}
          >
            <p
              className={`font-[family-name:var(--font-display)] text-[clamp(1.7rem,3.2vw,2.4rem)] leading-[0.95] font-extrabold tracking-[-0.04em] ${accentOnSoft[index % 3]}`}
            >
              {group.label}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {group.themes.map((theme) => (
                <li
                  key={theme}
                  className="rounded-full bg-white/70 px-3 py-1.5 text-sm leading-none font-medium text-[var(--tcc-ink)] sm:text-[0.95rem]"
                >
                  {theme}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </motion.ul>
    </SlideShell>
  );
}
