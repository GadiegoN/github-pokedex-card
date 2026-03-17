import type { GithubProfileCardData } from "@/lib/github/types";
import { PokemonFrame } from "./pokemon-frame";
import { getCardTheme } from "./card-theme";
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
        <GithubProfileCardHeader
          data={data}
          rarityClassName={theme.rarityClassName}
          typeClassName={theme.typeClassName}
        />
        <GithubProfileCardPortrait
          avatarUrl={data.avatarUrl}
          displayName={data.displayName}
          mediaClassName={theme.mediaClassName}
        />
        <GithubProfileCardDetails data={data} />
        <GithubProfileCardStats stats={data.stats} />
      </div>
    </PokemonFrame>
  );
}
