import type { GithubRepoResponse } from "./types";

export function resolveMainLanguage(repos: GithubRepoResponse[]) {
  const languages = new Map<string, number>();

  for (const repo of repos) {
    if (repo.fork || !repo.language) {
      continue;
    }

    const current = languages.get(repo.language) ?? 0;
    languages.set(repo.language, current + 1);
  }

  let mainLanguage = "";
  let highestCount = 0;

  for (const [language, count] of languages.entries()) {
    if (count > highestCount) {
      mainLanguage = language;
      highestCount = count;
    }
  }

  return mainLanguage || "Sem linguagem dominante";
}
