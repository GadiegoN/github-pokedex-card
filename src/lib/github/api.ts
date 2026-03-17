import { buildRecentActivity } from "./activity/build-recent-activity";
import { fetchGithubUserEvents } from "./fetch-github-user-events";
import { mapGithubUserToCardData } from "./mapper";
import { fetchGithubUser } from "./fetch-github-user";
import { fetchGithubUserRepos } from "./fetch-github-user-repos";
import { resolveMainLanguage } from "./resolve-main-language";
import type { GithubProfileCardData } from "./types";

export async function getGithubProfileCardData(
  username: string,
): Promise<GithubProfileCardData | null> {
  if (!username.trim()) return null;

  const user = await fetchGithubUser(username);

  if (!user) {
    return null;
  }

  const repos = await fetchGithubUserRepos(username);
  const events = await fetchGithubUserEvents(username);
  const mainLanguage = resolveMainLanguage(repos);
  const recentActivity = buildRecentActivity(events);

  return mapGithubUserToCardData(user, mainLanguage, recentActivity);
}
