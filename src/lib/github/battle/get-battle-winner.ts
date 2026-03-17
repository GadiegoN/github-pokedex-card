import type { GithubBattleWinner } from "./types";

export function getBattleWinner(leftValue: number, rightValue: number) {
  if (leftValue === rightValue) {
    return "tie" satisfies GithubBattleWinner;
  }

  return leftValue > rightValue ? "left" : "right";
}
