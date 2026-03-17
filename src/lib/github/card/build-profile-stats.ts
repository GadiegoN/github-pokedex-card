import type { GithubProfileStat } from "../types";

type Params = {
  level: number;
  followers: number;
  publicRepos: number;
  following: number;
  yearsOnGithub: number;
};

export function buildProfileStats({
  level,
  followers,
  publicRepos,
  following,
  yearsOnGithub,
}: Params): GithubProfileStat[] {
  const influence = followers * 3 + level;
  const consistency = yearsOnGithub * 18 + following * 2;
  const explorer = publicRepos * 4 + following;

  return [
    { label: "Power", value: level * 125 },
    { label: "Influence", value: influence },
    { label: "Consistency", value: consistency },
    { label: "Explorer", value: explorer },
  ];
}
