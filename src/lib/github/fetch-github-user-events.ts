import type { GithubUserEventResponse } from "./types";
import { fetchGithubJson } from "./fetch-github-json";

export async function fetchGithubUserEvents(username: string) {
  const events = await fetchGithubJson<GithubUserEventResponse[]>(
    `https://api.github.com/users/${username}/events/public?per_page=100`,
  );

  return events ?? [];
}
