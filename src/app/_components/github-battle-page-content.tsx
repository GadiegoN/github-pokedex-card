import { DownloadCardButton } from "./download-card-button";
import { GithubBattlePageHero } from "./github-battle-page-hero";
import { ShareCardButton } from "./share-card-button";
import { GithubBattleHero } from "@/components/github-battle/github-battle-hero";
import { GithubBattlePreview } from "@/components/github-battle/github-battle-preview";
import { GithubBattleSummary } from "@/components/github-battle/github-battle-summary";
import type { GithubBattleResult } from "@/lib/github/battle/types";

type Props = {
  result: GithubBattleResult;
};

export function GithubBattlePageContent({ result }: Props) {
  return (
    <main className="min-h-dvh bg-background px-4 py-6 text-foreground sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <div>
            <GithubBattlePageHero
              initialLeftUsername={result.leftProfile.username}
              initialRightUsername={result.rightProfile.username}
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <DownloadCardButton
                targetId="github-battle-export"
                fileName={`${result.leftProfile.username}-vs-${result.rightProfile.username}.png`}
              />
              <ShareCardButton />
            </div>
          </div>

          <div className="grid gap-4">
            <GithubBattleHero result={result} />
            <GithubBattleSummary result={result} />
          </div>
        </section>

        <section>
          <GithubBattlePreview result={result} />
        </section>
      </div>
    </main>
  );
}
