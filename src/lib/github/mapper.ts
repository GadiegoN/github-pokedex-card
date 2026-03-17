import type {
  GithubProfileCardData,
  GithubRecentActivity,
  GithubUserResponse,
} from "./types";
import { buildProfileStats } from "./card/build-profile-stats";
import { calculateProfileLevel } from "./card/calculate-profile-level";
import { calculateYearsOnGithub } from "./card/calculate-years-on-github";
import { getCardRarity } from "./card/get-card-rarity";
import { getCardType } from "./card/get-card-type";

export function mapGithubUserToCardData(
  user: GithubUserResponse,
  mainLanguage: string,
  recentActivity: GithubRecentActivity,
): GithubProfileCardData {
  const yearsOnGithub = calculateYearsOnGithub(user.created_at);
  const level = calculateProfileLevel({
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    yearsOnGithub,
  });
  const rarity = getCardRarity({
    level,
    followers: user.followers,
    publicRepos: user.public_repos,
    yearsOnGithub,
  });
  const cardType = getCardType({
    followers: user.followers,
    publicRepos: user.public_repos,
    yearsOnGithub,
    hasBio: Boolean(user.bio),
    hasWebsite: Boolean(user.blog),
  });
  const stats = buildProfileStats({
    level,
    followers: user.followers,
    publicRepos: user.public_repos,
    following: user.following,
    yearsOnGithub,
    eventsLast30Days: recentActivity.eventsLast30Days,
    pushEventsLast30Days: recentActivity.pushEventsLast30Days,
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
    level,
    rarity,
    cardType,
    mainLanguage,
    recentActivity,
    stats,
  };
}
