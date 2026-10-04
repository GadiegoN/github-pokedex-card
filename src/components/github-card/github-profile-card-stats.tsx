import type { DeveloperStats } from "@/lib/github/developer/types";

type Props = {
  stats: DeveloperStats;
};

const statRows = [
  {
    key: "coding",
    label: "Código",
    explanation: "Repositórios próprios analisados e linguagens distintas.",
  },
  {
    key: "experience",
    label: "Experiência",
    explanation: "Tempo desde a criação da conta e repositórios próprios.",
  },
  {
    key: "knowledge",
    label: "Conhecimento",
    explanation: "Diversidade de linguagens e repositórios próprios.",
  },
  {
    key: "social",
    label: "Social",
    explanation:
      "Seguidores e pessoas que o perfil acompanha, com escala logarítmica.",
  },
  {
    key: "consistency",
    label: "Consistência",
    explanation:
      "Eventos públicos e repositórios ativos observados nos últimos 30 dias.",
  },
] as const satisfies ReadonlyArray<{
  key: keyof DeveloperStats;
  label: string;
  explanation: string;
}>;

export function GithubProfileCardStats({ stats }: Props) {
  return (
    <section
      className="rounded-3xl bg-surface-glass-strong p-3"
      aria-label="Atributos do personagem"
    >
      <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-text-muted">
        Atributos
      </h3>
      <div className="mt-2 grid gap-2">
        {statRows.map(({ key, label, explanation }) => {
          const value = stats[key];

          return (
            <div
              key={key}
              className="grid gap-1"
              title={explanation}
              aria-label={`${label}: ${value} de 100. ${explanation}`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="truncate text-[10px] font-semibold text-text-soft">
                  {label}
                </span>
                <span className="text-[10px] font-black tabular-nums text-text-strong">
                  {value}
                </span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-surface-overlay-strong"
                role="progressbar"
                aria-label={label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
              >
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
