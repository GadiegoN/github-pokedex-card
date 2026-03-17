import type { GithubProfileStat } from "../types";

type Params = {
  level: number;
  followers: number;
  publicRepos: number;
  following: number;
  yearsOnGithub: number;
  eventsLast30Days: number;
  pushEventsLast30Days: number;
};

export function buildProfileStats({
  level,
  followers,
  publicRepos,
  following,
  yearsOnGithub,
  eventsLast30Days,
  pushEventsLast30Days,
}: Params): GithubProfileStat[] {
  const influence = followers * 3 + level;
  const consistency = yearsOnGithub * 18 + following * 2;
  const explorer = publicRepos * 4 + following;
  const activity = eventsLast30Days * 14 + pushEventsLast30Days * 24;

  return [
    { label: "Influence", value: influence },
    { label: "Consistency", value: consistency },
    { label: "Activity", value: activity },
    { label: "Explorer", value: explorer },
    { label: "Power", value: level * 125 },
  ];
}
