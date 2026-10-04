import type {
  DeveloperClass,
  DeveloperLanguage,
  DeveloperLevel,
  DeveloperRarity,
  DeveloperStats,
} from "./developer/types";

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
  name?: string;
  description?: string | null;
  topics?: string[];
  stargazers_count?: number;
  forks_count?: number;
};

export type GithubUserEventResponse = {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
};

export type GithubCardRarity = DeveloperRarity;

export type GithubCardType =
  | "electric"
  | "steel"
  | "rock"
  | "psychic"
  | "fire";

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
  developerLevel: DeveloperLevel;
  developerClass: DeveloperClass;
  developerStats: DeveloperStats;
  languages: DeveloperLanguage[];
  analyzedRepositories: number;
  starsReceived: number;
  forksReceived: number;
  cardType: GithubCardType;
  mainLanguage: string;
  recentActivity: GithubRecentActivity;
};
