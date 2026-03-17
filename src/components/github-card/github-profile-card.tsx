import type { GithubProfileCardData } from "@/lib/github/types";
import { PokemonFrame } from "./pokemon-frame";
import { getCardTheme } from "./card-theme";
import { CardSection } from "./card-section";
import { GithubProfileCardDetails } from "./github-profile-card-details";
import { GithubProfileCardHeader } from "./github-profile-card-header";
import { GithubProfileCardPortrait } from "./github-profile-card-portrait";
import { GithubProfileCardStats } from "./github-profile-card-stats";

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
      <div className="p-5">
        <CardSection delayClassName="animate-delay-0">
          <GithubProfileCardHeader
            data={data}
            rarityClassName={theme.rarityClassName}
            typeClassName={theme.typeClassName}
          />
        </CardSection>

        <CardSection delayClassName="animate-delay-1">
          <GithubProfileCardPortrait
            avatarUrl={data.avatarUrl}
            displayName={data.displayName}
            mediaClassName={theme.mediaClassName}
          />
        </CardSection>

        <CardSection delayClassName="animate-delay-2">
          <GithubProfileCardDetails data={data} />
        </CardSection>

        <CardSection delayClassName="animate-delay-3">
          <GithubProfileCardStats stats={data.stats} />
        </CardSection>
      </div>
    </PokemonFrame>
  );
}
