import { getBattleMetricValue } from "./get-battle-metric-value";
import { getBattleWinner } from "./get-battle-winner";
import type { GithubBattleMetricKey, GithubBattleMetricResult } from "./types";
import type { GithubProfileCardData } from "../types";

const metricLabels: Record<GithubBattleMetricKey, string> = {
  level: "Level",
  xp: "XP",
  rarity: "Raridade",
  coding: "Código",
  experience: "Experiência",
  knowledge: "Conhecimento",
  social: "Social",
  consistency: "Consistência",
  languageCount: "Linguagens",
  followers: "Followers",
  publicRepos: "Repos",
  yearsOnGithub: "Anos",
  power: "Power",
};

const metricOrder: GithubBattleMetricKey[] = [
  "level",
  "xp",
  "rarity",
  "coding",
  "experience",
  "knowledge",
  "social",
  "consistency",
  "languageCount",
  "followers",
  "publicRepos",
  "yearsOnGithub",
  "power",
];

function getDisplayValue(
  profile: GithubProfileCardData,
  key: GithubBattleMetricKey,
): string | undefined {
  if (key !== "rarity") {
    return undefined;
  }

  const rarityLabels = {
    common: "Common",
    uncommon: "Uncommon",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
  } as const;

  return rarityLabels[profile.rarity];
}

function getScoreWeight(key: GithubBattleMetricKey): number {
  if (key === "level" || key === "xp" || key === "power") {
    return 1 / 3;
  }

  if (
    key === "coding" ||
    key === "experience" ||
    key === "knowledge" ||
    key === "social" ||
    key === "consistency"
  ) {
    return 1 / 5;
  }

  return 1;
}

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
      leftDisplayValue: getDisplayValue(leftProfile, key),
      rightDisplayValue: getDisplayValue(rightProfile, key),
      scoreWeight: getScoreWeight(key),
      winner: getBattleWinner(leftValue, rightValue),
    };
  });
}
