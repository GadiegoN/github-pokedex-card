import { describe, expect, it } from "vitest";
import { buildBattleResult } from "./build-battle-result";
import { calculateBattleScore } from "./calculate-battle-score";
import { getBattleMetricValue } from "./get-battle-metric-value";
import type { GithubProfileCardData } from "../types";

function battleProfile(
  username: string,
  overrides: Partial<GithubProfileCardData> = {},
): GithubProfileCardData {
  const profile: GithubProfileCardData = {
    username,
    displayName: username,
    avatarUrl: "https://example.test/avatar.png",
    profileUrl: `https://github.com/${username}`,
    bio: "",
    location: "",
    company: "",
    website: "",
    publicRepos: 1,
    followers: 1,
    following: 1,
    yearsOnGithub: 1,
    level: 1,
    rarity: "common",
    developerLevel: {
      level: 1,
      title: "Novice",
      totalXp: 100,
      xpIntoLevel: 100,
      xpForNextLevel: 1_250,
      progress: 8,
    },
    developerClass: {
      id: "frontend-knight",
      name: "Frontend Knight",
      description: "Frontend specialization.",
      icon: "layout",
      criteria: ["TypeScript"],
      score: 70,
    },
    developerStats: {
      coding: 20,
      experience: 20,
      knowledge: 20,
      social: 20,
      consistency: 20,
    },
    languages: [{ name: "TypeScript", repositoryCount: 1, percentage: 100 }],
    analyzedRepositories: 1,
    returnedRepositories: 1,
    starsReceived: 0,
    forksReceived: 0,
    cardType: "electric",
    mainLanguage: "TypeScript",
    recentActivity: {
      eventsLast30Days: 0,
      pushEventsLast30Days: 0,
      activeReposLast30Days: 0,
    },
  };

  return { ...profile, ...overrides };
}

describe("developer battle metrics", () => {
  it("compares XP, rarity, attributes, language count, and existing metrics", () => {
    const left = battleProfile("left", {
      level: 20,
      rarity: "epic",
      developerLevel: {
        level: 20,
        title: "Apprentice",
        totalXp: 50_000,
        xpIntoLevel: 2_000,
        xpForNextLevel: 6_000,
        progress: 33,
      },
      developerStats: {
        coding: 90,
        experience: 80,
        knowledge: 85,
        social: 40,
        consistency: 70,
      },
      languages: [
        { name: "TypeScript", repositoryCount: 4, percentage: 50 },
        { name: "Python", repositoryCount: 4, percentage: 50 },
      ],
    });
    const right = battleProfile("right", {
      level: 15,
      rarity: "rare",
      developerLevel: {
        level: 15,
        title: "Apprentice",
        totalXp: 25_000,
        xpIntoLevel: 1_000,
        xpForNextLevel: 4_750,
        progress: 21,
      },
      developerStats: {
        coding: 60,
        experience: 70,
        knowledge: 55,
        social: 90,
        consistency: 80,
      },
      languages: [{ name: "TypeScript", repositoryCount: 1, percentage: 100 }],
    });
    const result = buildBattleResult(left, right);

    expect(getBattleMetricValue(left, "rarity")).toBe(4);
    expect(getBattleMetricValue(left, "xp")).toBe(50_000);
    expect(result.metrics.map(({ key }) => key)).toEqual(
      expect.arrayContaining([
        "level",
        "xp",
        "rarity",
        "coding",
        "experience",
        "knowledge",
        "social",
        "consistency",
        "languageCount",
        "followers",
        "publicRepos",
        "yearsOnGithub",
        "power",
      ]),
    );
    expect(result.metrics.find(({ key }) => key === "rarity")).toMatchObject({
      leftValue: 4,
      rightValue: 3,
      leftDisplayValue: "Epic",
      rightDisplayValue: "Rare",
      winner: "left",
    });
    expect(result.classComparison).toEqual({
      leftClass: "Frontend Knight",
      rightClass: "Frontend Knight",
      isSameClass: true,
    });
    expect(result.languageComparison).toEqual({
      shared: ["TypeScript"],
      leftOnly: ["Python"],
      rightOnly: [],
    });
    expect(
      calculateBattleScore(
        result.metrics.map((metric) => ({ ...metric, winner: "left" })),
        "left",
      ),
    ).toBe(7);
  });

  it("keeps class specialization comparison neutral when classes differ", () => {
    const result = buildBattleResult(
      battleProfile("frontend"),
      battleProfile("backend", {
        developerClass: {
          id: "backend-guardian",
          name: "Backend Guardian",
          description: "Backend specialization.",
          icon: "server",
          criteria: ["Python"],
          score: 70,
        },
      }),
    );

    expect(result.classComparison.isSameClass).toBe(false);
  });
});
