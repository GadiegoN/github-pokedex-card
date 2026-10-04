import type { DeveloperLevel, DeveloperProfile } from "./types";

function getLevelTitle(level: number): string {
  if (level <= 10) return "Novice";
  if (level <= 20) return "Apprentice";
  if (level <= 30) return "Adventurer";
  if (level <= 40) return "Veteran";
  if (level <= 50) return "Elite";
  return "Legendary";
}

export function calculateTotalDeveloperXp(profile: DeveloperProfile): number {
  const ownedRepositories = profile.repositories.filter(
    (repository) => !repository.isFork,
  );
  const stars = ownedRepositories.reduce(
    (total, repository) => total + Math.max(0, repository.stars),
    0,
  );
  const forks = ownedRepositories.reduce(
    (total, repository) => total + Math.max(0, repository.forks),
    0,
  );
  const languages = new Set(
    ownedRepositories
      .map((repository) => repository.language)
      .filter((language): language is string => Boolean(language)),
  );

  return Math.floor(
    Math.max(0, profile.publicRepos) * 100 +
      stars * 20 +
      forks * 10 +
      Math.max(0, profile.followers) * 5 +
      Math.max(0, profile.yearsOnGithub) * 100 +
      Math.max(0, profile.recentActivity.pushEventsLast30Days) * 20 +
      Math.max(0, profile.recentActivity.activeReposLast30Days) * 30 +
      languages.size * 50,
  );
}

export function calculateDeveloperLevel(
  profile: DeveloperProfile,
): DeveloperLevel {
  const totalXp = calculateTotalDeveloperXp(profile);
  let remainingXp = totalXp;
  let level = 1;
  let xpForNextLevel = 1000 + level * 250;

  while (remainingXp >= xpForNextLevel) {
    remainingXp -= xpForNextLevel;
    level += 1;
    xpForNextLevel = 1000 + level * 250;
  }

  return {
    level,
    title: getLevelTitle(level),
    totalXp,
    xpIntoLevel: remainingXp,
    xpForNextLevel,
    progress: Math.floor((remainingXp / xpForNextLevel) * 100),
  };
}
