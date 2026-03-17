type Props = {
  label: string;
  value: string;
};

export function OgCardStat({ label, value }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        borderRadius: 24,
        background: "rgba(0, 0, 0, 0.1)",
        padding: "18px 20px",
      }}
    >
      <span
        style={{
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(0, 0, 0, 0.55)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 34,
          fontWeight: 900,
          color: "#111111",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
    </div>
  );
}
