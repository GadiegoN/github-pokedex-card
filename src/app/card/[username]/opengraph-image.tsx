import { ImageResponse } from "next/og";
import { getGithubProfileCardData } from "@/lib/github/api";
import { GithubProfileOgCard } from "@/components/github-card-og/github-profile-og-card";

export const alt = "GitHub Trainer Card";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const revalidate = 3600;

type Props = {
  params: Promise<{
    username: string;
  }>;
};

function buildFallbackImage(username: string) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.72), transparent 35%), linear-gradient(180deg, #fcf7e9 0%, #efe0bb 100%)",
          color: "#111111",
          fontSize: 48,
          fontWeight: 900,
        }}
      >
        Card de {username}
      </div>
    ),
    size,
  );
}

export default async function OpenGraphImage({ params }: Props) {
  const { username } = await params;
  const normalizedUsername = username.trim();
  const profile = normalizedUsername
    ? await getGithubProfileCardData(normalizedUsername)
    : null;

  if (!profile) {
    return buildFallbackImage(username);
  }

  return new ImageResponse(<GithubProfileOgCard data={profile} />, size);
}
