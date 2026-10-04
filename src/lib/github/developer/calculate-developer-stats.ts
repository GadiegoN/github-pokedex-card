import type { DeveloperProfile, DeveloperStats } from "./types";

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function logarithmicScore(value: number, reference: number): number {
  if (value <= 0) {
    return 0;
  }

  return clampScore((Math.log1p(value) / Math.log1p(reference)) * 100);
}

export function calculateDeveloperStats(
  profile: DeveloperProfile,
): DeveloperStats {
  const ownedRepositories = profile.repositories.filter(
    (repository) => !repository.isFork,
  );
  const languages = new Set(
    ownedRepositories
      .map((repository) => repository.language)
      .filter((language): language is string => Boolean(language)),
  );
  const followers = Math.max(0, profile.followers);
  const following = Math.max(0, profile.following);
  const yearsOnGithub = Math.max(0, profile.yearsOnGithub);
  const recentEvents = Math.max(0, profile.recentActivity.eventsLast30Days);
  const activeRepositories = Math.max(
    0,
    profile.recentActivity.activeReposLast30Days,
  );

  return {
    coding: clampScore(ownedRepositories.length * 2 + languages.size * 10),
    experience: clampScore(yearsOnGithub * 5 + ownedRepositories.length * 0.75),
    knowledge: clampScore(languages.size * 12 + ownedRepositories.length * 0.5),
    social: clampScore(
      logarithmicScore(followers, 5000) * 0.8 +
        logarithmicScore(following, 1000) * 0.2,
    ),
    consistency: clampScore(recentEvents * 2.5 + activeRepositories * 5),
  };
}
