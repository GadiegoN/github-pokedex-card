import type { GithubCardRarity, GithubCardType } from "@/lib/github/types";

type ThemeAccent = {
  frameClassName: string;
  mediaClassName: string;
  rarityClassName: string;
  typeClassName: string;
};

function createTheme(frameClassName: string): ThemeAccent {
  return {
    frameClassName,
    mediaClassName: "bg-[image:var(--card-media-bg)]",
    rarityClassName:
      "border-transparent bg-[var(--card-rarity-bg)] text-[var(--card-rarity-foreground)]",
    typeClassName:
      "border-[var(--card-type-border)] bg-[var(--card-type-bg)] text-[var(--card-type-foreground)]",
  };
}

const typeThemes: Record<GithubCardType, ThemeAccent> = {
  electric: createTheme("theme-card-electric"),
  steel: createTheme("theme-card-steel"),
  rock: createTheme("theme-card-rock"),
  psychic: createTheme("theme-card-psychic"),
  fire: createTheme("theme-card-fire"),
};

const rarityLabels: Record<GithubCardRarity, string> = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

const typeLabels: Record<GithubCardType, string> = {
  electric: "Eletrico",
  steel: "Aco",
  rock: "Ancestral",
  psychic: "Psiquico",
  fire: "Fogo",
};

export function getCardTheme(cardType: GithubCardType) {
  return typeThemes[cardType];
}

export function getRarityLabel(rarity: GithubCardRarity) {
  return rarityLabels[rarity];
}

export function getTypeLabel(cardType: GithubCardType) {
  return typeLabels[cardType];
}
