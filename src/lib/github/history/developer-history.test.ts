import { describe, expect, it } from "vitest";
import { upsertDeveloperSnapshot } from "./build-developer-snapshot";
import type { DeveloperHistory, DeveloperSnapshot } from "./types";

function snapshot(
  year: number,
  overrides: Partial<DeveloperSnapshot> = {},
): DeveloperSnapshot {
  return {
    year,
    level: year - 2000,
    totalXp: (year - 2000) * 100,
    developerClassId: "frontend-knight",
    developerClassName: "Frontend Knight",
    rarity: "rare",
    stats: {
      coding: 60,
      experience: 50,
      knowledge: 70,
      social: 20,
      consistency: 40,
    },
    ...overrides,
  };
}

describe("upsertDeveloperSnapshot", () => {
  it("keeps one ordered snapshot per year and updates the current year's values", () => {
    const initial: DeveloperHistory = {
      schemaVersion: 1,
      snapshots: [snapshot(2025), snapshot(2023)],
    };

    expect(
      upsertDeveloperSnapshot(initial, snapshot(2025, { level: 30 })),
    ).toEqual({
      schemaVersion: 1,
      snapshots: [
        snapshot(2023),
        snapshot(2025, { level: 30 }),
      ],
    });
    expect(initial.snapshots.map(({ year }) => year)).toEqual([2025, 2023]);
  });
});
