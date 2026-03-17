import type { GithubProfileCardData } from "../types";

export type GithubBattleMetricKey =
  | "level"
  | "followers"
  | "publicRepos"
  | "yearsOnGithub"
  | "power";

export type GithubBattleWinner = "left" | "right" | "tie";

export type GithubBattleMetricResult = {
  key: GithubBattleMetricKey;
  label: string;
  leftValue: number;
  rightValue: number;
  winner: GithubBattleWinner;
};

export type GithubBattleResult = {
  leftProfile: GithubProfileCardData;
  rightProfile: GithubProfileCardData;
  metrics: GithubBattleMetricResult[];
  leftScore: number;
  rightScore: number;
  winner: GithubBattleWinner;
};
