export type GithubUserResponse = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type GithubRepoResponse = {
  language: string | null;
  fork: boolean;
};

export type GithubUserEventResponse = {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
};

export type GithubCardRarity = "common" | "rare" | "epic" | "legendary";

export type GithubCardType =
  | "electric"
  | "steel"
  | "rock"
  | "psychic"
  | "fire";

export type GithubProfileStat = {
  label: string;
  value: number;
};

export type GithubRecentActivity = {
  eventsLast30Days: number;
  pushEventsLast30Days: number;
  activeReposLast30Days: number;
};

export type GithubProfileCardData = {
  username: string;
  displayName: string;
  avatarUrl: string;
  profileUrl: string;
  bio: string;
  location: string;
  company: string;
  website: string;
  publicRepos: number;
  followers: number;
  following: number;
  yearsOnGithub: number;
  level: number;
  rarity: GithubCardRarity;
  cardType: GithubCardType;
  mainLanguage: string;
  recentActivity: GithubRecentActivity;
  stats: GithubProfileStat[];
};
