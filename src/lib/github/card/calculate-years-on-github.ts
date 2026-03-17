export function calculateYearsOnGithub(createdAt: string) {
  const createdYear = new Date(createdAt).getFullYear();
  const currentYear = new Date().getFullYear();

  return Math.max(1, currentYear - createdYear);
}
