import type { GithubUserEventResponse } from "../types";

const THIRTY_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 30;

export function isRecentGithubEvent(event: GithubUserEventResponse) {
  const eventTime = new Date(event.created_at).getTime();
  const now = Date.now();

  return now - eventTime <= THIRTY_DAYS_IN_MS;
}
