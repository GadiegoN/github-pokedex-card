import { formatCompactNumber } from "@/lib/utils/format-number";
import type { GithubBattleMetricResult } from "@/lib/github/battle/types";
import { cn } from "@/lib/utils/cn";

type Props = {
  metric: GithubBattleMetricResult;
};

function getSideClassName(isWinner: boolean) {
  return cn(
    "rounded-2xl px-3 py-2 text-center text-lg font-black transition-colors duration-300",
    isWinner
      ? "bg-foreground text-background"
      : "bg-surface-overlay-strong text-text-soft",
  );
}

export function GithubBattleMetricRow({ metric }: Props) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)] items-center gap-3 rounded-3xl bg-surface-glass p-3">
      <div className={getSideClassName(metric.winner === "left")}>
        {formatCompactNumber(metric.leftValue)}
      </div>
      <div className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-text-muted">
          {metric.label}
        </p>
      </div>
      <div className={getSideClassName(metric.winner === "right")}>
        {formatCompactNumber(metric.rightValue)}
      </div>
    </div>
  );
}
