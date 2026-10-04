import type { GithubProfileCardData } from "../types";
import type { DeveloperHistory, DeveloperSnapshot } from "./types";

export function buildDeveloperSnapshot(
  profile: GithubProfileCardData,
  year = new Date().getFullYear(),
): DeveloperSnapshot {
  return {
    year,
    level: profile.developerLevel.level,
    totalXp: profile.developerLevel.totalXp,
    developerClassId: profile.developerClass.id,
    developerClassName: profile.developerClass.name,
    rarity: profile.rarity,
    stats: { ...profile.developerStats },
  };
}

export function upsertDeveloperSnapshot(
  history: DeveloperHistory,
  snapshot: DeveloperSnapshot,
): DeveloperHistory {
  const snapshots = history.snapshots.filter(
    (existing) => existing.year !== snapshot.year,
  );

  snapshots.push(snapshot);
  snapshots.sort((left, right) => left.year - right.year);

  return {
    schemaVersion: 1,
    snapshots,
  };
}
