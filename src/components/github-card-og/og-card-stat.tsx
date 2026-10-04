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
        flex: 1,
        minWidth: 0,
        gap: 6,
        borderRadius: 24,
        background: "rgba(0, 0, 0, 0.08)",
        padding: "12px 14px",
      }}
    >
      <span
        style={{
          fontSize: 12,
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
          fontSize: 24,
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
