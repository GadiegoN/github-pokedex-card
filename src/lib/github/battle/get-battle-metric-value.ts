import type { GithubBattleMetricKey } from "./types";
import type { GithubProfileCardData } from "../types";

export function getBattleMetricValue(
  profile: GithubProfileCardData,
  key: GithubBattleMetricKey,
) {
  if (key === "xp") {
    return profile.developerLevel.totalXp;
  }

  if (key === "rarity") {
    const rarityScores = {
      common: 1,
      uncommon: 2,
      rare: 3,
      epic: 4,
      legendary: 5,
    } as const;
    return rarityScores[profile.rarity];
  }

  if (
    key === "coding" ||
    key === "experience" ||
    key === "knowledge" ||
    key === "social" ||
    key === "consistency"
  ) {
    return profile.developerStats[key];
  }

  if (key === "languageCount") {
    return profile.languages.length;
  }

  if (key === "power") {
    return profile.level * 125;
  }

  return profile[key];
}
