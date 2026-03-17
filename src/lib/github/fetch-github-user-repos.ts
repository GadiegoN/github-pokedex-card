import type { GithubRepoResponse } from "./types";
import { fetchGithubJson } from "./fetch-github-json";

export async function fetchGithubUserRepos(username: string) {
  const repos = await fetchGithubJson<GithubRepoResponse[]>(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
  );

  return repos ?? [];
}
