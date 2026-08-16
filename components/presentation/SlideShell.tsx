"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SlideShellProps = {
  children: ReactNode;
  className?: string;
  align?: "content" | "center";
};

export function SlideShell({
  children,
  className = "",
  align = "content",
}: SlideShellProps) {
  const alignment =
    align === "center"
      ? "items-center justify-center text-center"
      : "items-stretch justify-start";

  return (
    <div
      className={`relative flex h-full w-full flex-col px-8 pt-28 pb-20 sm:px-12 sm:pt-32 sm:pb-24 md:px-16 md:pt-32 ${alignment} ${className}`}
    >
      {children}
    </div>
  );
}

export function SlideHeader({
  title,
  subtitle,
  className = "",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={`mb-8 shrink-0 space-y-3 text-left sm:mb-10 ${className}`}
    >
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(1.7rem,3.4vw,2.85rem)] leading-[1.08] font-extrabold tracking-[-0.04em] text-[var(--tcc-ink)]"
      >
        {title}
      </motion.h1>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.06 }}
          className="max-w-2xl text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-[var(--tcc-muted)]"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </header>
  );
}

export function SlideNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1 items-center">
      <p className="max-w-2xl rounded-3xl bg-[var(--tcc-yellow-soft)] px-7 py-6 text-[clamp(1.05rem,1.8vw,1.3rem)] leading-relaxed text-[var(--tcc-ink)]">
        {children}
      </p>
    </div>
  );
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const accentBg = [
  "bg-[var(--tcc-blue)]",
  "bg-[var(--tcc-yellow)]",
  "bg-[var(--tcc-pink)]",
] as const;

export const accentOnSoft = [
  "text-[var(--tcc-blue)]",
  "text-[var(--tcc-ink)]",
  "text-[var(--tcc-pink)]",
] as const;

export const accentSoft = [
  "bg-[var(--tcc-blue-soft)]",
  "bg-[var(--tcc-yellow-soft)]",
  "bg-[var(--tcc-pink-soft)]",
] as const;

export const accentRing = [
  "ring-[var(--tcc-blue)]",
  "ring-[var(--tcc-yellow)]",
  "ring-[var(--tcc-pink)]",
] as const;
