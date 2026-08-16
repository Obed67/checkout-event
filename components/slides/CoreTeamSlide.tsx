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
      <div className="flex min-h-0 w-full flex-1 items-center justify-center">
        <div
          className={`relative h-full overflow-hidden rounded-[1.35rem] bg-[var(--tcc-line)] ring-4 ${accentRing[index % 3]}`}
          style={{ aspectRatio: "3 / 4", width: "auto" }}
        >
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 768px) 40vw, 22vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="mt-2 w-full shrink-0 px-1 text-center">
        <p className="font-[family-name:var(--font-display)] text-base font-bold tracking-[-0.03em] text-[var(--tcc-ink)] sm:text-lg">
          {name}
        </p>
        {role ? (
          <p className="text-xs leading-snug text-[var(--tcc-muted)] sm:text-sm">
            {role}
          </p>
        ) : null}
      </div>
    </motion.li>
  );
}

export function CoreTeamSlide() {
  const { coreTeam } = presentation;
  const heads = coreTeam.members.slice(0, 2);
  const rest = coreTeam.members.slice(2);

  return (
    <SlideShell>
      <SlideHeader
        title={coreTeam.title}
        subtitle={coreTeam.intro}
        className="mb-4 sm:mb-5"
      />

      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid min-h-0 flex-[1.2] grid-cols-2 justify-items-center gap-5 sm:gap-8"
        >
          {heads.map((member, index) => (
            <MemberCard key={member.photo} {...member} index={index} />
          ))}
        </motion.ul>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid min-h-0 flex-1 grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
        >
          {rest.map((member, index) => (
            <MemberCard
              key={member.photo}
              {...member}
              index={index + heads.length}
            />
          ))}
        </motion.ul>
      </div>
    </SlideShell>
  );
}
