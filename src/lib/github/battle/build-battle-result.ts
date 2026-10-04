import { buildBattleMetrics } from "./build-battle-metrics";
import { calculateBattleScore } from "./calculate-battle-score";
import { getBattleWinner } from "./get-battle-winner";
import type { GithubBattleResult } from "./types";
import type { GithubProfileCardData } from "../types";

export function buildBattleResult(
  leftProfile: GithubProfileCardData,
  rightProfile: GithubProfileCardData,
): GithubBattleResult {
  const metrics = buildBattleMetrics(leftProfile, rightProfile);
  const leftScore = calculateBattleScore(metrics, "left");
  const rightScore = calculateBattleScore(metrics, "right");

  return {
    leftProfile,
    rightProfile,
    metrics,
    classComparison: {
      leftClass: leftProfile.developerClass.name,
      rightClass: rightProfile.developerClass.name,
      isSameClass:
        leftProfile.developerClass.id === rightProfile.developerClass.id,
    },
    languageComparison: buildLanguageComparison(leftProfile, rightProfile),
    leftScore,
    rightScore,
    winner: getBattleWinner(leftScore, rightScore),
  };
}

function buildLanguageComparison(
  leftProfile: GithubProfileCardData,
  rightProfile: GithubProfileCardData,
) {
  const leftLanguages = new Set(leftProfile.languages.map(({ name }) => name));
  const rightLanguages = new Set(
    rightProfile.languages.map(({ name }) => name),
  );

  return {
    shared: [...leftLanguages].filter((language) =>
      rightLanguages.has(language),
    ),
    leftOnly: [...leftLanguages].filter(
      (language) => !rightLanguages.has(language),
    ),
    rightOnly: [...rightLanguages].filter(
      (language) => !leftLanguages.has(language),
    ),
  };
}
