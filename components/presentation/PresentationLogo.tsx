"use client";

import Image from "next/image";
import { presentation } from "@/data/presentation";

export function PresentationLogo() {
  return (
    <div className="pointer-events-none absolute top-5 left-8 z-30 sm:left-12 md:left-16">
      <Image
        src={presentation.meta.logo}
        alt="Logo TCC"
        width={160}
        height={160}
        priority
        className="h-12 w-auto sm:h-14 md:h-16"
      />
    </div>
  );
}
