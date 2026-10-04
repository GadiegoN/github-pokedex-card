const GITHUB_USERNAME_PATTERN =
  /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;

export function isValidGithubUsername(username: string): boolean {
  return GITHUB_USERNAME_PATTERN.test(username);
}
