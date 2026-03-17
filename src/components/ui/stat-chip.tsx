type Props = {
  label: string;
  value: string;
};

export function StatChip({ label, value }: Props) {
  return (
    <div className="rounded-2xl bg-black/10 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-black/14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-black/55">
        {label}
      </p>
      <p className="mt-1 text-lg font-black text-black">{value}</p>
    </div>
  );
}
