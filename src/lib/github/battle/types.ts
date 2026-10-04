import type { GithubProfileCardData } from "../types";

export type GithubBattleMetricKey =
  | "level"
  | "xp"
  | "rarity"
  | "coding"
  | "experience"
  | "knowledge"
  | "social"
  | "consistency"
  | "languageCount"
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
  leftDisplayValue?: string;
  rightDisplayValue?: string;
  scoreWeight: number;
  winner: GithubBattleWinner;
};

export type GithubBattleResult = {
  leftProfile: GithubProfileCardData;
  rightProfile: GithubProfileCardData;
  metrics: GithubBattleMetricResult[];
  classComparison: {
    leftClass: string;
    rightClass: string;
    isSameClass: boolean;
  };
  languageComparison: {
    shared: string[];
    leftOnly: string[];
    rightOnly: string[];
  };
  leftScore: number;
  rightScore: number;
  winner: GithubBattleWinner;
};
