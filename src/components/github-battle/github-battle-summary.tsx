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

      <div className="mt-4 grid gap-3">
        {result.metrics.map((metric) => (
          <GithubBattleMetricRow key={metric.key} metric={metric} />
        ))}
      </div>
    </div>
  );
}
