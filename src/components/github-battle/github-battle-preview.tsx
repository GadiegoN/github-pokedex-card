import { GithubProfileCard } from "@/components/github-card/github-profile-card";
import type { GithubBattleResult } from "@/lib/github/battle/types";

type Props = {
  result: GithubBattleResult;
};

function GithubBattleExportContent({ result }: Props) {
  return (
    <div id="github-battle-export" className="grid w-[860px] grid-cols-2 gap-6">
      <GithubProfileCard data={result.leftProfile} />
      <GithubProfileCard data={result.rightProfile} />
    </div>
  );
}

export function GithubBattlePreview({ result }: Props) {
  return (
    <>
      <div className="grid gap-6 xl:grid-cols-2">
        <GithubProfileCard data={result.leftProfile} />
        <GithubProfileCard data={result.rightProfile} />
      </div>

      <div className="pointer-events-none fixed -left-[9999px] top-0 opacity-0">
        <GithubBattleExportContent result={result} />
      </div>
    </>
  );
}
