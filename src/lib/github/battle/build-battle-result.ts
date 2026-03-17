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
    leftScore,
    rightScore,
    winner: getBattleWinner(leftScore, rightScore),
  };
}
