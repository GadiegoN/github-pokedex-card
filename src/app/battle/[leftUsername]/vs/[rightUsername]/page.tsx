import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GithubBattlePageContent } from "@/app/_components/github-battle-page-content";
import { buildBattleResult } from "@/lib/github/battle/build-battle-result";
import { getGithubProfileCardData } from "@/lib/github/api";

type PageProps = {
  params: Promise<{
    leftUsername: string;
    rightUsername: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { leftUsername, rightUsername } = await params;

  return {
    title: `${leftUsername} vs ${rightUsername}`,
    description: `Compare ${leftUsername} e ${rightUsername} em um duelo de GitHub cards.`,
  };
}

export default async function BattlePage({ params }: PageProps) {
  const { leftUsername, rightUsername } = await params;
  const normalizedLeft = leftUsername.trim();
  const normalizedRight = rightUsername.trim();

  if (!normalizedLeft || !normalizedRight) {
    notFound();
  }

  const [leftProfile, rightProfile] = await Promise.all([
    getGithubProfileCardData(normalizedLeft),
    getGithubProfileCardData(normalizedRight),
  ]);

  if (!leftProfile || !rightProfile) {
    notFound();
  }

  const result = buildBattleResult(leftProfile, rightProfile);

  return <GithubBattlePageContent result={result} />;
}
