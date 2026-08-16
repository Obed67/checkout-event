"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { presentation } from "@/data/presentation";
import {
  SlideShell,
  staggerContainer,
  staggerItem,
} from "@/components/presentation/SlideShell";

export function ClosingSlide() {
  const { closing, coreTeam } = presentation;

  return (
    <SlideShell align="center">
      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-10">
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="font-[family-name:var(--font-display)] text-[clamp(4.5rem,14vw,10rem)] leading-[0.85] font-extrabold tracking-[-0.06em] text-[var(--tcc-ink)]"
          >
            {closing.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="mx-auto max-w-xl text-[clamp(1.1rem,2vw,1.4rem)] leading-relaxed text-[var(--tcc-muted)]"
          >
            {closing.subtitle}
          </motion.p>
        </div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center pl-3 sm:pl-4"
        >
          {coreTeam.members.map((member) => (
              <motion.li
                key={member.photo}
                variants={staggerItem}
                className="-mr-3 sm:-mr-4"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-full bg-[var(--tcc-line)] ring-4 ring-[var(--tcc-paper)] sm:h-20 sm:w-20">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              </motion.li>
            ))}
        </motion.ul>
      </div>
    </SlideShell>
  );
}
