"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { presentation } from "@/data/presentation";
import {
  SlideHeader,
  SlideShell,
  accentRing,
  staggerContainer,
  staggerItem,
} from "@/components/presentation/SlideShell";

function MemberCard({
  name,
  role,
  photo,
  index,
}: {
  name: string;
  role: string;
  photo: string;
  index: number;
}) {
  return (
    <motion.li
      variants={staggerItem}
      className="flex h-full min-h-0 min-w-0 flex-col items-center"
    >
      <div
        className={`relative aspect-[3/4] h-[calc(100%-2.25rem)] overflow-hidden rounded-[1.35rem] bg-[var(--tcc-line)] ring-4 ${accentRing[index % 3]}`}
      >
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(max-width: 768px) 40vw, 28vw"
          className="object-cover object-top"
        />
      </div>
      <div className="mt-1.5 h-8 w-full shrink-0 px-1 text-center">
        <p className="font-[family-name:var(--font-display)] truncate text-sm font-bold tracking-[-0.03em] text-[var(--tcc-ink)] sm:text-base">
          {name}
        </p>
        {role ? (
          <p className="truncate text-[11px] leading-none text-[var(--tcc-muted)] sm:text-xs">
            {role}
          </p>
        ) : null}
      </div>
    </motion.li>
  );
}

export function CoreTeamSlide() {
  const { coreTeam } = presentation;
  const [lead, ...others] = coreTeam.members;

  return (
    <SlideShell>
      <SlideHeader
        title={coreTeam.title}
        subtitle={coreTeam.intro}
        className="mb-3 sm:mb-4"
      />

      <div className="grid min-h-0 flex-1 grid-rows-[1.7fr_1fr] gap-3">
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex h-full min-h-0 justify-center"
        >
          <MemberCard {...lead} index={0} />
        </motion.ul>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex h-full min-h-0 justify-center gap-4 sm:gap-5"
        >
          {others.map((member, index) => (
            <MemberCard
              key={member.photo}
              {...member}
              index={index + 1}
            />
          ))}
        </motion.ul>
      </div>
    </SlideShell>
  );
}
