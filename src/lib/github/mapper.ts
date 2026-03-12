import type { GithubProfileCardData, GithubUserResponse } from "./types";

export function mapGithubUserToCardData(
  user: GithubUserResponse,
): GithubProfileCardData {
  const createdYear = new Date(user.created_at).getFullYear();
  const currentYear = new Date().getFullYear();
  const yearsOnGithub = Math.max(1, currentYear - createdYear);

  const level = Math.max(
    1,
    Math.floor(
      user.public_repos * 0.7 +
        user.followers * 0.2 +
        yearsOnGithub * 2 +
        user.following * 0.05,
    ),
  );

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
  };
}
