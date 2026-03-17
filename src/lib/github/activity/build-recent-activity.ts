import { isRecentGithubEvent } from "./is-recent-github-event";
import type { GithubRecentActivity, GithubUserEventResponse } from "../types";

export function buildRecentActivity(
  events: GithubUserEventResponse[],
): GithubRecentActivity {
  const recentEvents = events.filter(isRecentGithubEvent);
  const activeRepos = new Set(recentEvents.map((event) => event.repo.name));
  const pushEventsLast30Days = recentEvents.filter(
    (event) => event.type === "PushEvent",
  ).length;

  return {
    eventsLast30Days: recentEvents.length,
    pushEventsLast30Days,
    activeReposLast30Days: activeRepos.size,
  };
}
