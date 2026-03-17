import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GithubCardPageContent } from "@/app/_components/github-card-page-content";
import { getGithubProfileCardData } from "@/lib/github/api";

type PageProps = {
  params: Promise<{
    username: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = await params;

  return {
    title: `Card de ${username}`,
    description: `Veja e compartilhe o card estilizado do perfil ${username} no GitHub.`,
  };
}

export default async function CardByUsernamePage({ params }: PageProps) {
  const { username } = await params;
  const normalizedUsername = username.trim();

  if (!normalizedUsername) {
    notFound();
  }

  const profile = await getGithubProfileCardData(normalizedUsername);

  if (!profile) {
    notFound();
  }

  return (
    <GithubCardPageContent
      profile={profile}
      initialUsername={normalizedUsername}
    />
  );
}
