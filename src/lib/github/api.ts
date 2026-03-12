import { mapGithubUserToCardData } from "./mapper";
import type { GithubProfileCardData, GithubUserResponse } from "./types";

export async function getGithubProfileCardData(
  username: string,
): Promise<GithubProfileCardData | null> {
  if (!username.trim()) return null;

  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error("Falha ao buscar perfil no GitHub.");
  }

  const data = (await response.json()) as GithubUserResponse;

  return mapGithubUserToCardData(data);
}
