type Props = {
  label: string;
  value: string;
  textStrong: string;
  textMuted: string;
};

export function OgCardStat({
  label,
  value,
  textStrong,
  textMuted,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        borderRadius: 24,
        background: "rgba(0, 0, 0, 0.08)",
        padding: "18px 20px",
      }}
    >
      <span
        style={{
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: textMuted,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 34,
          fontWeight: 900,
          color: textStrong,
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    </div>
  );
}
