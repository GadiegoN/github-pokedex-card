import type { GithubCardRarity, GithubCardType } from "@/lib/github/types";

type ThemeAccent = {
  frameClassName: string;
  mediaClassName: string;
  rarityClassName: string;
  typeClassName: string;
};

const typeThemes: Record<GithubCardType, ThemeAccent> = {
  electric: {
    frameClassName:
      "border-[#ffd447] bg-[linear-gradient(180deg,#fff3a1_0%,#ffd447_55%,#ffb300_100%)]",
    mediaClassName:
      "bg-[linear-gradient(180deg,#fff7bf_0%,#ffe066_48%,#ffc107_100%)]",
    rarityClassName: "bg-[#3d2f00] text-[#fff3bf]",
    typeClassName: "bg-[#fff1a8] text-[#5b4300] border-[#f7cf4d]",
  },
  steel: {
    frameClassName:
      "border-[#9fb3c8] bg-[linear-gradient(180deg,#eff5fb_0%,#c7d3df_52%,#90a4b8_100%)]",
    mediaClassName:
      "bg-[linear-gradient(180deg,#f8fbff_0%,#dbe5ef_52%,#aab8c7_100%)]",
    rarityClassName: "bg-[#243342] text-[#edf6ff]",
    typeClassName: "bg-[#dbe6f2] text-[#2c4053] border-[#aebfd2]",
  },
  rock: {
    frameClassName:
      "border-[#d6b06f] bg-[linear-gradient(180deg,#fff0d5_0%,#e7c38d_52%,#bc8b47_100%)]",
    mediaClassName:
      "bg-[linear-gradient(180deg,#fff6e4_0%,#edd3ab_52%,#d2a363_100%)]",
    rarityClassName: "bg-[#4f2f14] text-[#fff2de]",
    typeClassName: "bg-[#f3dfbf] text-[#684019] border-[#d1af74]",
  },
  psychic: {
    frameClassName:
      "border-[#f2a4d9] bg-[linear-gradient(180deg,#ffe4f4_0%,#f6b6e4_52%,#e684c8_100%)]",
    mediaClassName:
      "bg-[linear-gradient(180deg,#fff1fb_0%,#ffd0ef_52%,#f2a1db_100%)]",
    rarityClassName: "bg-[#68244f] text-[#ffe7f8]",
    typeClassName: "bg-[#ffd7ef] text-[#7b2f60] border-[#e9a7cf]",
  },
  fire: {
    frameClassName:
      "border-[#ffb36b] bg-[linear-gradient(180deg,#ffe1b8_0%,#ffb36b_52%,#ff7a45_100%)]",
    mediaClassName:
      "bg-[linear-gradient(180deg,#fff0d9_0%,#ffc388_52%,#ff8a5c_100%)]",
    rarityClassName: "bg-[#6a1f0e] text-[#ffe8dc]",
    typeClassName: "bg-[#ffd8c4] text-[#85311d] border-[#f0aa80]",
  },
};

const rarityLabels: Record<GithubCardRarity, string> = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

const typeLabels: Record<GithubCardType, string> = {
  electric: "Elétrico",
  steel: "Aço",
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
