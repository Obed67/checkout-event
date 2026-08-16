"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { presentation } from "@/data/presentation";
import { SlideShell } from "@/components/presentation/SlideShell";

export function CoverSlide() {
  const { meta } = presentation;

  return (
    <SlideShell>
      <div className="grid min-h-0 flex-1 items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-full bg-[var(--tcc-blue-soft)] px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[var(--tcc-blue)] uppercase"
          >
            Checkout · TCC UAC
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,6.4vw,5.4rem)] leading-[0.92] font-extrabold tracking-[-0.05em] text-[var(--tcc-ink)]"
          >
            {meta.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="max-w-lg text-[clamp(1.1rem,2vw,1.45rem)] leading-relaxed text-[var(--tcc-muted)]"
          >
            <span className="font-semibold text-[var(--tcc-ink)]">
              +10 mois en tant que Lead TCC UAC.
            </span>{" "}
            Retour sur cette période.
          </motion.p>

          <motion.div
            aria-hidden
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mt-2 flex h-2.5 w-40 origin-left overflow-hidden rounded-full"
          >
            <span className="h-full flex-1 bg-[var(--tcc-pink)]" />
            <span className="h-full flex-1 bg-[var(--tcc-yellow)]" />
            <span className="h-full flex-1 bg-[var(--tcc-blue)]" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-[var(--tcc-yellow)]"
          />
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-[var(--tcc-line)]">
            <Image
              src="/team/Lead.png"
              alt="Lead TCC UAC"
              fill
              priority
              sizes="(max-width: 1024px) 70vw, 32vw"
              className="object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
