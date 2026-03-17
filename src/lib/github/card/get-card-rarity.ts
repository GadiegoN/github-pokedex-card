import type { GithubCardRarity } from "../types";

type Params = {
  level: number;
  followers: number;
  publicRepos: number;
  yearsOnGithub: number;
};

export function getCardRarity({
  level,
  followers,
  publicRepos,
  yearsOnGithub,
}: Params): GithubCardRarity {
  const score =
    level + followers * 0.45 + publicRepos * 0.9 + yearsOnGithub * 6;

  if (score >= 420) return "legendary";
  if (score >= 220) return "epic";
  if (score >= 90) return "rare";

  return "common";
}
