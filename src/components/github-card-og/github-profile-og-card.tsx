import type { GithubProfileCardData } from "@/lib/github/types";
import { formatCompactNumber } from "@/lib/utils/format-number";
import { getOgCardTheme, getOgTypeLabel } from "./og-card-theme";
import { OgCardStat } from "./og-card-stat";

type Props = {
  data: GithubProfileCardData;
};

function getTopStats(data: GithubProfileCardData) {
  return [
    { label: "Repos", value: formatCompactNumber(data.publicRepos) },
    { label: "Followers", value: formatCompactNumber(data.followers) },
    { label: "Level", value: formatCompactNumber(data.level) },
  ];
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
        padding: 36,
        background:
          "radial-gradient(circle at top, rgba(255,255,255,0.75), transparent 32%), linear-gradient(180deg, #fcf7e9 0%, #efe0bb 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          borderRadius: 40,
          border: `14px solid ${theme.borderColor}`,
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
            padding: 30,
            gap: 28,
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 390,
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 30,
                background: "rgba(255,255,255,0.55)",
                padding: 18,
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 38,
                      fontWeight: 900,
                      color: "#101010",
                      lineHeight: 1,
                    }}
                  >
                    {data.displayName}
                  </span>
                  <span
                    style={{
                      borderRadius: 999,
                      padding: "8px 14px",
                      background: theme.badgeColor,
                      color: theme.badgeTextColor,
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                  >
                    {getOgTypeLabel(data.cardType)}
                  </span>
                </div>

                <span
                  style={{
                    borderRadius: 999,
                    padding: "8px 16px",
                    background: "#ef4444",
                    color: "#ffffff",
                    fontSize: 18,
                    fontWeight: 900,
                  }}
                >
                  LV {data.level}
                </span>
              </div>

              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.68)",
                }}
              >
                @{data.username}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 30,
                background: theme.panelColor,
                padding: 20,
                gap: 14,
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#111111",
                }}
              >
                {data.mainLanguage}
              </span>
              <span
                style={{
                  fontSize: 20,
                  color: "rgba(0,0,0,0.76)",
                  lineHeight: 1.4,
                }}
              >
                {data.bio}
              </span>
              <span
                style={{
                  fontSize: 18,
                  color: "rgba(0,0,0,0.64)",
                }}
              >
                {data.yearsOnGithub} anos no GitHub • {data.following} seguindo
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 14,
              }}
            >
              {stats.map((stat) => (
                <OgCardStat
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 32,
                background: "rgba(255,255,255,0.36)",
                border: "8px solid rgba(0,0,0,0.08)",
                overflow: "hidden",
                position: "relative",
              }}
            >
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
                borderRadius: 26,
                background: "rgba(255,255,255,0.5)",
                padding: "16px 20px",
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.68)",
                }}
              >
                github pokedex card
              </span>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#111111",
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
