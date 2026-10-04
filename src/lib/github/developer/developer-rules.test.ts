import { describe, expect, it } from "vitest";
import { buildDeveloperLanguages } from "./build-developer-languages";
import { calculateDeveloperLevel } from "./calculate-developer-level";
import { calculateDeveloperRarity } from "./calculate-developer-rarity";
import { calculateDeveloperStats } from "./calculate-developer-stats";
import { determineDeveloperClass } from "./determine-developer-class";
import type { DeveloperProfile, DeveloperRepository } from "./types";

function repository(
  language: string | null,
  overrides: Partial<DeveloperRepository> = {},
): DeveloperRepository {
  return {
    language,
    isFork: false,
    stars: 0,
    forks: 0,
    ...overrides,
  };
}

function profile(overrides: Partial<DeveloperProfile> = {}): DeveloperProfile {
  return {
    publicRepos: 0,
    followers: 0,
    following: 0,
    yearsOnGithub: 0,
    repositories: [],
    recentActivity: {
      eventsLast30Days: 0,
      pushEventsLast30Days: 0,
      activeReposLast30Days: 0,
    },
    ...overrides,
  };
}

describe("calculateDeveloperStats", () => {
  it("returns zeroes for a profile without public activity or repositories", () => {
    expect(calculateDeveloperStats(profile())).toEqual({
      coding: 0,
      experience: 0,
      knowledge: 0,
      social: 0,
      consistency: 0,
    });
  });

  it("ignores forked repositories and normalizes every attribute to 0–100", () => {
    const stats = calculateDeveloperStats(
      profile({
        followers: 1_000_000,
        following: 1_000_000,
        yearsOnGithub: 100,
        repositories: [
          repository("TypeScript"),
          repository("Python"),
          repository("Rust"),
          repository("Go"),
          repository("C++"),
          repository("Java"),
          repository("Ruby"),
          repository("Julia"),
          repository("Swift"),
          repository("Kotlin"),
          repository("JavaScript", { isFork: true }),
        ],
        recentActivity: {
          eventsLast30Days: 100,
          pushEventsLast30Days: 100,
          activeReposLast30Days: 100,
        },
      }),
    );

    expect(Object.values(stats).every((value) => value >= 0 && value <= 100))
      .toBe(true);
    expect(stats.coding).toBe(100);
    expect(stats.knowledge).toBe(100);
  });

  it("does not let follower count substitute for coding evidence", () => {
    const stats = calculateDeveloperStats(
      profile({ followers: 5_000, following: 1_000 }),
    );

    expect(stats.social).toBeGreaterThan(0);
    expect(stats.coding).toBe(0);
    expect(stats.knowledge).toBe(0);
  });
});

describe("calculateDeveloperLevel", () => {
  it("starts at level one with no XP for a profile without data", () => {
    expect(calculateDeveloperLevel(profile())).toEqual({
      level: 1,
      title: "Novice",
      totalXp: 0,
      xpIntoLevel: 0,
      xpForNextLevel: 1_250,
      progress: 0,
    });
  });

  it("calculates deterministic XP and carries remaining XP into the next level", () => {
    const developerProfile = profile({
      publicRepos: 20,
      followers: 10,
      yearsOnGithub: 2,
      repositories: [
        repository("TypeScript", { stars: 5, forks: 2 }),
        repository("Python"),
      ],
      recentActivity: {
        eventsLast30Days: 4,
        pushEventsLast30Days: 3,
        activeReposLast30Days: 2,
      },
    });

    expect(calculateDeveloperLevel(developerProfile)).toEqual(
      calculateDeveloperLevel(developerProfile),
    );
    expect(calculateDeveloperLevel(developerProfile)).toMatchObject({
      totalXp: 2_590,
      level: 2,
      title: "Novice",
      xpIntoLevel: 1_340,
      xpForNextLevel: 1_500,
      progress: 89,
    });
  });

  it("continues leveling for very large profiles and advances the title", () => {
    const result = calculateDeveloperLevel(
      profile({ publicRepos: 1_000_000, yearsOnGithub: 100 }),
    );

    expect(result.level).toBeGreaterThan(50);
    expect(result.title).toBe("Legendary");
    expect(result.progress).toBeGreaterThanOrEqual(0);
    expect(result.progress).toBeLessThan(100);
  });
});

describe("calculateDeveloperRarity", () => {
  it("does not award high rarity from followers alone", () => {
    const popularProfile = profile({
      followers: 5_000,
      following: 1_000,
    });
    const popularStats = calculateDeveloperStats(popularProfile);

    expect(calculateDeveloperRarity(popularProfile, popularStats)).toBe(
      "common",
    );
  });

  it("rewards a broad, active profile even when follower count is low", () => {
    const skilledProfile = profile({
      yearsOnGithub: 12,
      repositories: Array.from({ length: 30 }, (_, index) =>
        repository(["TypeScript", "Python", "Go", "Rust"][index % 4], {
          stars: 5,
          forks: 2,
        }),
      ),
      recentActivity: {
        eventsLast30Days: 20,
        pushEventsLast30Days: 15,
        activeReposLast30Days: 8,
      },
    });
    const stats = calculateDeveloperStats(skilledProfile);

    expect(calculateDeveloperRarity(skilledProfile, stats)).toMatch(
      /^(rare|epic|legendary)$/,
    );
  });
});

describe("determineDeveloperClass", () => {
  it("classifies language evidence for a full-stack profile", () => {
    const result = determineDeveloperClass(
      profile({
        repositories: [repository("TypeScript"), repository("Python")],
      }),
    );

    expect(result.id).toBe("full-stack-adventurer");
    expect(result.criteria.join(" ")).toContain("TypeScript");
    expect(result.criteria.join(" ")).toContain("Python");
  });

  it("recognizes public repository topics as AI evidence", () => {
    const result = determineDeveloperClass(
      profile({
        repositories: [
          repository("Python", { topics: ["machine-learning"] }),
        ],
      }),
    );

    expect(result.id).toBe("ai-alchemist");
  });

  it("uses Code Wizard as an honest fallback when there are no repositories", () => {
    const result = determineDeveloperClass(profile());

    expect(result.id).toBe("code-wizard");
    expect(result.criteria[0]).toContain("não há linguagens");
  });

  it("classifies strong community adoption from actual stars and forks", () => {
    const result = determineDeveloperClass(
      profile({
        repositories: [
          repository("TypeScript", { stars: 25, forks: 10 }),
        ],
      }),
    );

    expect(result.id).toBe("open-source-paladin");
  });
});

describe("buildDeveloperLanguages", () => {
  it("returns at most five languages, sorted by repository count, excluding forks", () => {
    const languages = buildDeveloperLanguages(
      profile({
        repositories: [
          repository("TypeScript"),
          repository("TypeScript"),
          repository("Python"),
          repository("Go"),
          repository("Rust"),
          repository("Java"),
          repository("Ruby"),
          repository("JavaScript", { isFork: true }),
          repository(null),
        ],
      }),
    );

    expect(languages).toHaveLength(5);
    expect(languages[0]).toMatchObject({
      name: "TypeScript",
      repositoryCount: 2,
      percentage: 29,
    });
    expect(languages.some(({ name }) => name === "JavaScript")).toBe(false);
  });

  it("returns an empty list when no own repository has a language", () => {
    expect(
      buildDeveloperLanguages(
        profile({
          repositories: [
            repository(null),
            repository("Python", { isFork: true }),
          ],
        }),
      ),
    ).toEqual([]);
  });
});
