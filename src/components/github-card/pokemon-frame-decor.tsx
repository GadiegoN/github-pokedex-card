export function PokemonFrameDecor() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-white/35 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 top-14 size-28 rounded-full bg-white/18 blur-2xl" />
      <div className="pointer-events-none absolute -left-10 bottom-10 size-32 rounded-full bg-black/8 blur-3xl" />
      <div className="pokemon-frame-shine pointer-events-none absolute inset-0 opacity-70" />
    </>
  );
}
