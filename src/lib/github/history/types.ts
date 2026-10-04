import type {
  DeveloperClassId,
  DeveloperRarity,
  DeveloperStats,
} from "../developer/types";

export type DeveloperSnapshot = {
  year: number;
  level: number;
  totalXp: number;
  developerClassId: DeveloperClassId;
  developerClassName: string;
  rarity: DeveloperRarity;
  stats: DeveloperStats;
};

export type DeveloperHistory = {
  schemaVersion: 1;
  snapshots: DeveloperSnapshot[];
};
