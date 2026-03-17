import type { GithubCardType } from "@/lib/github/types";

type OgCardTheme = {
  background: string;
  borderColor: string;
  panelColor: string;
  badgeColor: string;
  badgeTextColor: string;
};

const themes: Record<GithubCardType, OgCardTheme> = {
  electric: {
    background: "linear-gradient(180deg, #fff3a1 0%, #ffd447 58%, #ffb300 100%)",
    borderColor: "#ffd447",
    panelColor: "rgba(255, 255, 255, 0.62)",
    badgeColor: "#fff1a8",
    badgeTextColor: "#5b4300",
  },
  steel: {
    background: "linear-gradient(180deg, #eff5fb 0%, #c7d3df 58%, #90a4b8 100%)",
    borderColor: "#9fb3c8",
    panelColor: "rgba(255, 255, 255, 0.68)",
    badgeColor: "#dbe6f2",
    badgeTextColor: "#2c4053",
  },
  rock: {
    background: "linear-gradient(180deg, #fff0d5 0%, #e7c38d 58%, #bc8b47 100%)",
    borderColor: "#d6b06f",
    panelColor: "rgba(255, 255, 255, 0.62)",
    badgeColor: "#f3dfbf",
    badgeTextColor: "#684019",
  },
  psychic: {
    background: "linear-gradient(180deg, #ffe4f4 0%, #f6b6e4 58%, #e684c8 100%)",
    borderColor: "#f2a4d9",
    panelColor: "rgba(255, 255, 255, 0.64)",
    badgeColor: "#ffd7ef",
    badgeTextColor: "#7b2f60",
  },
  fire: {
    background: "linear-gradient(180deg, #ffe1b8 0%, #ffb36b 58%, #ff7a45 100%)",
    borderColor: "#ffb36b",
    panelColor: "rgba(255, 255, 255, 0.62)",
    badgeColor: "#ffd8c4",
    badgeTextColor: "#85311d",
  },
};

const typeLabels: Record<GithubCardType, string> = {
  electric: "Eletrico",
  steel: "Aco",
  rock: "Ancestral",
  psychic: "Psiquico",
  fire: "Fogo",
};

export function getOgCardTheme(cardType: GithubCardType) {
  return themes[cardType];
}

export function getOgTypeLabel(cardType: GithubCardType) {
  return typeLabels[cardType];
}
