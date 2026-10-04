import type { GithubProfileCardData } from "@/lib/github/types";
import { formatCompactNumber } from "@/lib/utils/format-number";
import { getOgCardTheme } from "./og-card-theme";
import { OgCardStat } from "./og-card-stat";

type Props = {
  data: GithubProfileCardData;
};

function getTopStats(data: GithubProfileCardData) {
  return [
    { label: "Repos", value: formatCompactNumber(data.publicRepos) },
    { label: "Followers", value: formatCompactNumber(data.followers) },
    { label: "Stars", value: formatCompactNumber(data.starsReceived) },
  ];
}

function getDisplayNameSize(displayName: string) {
  if (displayName.length > 24) return 24;
  if (displayName.length > 16) return 28;
  return 34;
}

export function GithubProfileOgCard({ data }: Props) {
  const theme = getOgCardTheme(data.cardType);
  const stats = getTopStats(data);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 24,
        background:
          "radial-gradient(circle at top, rgba(255,255,255,0.78), transparent 32%), linear-gradient(180deg, #f9f3e6 0%, #ead9b3 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          borderRadius: 36,
          border: `12px solid ${theme.borderColor}`,
          background: theme.background,
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.22)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.22) 48%, transparent 66%)",
            transform: "translateX(-15%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flex: 1,
            padding: 24,
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 350,
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 26,
                background: theme.panelColor,
                padding: 14,
                gap: 7,
              }}
            >
              <span
                style={{
                  fontSize: getDisplayNameSize(data.displayName),
                  fontWeight: 900,
                  color: theme.textStrong,
                  lineHeight: 1.1,
                }}
              >
                {data.displayName}
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: theme.textMuted,
                }}
              >
                @{data.username}
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: theme.textStrong,
                }}
              >
                {data.developerClass.name}
              </span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: theme.textMuted,
                }}
              >
                Nível {data.level} · {data.developerLevel.title}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 26,
                background: theme.panelColor,
                padding: 16,
                gap: 9,
              }}
            >
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: theme.textStrong,
                }}
              >
                {data.mainLanguage}
              </span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: theme.textStrong,
                }}
              >
                {data.developerLevel.totalXp.toLocaleString("pt-BR")} XP total
              </span>
              <div
                style={{
                  display: "flex",
                  height: 10,
                  borderRadius: 999,
                  background: "rgba(0,0,0,0.12)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${data.developerLevel.progress}%`,
                    height: "100%",
                    background: theme.dangerColor,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 14,
                  color: theme.textMuted,
                }}
              >
                {data.developerLevel.xpIntoLevel.toLocaleString("pt-BR")} /{" "}
                {data.developerLevel.xpForNextLevel.toLocaleString("pt-BR")} XP
                · {data.developerLevel.progress}%
              </span>
              <span
                style={{
                  fontSize: 16,
                  color: theme.textSoft,
                  lineHeight: 1.25,
                  maxHeight: 40,
                  overflow: "hidden",
                }}
              >
                {data.bio}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: theme.textMuted,
                }}
              >
                {data.yearsOnGithub} anos no GitHub ·{" "}
                {data.recentActivity.eventsLast30Days} eventos públicos recentes
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              {stats.map((stat) => (
                <OgCardStat
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  textStrong={theme.textStrong}
                  textMuted={theme.textMuted}
                />
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
                background: theme.mediaOverlay,
                border: "8px solid rgba(0,0,0,0.08)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Satori's ImageResponse requires an HTML img for remote images. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.avatarUrl}
                alt={data.displayName}
                width="420"
                height="420"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at top, rgba(255,255,255,0.52) 0%, transparent 55%)",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 24,
                background: theme.softPanelColor,
                padding: "14px 18px",
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: theme.textMuted,
                }}
              >
                GITHUB ADVENTURER
              </span>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: theme.textStrong,
                }}
              >
                {data.rarity.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
