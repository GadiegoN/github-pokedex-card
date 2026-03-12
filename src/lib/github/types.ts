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
};
