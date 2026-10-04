import type {
  GithubRepoResponse,
  GithubProfileCardData,
  GithubRecentActivity,
  GithubUserResponse,
} from "./types";
import { calculateYearsOnGithub } from "./card/calculate-years-on-github";
import { getCardType } from "./card/get-card-type";
import { buildDeveloperLanguages } from "./developer/build-developer-languages";
import { calculateDeveloperLevel } from "./developer/calculate-developer-level";
import { calculateDeveloperRarity } from "./developer/calculate-developer-rarity";
import { calculateDeveloperStats } from "./developer/calculate-developer-stats";
import { determineDeveloperClass } from "./developer/determine-developer-class";
import type { DeveloperProfile } from "./developer/types";

export function mapGithubUserToCardData(
  user: GithubUserResponse,
  repositories: GithubRepoResponse[],
  recentActivity: GithubRecentActivity,
): GithubProfileCardData {
  const yearsOnGithub = calculateYearsOnGithub(user.created_at);
  const developerProfile: DeveloperProfile = {
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    yearsOnGithub,
    repositories: repositories.map((repository) => ({
      language: repository.language,
      isFork: repository.fork,
      stars: repository.stargazers_count ?? 0,
      forks: repository.forks_count ?? 0,
      name: repository.name,
      description: repository.description,
      topics: repository.topics,
    })),
    recentActivity,
  };
  const developerLevel = calculateDeveloperLevel(developerProfile);
  const developerStats = calculateDeveloperStats(developerProfile);
  const developerClass = determineDeveloperClass(developerProfile);
  const rarity = calculateDeveloperRarity(developerProfile, developerStats);
  const languages = buildDeveloperLanguages(developerProfile);
  const mainLanguage = languages[0]?.name ?? "Sem linguagem dominante";
  const ownedRepositories = developerProfile.repositories.filter(
    (repository) => !repository.isFork,
  );
  const cardType = getCardType({
    followers: user.followers,
    publicRepos: user.public_repos,
    yearsOnGithub,
    hasBio: Boolean(user.bio),
    hasWebsite: Boolean(user.blog),
  });

  return {
    username: user.login,
    displayName: user.name ?? user.login,
    avatarUrl: user.avatar_url,
    profileUrl: user.html_url,
    bio: user.bio ?? "Perfil sem bio cadastrada.",
    location: user.location ?? "Local não informado",
    company: user.company ?? "Independente",
    website: user.blog ?? "",
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    yearsOnGithub,
    level: developerLevel.level,
    rarity,
    developerLevel,
    developerClass,
    developerStats,
    languages,
    analyzedRepositories: ownedRepositories.length,
    starsReceived: ownedRepositories.reduce(
      (total, repository) => total + repository.stars,
      0,
    ),
    forksReceived: ownedRepositories.reduce(
      (total, repository) => total + repository.forks,
      0,
    ),
    cardType,
    mainLanguage,
    recentActivity,
  };
}
