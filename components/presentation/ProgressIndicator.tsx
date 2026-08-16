"use client";

type ProgressIndicatorProps = {
  current: number;
  total: number;
};

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-1.5 bg-[var(--tcc-line)]"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label="Progression de la présentation"
    >
      <div
        className="h-full origin-left transition-[width] duration-300 ease-out"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, var(--tcc-blue), var(--tcc-yellow), var(--tcc-pink))",
        }}
      />
    </div>
  );
}
