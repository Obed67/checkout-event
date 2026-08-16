"use client";

type PresentationControlsProps = {
  current: number;
  total: number;
};

export function PresentationControls({
  current,
  total,
}: PresentationControlsProps) {
  return (
    <p className="pointer-events-none absolute top-5 right-10 z-30 text-sm tabular-nums text-[var(--tcc-muted)] sm:right-14 md:right-16">
      {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </p>
  );
}
