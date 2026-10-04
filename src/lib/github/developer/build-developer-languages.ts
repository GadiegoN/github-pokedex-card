import type { DeveloperLanguage, DeveloperProfile } from "./types";

export function buildDeveloperLanguages(
  profile: DeveloperProfile,
  limit = 5,
): DeveloperLanguage[] {
  const counts = new Map<string, number>();

  for (const repository of profile.repositories) {
    if (repository.isFork || !repository.language) {
      continue;
    }

    counts.set(
      repository.language,
      (counts.get(repository.language) ?? 0) + 1,
    );
  }

  const totalRepositories = [...counts.values()].reduce(
    (total, count) => total + count,
    0,
  );

  if (totalRepositories === 0) {
    return [];
  }

  return [...counts.entries()]
    .sort(([leftName, leftCount], [rightName, rightCount]) => {
      return rightCount - leftCount || leftName.localeCompare(rightName);
    })
    .slice(0, Math.max(0, limit))
    .map(([name, repositoryCount]) => ({
      name,
      repositoryCount,
      percentage: Math.round((repositoryCount / totalRepositories) * 100),
    }));
}
