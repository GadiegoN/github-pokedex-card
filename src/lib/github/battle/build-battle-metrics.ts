import { getBattleMetricValue } from "./get-battle-metric-value";
import { getBattleWinner } from "./get-battle-winner";
import type { GithubBattleMetricKey, GithubBattleMetricResult } from "./types";
import type { GithubProfileCardData } from "../types";

const metricLabels: Record<GithubBattleMetricKey, string> = {
  level: "Level",
  followers: "Followers",
  publicRepos: "Repos",
  yearsOnGithub: "Anos",
  power: "Power",
};

const metricOrder: GithubBattleMetricKey[] = [
  "level",
  "followers",
  "publicRepos",
  "yearsOnGithub",
  "power",
];

export function buildBattleMetrics(
  leftProfile: GithubProfileCardData,
  rightProfile: GithubProfileCardData,
): GithubBattleMetricResult[] {
  return metricOrder.map((key) => {
    const leftValue = getBattleMetricValue(leftProfile, key);
    const rightValue = getBattleMetricValue(rightProfile, key);

    return {
      key,
      label: metricLabels[key],
      leftValue,
      rightValue,
      winner: getBattleWinner(leftValue, rightValue),
    };
  });
}
