"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const variants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? 48 : -48,
    opacity: 0,
    scale: 0.985,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? -36 : 36,
    opacity: 0,
    scale: 0.99,
  }),
};

type SlideContainerProps = {
  children: ReactNode;
  direction: number;
};

export function SlideContainer({ children, direction }: SlideContainerProps) {
  return (
    <motion.section
      role="group"
      aria-roledescription="slide"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex h-full w-full flex-col"
    >
      {children}
    </motion.section>
  );
}
