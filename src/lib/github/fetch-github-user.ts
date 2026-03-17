import type { GithubUserResponse } from "./types";
import { fetchGithubJson } from "./fetch-github-json";

export async function fetchGithubUser(username: string) {
  return fetchGithubJson<GithubUserResponse>(
    `https://api.github.com/users/${username}`,
  );
}
