import type { GithubCardType } from "@/lib/github/types";

type OgCardTheme = {
  background: string;
  borderColor: string;
  panelColor: string;
  softPanelColor: string;
  mediaOverlay: string;
  badgeColor: string;
  badgeTextColor: string;
  textStrong: string;
  textMuted: string;
  textSoft: string;
  dangerColor: string;
  dangerTextColor: string;
};

const themes: Record<GithubCardType, OgCardTheme> = {
  electric: {
    background: "linear-gradient(180deg, #fff3a1 0%, #ffd447 58%, #ffb300 100%)",
    borderColor: "#ffd447",
    panelColor: "rgba(255, 255, 255, 0.62)",
    softPanelColor: "rgba(255, 255, 255, 0.5)",
    mediaOverlay: "rgba(255, 255, 255, 0.36)",
    badgeColor: "#fff1a8",
    badgeTextColor: "#5b4300",
    textStrong: "#1a1610",
    textMuted: "rgba(26, 22, 16, 0.68)",
    textSoft: "rgba(26, 22, 16, 0.8)",
    dangerColor: "#db3d3d",
    dangerTextColor: "#fffaf7",
  },
  steel: {
    background: "linear-gradient(180deg, #eff5fb 0%, #c7d3df 58%, #90a4b8 100%)",
    borderColor: "#9fb3c8",
    panelColor: "rgba(255, 255, 255, 0.68)",
    softPanelColor: "rgba(255, 255, 255, 0.56)",
    mediaOverlay: "rgba(255, 255, 255, 0.4)",
    badgeColor: "#dbe6f2",
    badgeTextColor: "#2c4053",
    textStrong: "#15202b",
    textMuted: "rgba(21, 32, 43, 0.68)",
    textSoft: "rgba(21, 32, 43, 0.82)",
    dangerColor: "#d44747",
    dangerTextColor: "#fffafa",
  },
  rock: {
    background: "linear-gradient(180deg, #fff0d5 0%, #e7c38d 58%, #bc8b47 100%)",
    borderColor: "#d6b06f",
    panelColor: "rgba(255, 255, 255, 0.62)",
    softPanelColor: "rgba(255, 255, 255, 0.5)",
    mediaOverlay: "rgba(255, 255, 255, 0.36)",
    badgeColor: "#f3dfbf",
    badgeTextColor: "#684019",
    textStrong: "#28180c",
    textMuted: "rgba(40, 24, 12, 0.68)",
    textSoft: "rgba(40, 24, 12, 0.8)",
    dangerColor: "#c9483d",
    dangerTextColor: "#fff8f2",
  },
  psychic: {
    background: "linear-gradient(180deg, #ffe4f4 0%, #f6b6e4 58%, #e684c8 100%)",
    borderColor: "#f2a4d9",
    panelColor: "rgba(255, 255, 255, 0.64)",
    softPanelColor: "rgba(255, 255, 255, 0.52)",
    mediaOverlay: "rgba(255, 255, 255, 0.38)",
    badgeColor: "#ffd7ef",
    badgeTextColor: "#7b2f60",
    textStrong: "#2f1730",
    textMuted: "rgba(47, 23, 48, 0.68)",
    textSoft: "rgba(47, 23, 48, 0.8)",
    dangerColor: "#d74766",
    dangerTextColor: "#fff9fb",
  },
  fire: {
    background: "linear-gradient(180deg, #ffe1b8 0%, #ffb36b 58%, #ff7a45 100%)",
    borderColor: "#ffb36b",
    panelColor: "rgba(255, 255, 255, 0.62)",
    softPanelColor: "rgba(255, 255, 255, 0.5)",
    mediaOverlay: "rgba(255, 255, 255, 0.36)",
    badgeColor: "#ffd8c4",
    badgeTextColor: "#85311d",
    textStrong: "#2d160f",
    textMuted: "rgba(45, 22, 15, 0.68)",
    textSoft: "rgba(45, 22, 15, 0.8)",
    dangerColor: "#d94a3d",
    dangerTextColor: "#fff9f8",
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
