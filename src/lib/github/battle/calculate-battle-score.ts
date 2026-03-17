import type { GithubBattleMetricResult } from "./types";

export function calculateBattleScore(
  metrics: GithubBattleMetricResult[],
  side: "left" | "right",
) {
  return metrics.reduce((score, metric) => {
    if (metric.winner === side) {
      return score + 1;
    }

    if (metric.winner === "tie") {
      return score + 0.5;
    }

    return score;
  }, 0);
}
