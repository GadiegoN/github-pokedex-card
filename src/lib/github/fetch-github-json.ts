export async function fetchGithubJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error("Falha ao buscar dados no GitHub.");
  }

  return (await response.json()) as T;
}
