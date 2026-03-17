import { GithubProfileCard } from "@/components/github-card/github-profile-card";
import type { GithubBattleResult } from "@/lib/github/battle/types";

type Props = {
  result: GithubBattleResult;
};

export function GithubBattlePreview({ result }: Props) {
  return (
    <div
      id="github-battle-export"
      className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
    >
      <GithubProfileCard data={result.leftProfile} />
      <GithubProfileCard data={result.rightProfile} />
    </div>
  );
}
