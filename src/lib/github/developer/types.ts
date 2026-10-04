import type { GithubRecentActivity } from "../types";

export type DeveloperStats = {
  coding: number;
  experience: number;
  knowledge: number;
  social: number;
  consistency: number;
};

export type DeveloperLevel = {
  level: number;
  title: string;
  totalXp: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  progress: number;
};

export type DeveloperRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary";

export type DeveloperClassId =
  | "open-source-paladin"
  | "ai-alchemist"
  | "data-mage"
  | "devops-engineer"
  | "mobile-ranger"
  | "full-stack-adventurer"
  | "frontend-knight"
  | "backend-guardian"
  | "code-wizard";

export type DeveloperClass = {
  id: DeveloperClassId;
  name: string;
  description: string;
  icon: "heart-handshake" | "brain" | "chart-no-axes-combined" | "terminal" | "smartphone" | "layers" | "layout" | "server" | "code";
  criteria: string[];
  score: number;
};

export type DeveloperLanguage = {
  name: string;
  repositoryCount: number;
  percentage: number;
};

export type DeveloperRepository = {
  language: string | null;
  isFork: boolean;
  stars: number;
  forks: number;
  name?: string;
  description?: string | null;
  topics?: string[];
};

export type DeveloperProfile = {
  publicRepos: number;
  followers: number;
  following: number;
  yearsOnGithub: number;
  repositories: DeveloperRepository[];
  recentActivity: GithubRecentActivity;
};
