"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { presentation } from "@/data/presentation";
import {
  SlideHeader,
  SlideNote,
  SlideShell,
  accentOnSoft,
  accentSoft,
  staggerContainer,
  staggerItem,
} from "@/components/presentation/SlideShell";

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "+",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [count, value]);

  return (
    <span className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsSlide() {
  const { stats } = presentation;
  const items = stats.items.filter(
    (item): item is { label: string; value: number; suffix?: string } =>
      item.value !== null,
  );

  const hero =
    items.length > 0
      ? items.reduce((max, item) => (item.value > max.value ? item : max))
      : null;
  const rest = hero ? items.filter((item) => item !== hero) : [];

  return (
    <SlideShell>
      <SlideHeader title={stats.title} />

      {items.length > 0 && hero ? (
        <div className="grid min-h-0 flex-1 content-center gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-end rounded-[2rem] bg-[var(--tcc-pink-soft)] p-8 sm:p-10"
          >
            <p className="font-[family-name:var(--font-display)] text-[clamp(4.5rem,12vw,8.5rem)] leading-none font-extrabold tracking-[-0.06em] text-[var(--tcc-pink)]">
              <AnimatedNumber value={hero.value} suffix={hero.suffix ?? ""} />
            </p>
            <p className="mt-4 text-lg text-[var(--tcc-muted)]">{hero.label}</p>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-4"
          >
            {rest.map((item, index) => (
              <motion.li
                key={item.label}
                variants={staggerItem}
                className={`flex flex-col justify-end rounded-[1.5rem] p-5 ${accentSoft[index % 3]}`}
              >
                <p
                  className={`font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] leading-none font-extrabold tracking-[-0.05em] ${accentOnSoft[index % 3]}`}
                >
                  <AnimatedNumber value={item.value} suffix={item.suffix ?? ""} />
                </p>
                <p className="mt-2 text-sm text-[var(--tcc-muted)]">
                  {item.label}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      ) : (
        <SlideNote>
          Les chiffres concrets arriveront ici. Pour l’instant, je vais juste
          vous raconter ce qui compte.
        </SlideNote>
      )}
    </SlideShell>
  );
}
