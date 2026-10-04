import type { GithubBattleResult } from "@/lib/github/battle/types";
import { GithubBattleMetricRow } from "./github-battle-metric-row";

type Props = {
  result: GithubBattleResult;
};

export function GithubBattleSummary({ result }: Props) {
  return (
    <div className="rounded-4xl border border-border/70 bg-surface-glass-strong p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
          Comparativo
        </p>
        <p className="text-sm font-semibold text-text-muted">
          @{result.leftProfile.username} vs @{result.rightProfile.username}
        </p>
      </div>

      <section
        className="mt-4 rounded-3xl bg-surface-glass p-4"
        aria-label="Comparação de classes e linguagens"
      >
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
          Especialidades
        </h3>
        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
          <p className="truncate text-sm font-bold text-text-strong">
            {result.classComparison.leftClass}
          </p>
          <span className="text-xs text-text-muted">
            {result.classComparison.isSameClass
              ? "mesma classe"
              : "classes diferentes"}
          </span>
          <p className="truncate text-right text-sm font-bold text-text-strong">
            {result.classComparison.rightClass}
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="font-semibold text-text-muted">
              @{result.leftProfile.username}
            </p>
            <p className="mt-1 leading-5 text-text-soft">
              {result.languageComparison.leftOnly.length
                ? `Exclusivas: ${result.languageComparison.leftOnly.join(", ")}`
                : "Sem linguagens exclusivas"}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-text-muted">
              @{result.rightProfile.username}
            </p>
            <p className="mt-1 leading-5 text-text-soft">
              {result.languageComparison.rightOnly.length
                ? `Exclusivas: ${result.languageComparison.rightOnly.join(", ")}`
                : "Sem linguagens exclusivas"}
            </p>
          </div>
        </div>
        <p className="mt-2 text-xs leading-5 text-text-muted">
          Em comum:{" "}
          {result.languageComparison.shared.length
            ? result.languageComparison.shared.join(", ")
            : "nenhuma das linguagens mais frequentes"}
        </p>
      </section>

      <div className="mt-4 grid gap-3">
        {result.metrics.map((metric) => (
          <GithubBattleMetricRow key={metric.key} metric={metric} />
        ))}
      </div>
    </div>
  );
}
