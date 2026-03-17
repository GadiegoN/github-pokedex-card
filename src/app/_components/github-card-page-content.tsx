import { DownloadCardButton } from "./download-card-button";
import { GithubCardPageHero } from "./github-card-page-hero";
import { ShareCardButton } from "./share-card-button";
import { GithubProfileCardPreview } from "@/components/github-card/github-profile-card-preview";
import type { GithubProfileCardData } from "@/lib/github/types";

type Props = {
  profile: GithubProfileCardData | null;
  initialUsername?: string;
};

export function GithubCardPageContent({
  profile,
  initialUsername = "",
}: Props) {
  return (
    <main className="min-h-dvh bg-background px-4 py-6 text-foreground sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:items-center">
        <section className="order-1 flex flex-col justify-center">
          <GithubCardPageHero initialUsername={initialUsername} />

          {profile ? (
            <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
              <DownloadCardButton
                targetId="github-profile-card-export"
                fileName={`${profile.username}-trainer-card.png`}
              />
              <ShareCardButton />
            </div>
          ) : null}
        </section>

        <section className="order-2 flex items-center justify-center">
          <GithubProfileCardPreview data={profile} />
        </section>
      </div>
    </main>
  );
}
