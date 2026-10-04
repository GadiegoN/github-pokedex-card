import { StatChip } from "@/components/ui/stat-chip";
import { formatCompactNumber } from "@/lib/utils/format-number";
import type { GithubProfileCardData } from "@/lib/github/types";

type Props = {
  data: GithubProfileCardData;
};

export function GithubProfileCardGithubStats({ data }: Props) {
  return (
    <section
      className="mt-3"
      aria-label="Estatísticas públicas do GitHub"
      title={`A API retornou ${data.returnedRepositories} repositórios. ${data.analyzedRepositories} deles são próprios e usados para calcular linguagens e stars.`}
    >
      <h3 className="sr-only">Estatísticas do GitHub</h3>
      <div className="grid grid-cols-2 gap-2">
        <StatChip
          label="Repos públicos"
          value={formatCompactNumber(data.publicRepos)}
        />
        <StatChip
          label="Seguidores"
          value={formatCompactNumber(data.followers)}
        />
        <StatChip
          label="Stars analisadas"
          value={formatCompactNumber(data.starsReceived)}
        />
        <StatChip
          label="Atividade · 30 dias"
          value={formatCompactNumber(data.recentActivity.eventsLast30Days)}
        />
      </div>
      <p className="mt-2 text-center text-[9px] leading-4 text-text-muted">
        {data.analyzedRepositories} próprios analisados de{" "}
        {data.returnedRepositories} retornados (até 100) entre{" "}
        {data.publicRepos} públicos. Linguagens e stars usam essa amostra;
        atividade usa eventos públicos recentes.
      </p>
    </section>
  );
}
