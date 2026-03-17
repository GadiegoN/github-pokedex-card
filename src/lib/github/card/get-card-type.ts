import type { GithubCardType } from "../types";

type Params = {
  followers: number;
  publicRepos: number;
  yearsOnGithub: number;
  hasBio: boolean;
  hasWebsite: boolean;
};

export function getCardType({
  followers,
  publicRepos,
  yearsOnGithub,
  hasBio,
  hasWebsite,
}: Params): GithubCardType {
  if (followers >= 300) return "electric";
  if (publicRepos >= 80) return "steel";
  if (yearsOnGithub >= 10) return "rock";
  if (hasBio && hasWebsite) return "psychic";

  return "fire";
}
