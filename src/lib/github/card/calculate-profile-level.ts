type Params = {
  publicRepos: number;
  followers: number;
  following: number;
  yearsOnGithub: number;
};

export function calculateProfileLevel({
  publicRepos,
  followers,
  following,
  yearsOnGithub,
}: Params) {
  return Math.max(
    1,
    Math.floor(
      publicRepos * 0.7 +
        followers * 0.2 +
        yearsOnGithub * 2 +
        following * 0.05,
    ),
  );
}
