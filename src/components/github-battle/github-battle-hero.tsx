import type { GithubBattleResult } from "@/lib/github/battle/types";

type Props = {
  result: GithubBattleResult;
};

function getWinnerText(result: GithubBattleResult) {
  if (result.winner === "tie") {
    return "Empate tecnico";
  }

  return result.winner === "left"
    ? `${result.leftProfile.username} venceu`
    : `${result.rightProfile.username} venceu`;
}

export function GithubBattleHero({ result }: Props) {
  return (
    <div className="rounded-4xl border border-border/70 bg-surface-glass-strong p-5 backdrop-blur-sm">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
        Battle Result
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
        {getWinnerText(result)}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
        Score final: {result.leftScore} x {result.rightScore}
      </p>
    </div>
  );
}
