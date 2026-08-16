export function TricolorRail() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 z-40 flex w-3"
    >
      <span className="h-full w-1 bg-[var(--tcc-pink)]" />
      <span className="h-full w-1 bg-[var(--tcc-yellow)]" />
      <span className="h-full w-1 bg-[var(--tcc-blue)]" />
    </div>
  );
}
