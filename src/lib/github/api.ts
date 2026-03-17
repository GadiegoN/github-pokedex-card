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
  const mainLanguage = resolveMainLanguage(repos);

  return mapGithubUserToCardData(user, mainLanguage);
}
