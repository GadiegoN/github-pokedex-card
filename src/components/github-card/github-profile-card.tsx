import type { GithubProfileCardData } from "@/lib/github/types";
import { PokemonFrame } from "./pokemon-frame";
import { getCardTheme } from "./card-theme";
import { CardSection } from "./card-section";
import { GithubProfileCardDetails } from "./github-profile-card-details";
import { GithubProfileCardHeader } from "./github-profile-card-header";
import { GithubProfileCardPortrait } from "./github-profile-card-portrait";
import { GithubProfileCardProgression } from "./github-profile-card-progression";
import { GithubProfileCardStats } from "./github-profile-card-stats";
import { GithubProfileCardLanguages } from "./github-profile-card-languages";
import { GithubProfileCardGithubStats } from "./github-profile-card-github-stats";

type Props = {
  data: GithubProfileCardData;
};

export function GithubProfileCard({ data }: Props) {
  const theme = getCardTheme(data.cardType);

  return (
    <PokemonFrame
      className="mx-auto w-full max-w-105"
      frameClassName={theme.frameClassName}
    >
      <div className="p-4">
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-3">
          <CardSection delayClassName="animate-delay-0">
            <GithubProfileCardPortrait
              avatarUrl={data.avatarUrl}
              displayName={data.displayName}
              mediaClassName={theme.mediaClassName}
            />
          </CardSection>

          <CardSection delayClassName="animate-delay-1">
            <GithubProfileCardHeader
              data={data}
              rarityClassName={theme.rarityClassName}
            />
          </CardSection>
        </div>

        <CardSection delayClassName="animate-delay-2">
          <GithubProfileCardDetails data={data} />
        </CardSection>

        <CardSection delayClassName="animate-delay-3">
          <GithubProfileCardProgression data={data} />
        </CardSection>

        <div className="mt-2 grid grid-cols-2 items-start gap-2">
          <CardSection delayClassName="animate-delay-3">
            <GithubProfileCardStats stats={data.developerStats} />
          </CardSection>

          <CardSection delayClassName="animate-delay-3">
            <GithubProfileCardLanguages languages={data.languages} />
          </CardSection>
        </div>

        <CardSection delayClassName="animate-delay-3">
          <GithubProfileCardGithubStats data={data} />
        </CardSection>
      </div>
    </PokemonFrame>
  );
}
