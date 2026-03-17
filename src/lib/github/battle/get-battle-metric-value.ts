import type { GithubBattleMetricKey } from "./types";
import type { GithubProfileCardData } from "../types";

export function getBattleMetricValue(
  profile: GithubProfileCardData,
  key: GithubBattleMetricKey,
) {
  if (key === "power") {
    return profile.level * 125;
  }

  return profile[key];
}
