import type {
  DeveloperProfile,
  DeveloperRarity,
  DeveloperStats,
} from "./types";

export function calculateDeveloperRarity(
  profile: DeveloperProfile,
  stats: DeveloperStats,
): DeveloperRarity {
  const ownedRepositories = profile.repositories.filter(
    (repository) => !repository.isFork,
  );
  const starsAndForks = ownedRepositories.reduce(
    (total, repository) =>
      total + Math.max(0, repository.stars) + Math.max(0, repository.forks) * 2,
    0,
  );
  const openSourceReach = Math.min(
    100,
    (Math.log1p(starsAndForks) / Math.log1p(1000)) * 100,
  );
  const score =
    stats.coding * 0.25 +
    stats.experience * 0.2 +
    stats.knowledge * 0.2 +
    stats.social * 0.1 +
    stats.consistency * 0.15 +
    openSourceReach * 0.1;

  if (score >= 85) return "legendary";
  if (score >= 70) return "epic";
  if (score >= 52) return "rare";
  if (score >= 32) return "uncommon";
  return "common";
}
