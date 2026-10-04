import { Badge } from "@/components/ui/badge";
import { getRarityLabel } from "./card-theme";
import type { GithubProfileCardData } from "@/lib/github/types";

type Props = {
  data: GithubProfileCardData;
  rarityClassName: string;
};

export function GithubProfileCardHeader({
  data,
  rarityClassName,
}: Props) {
  return (
    <div className="min-w-0 rounded-3xl bg-surface-glass p-3">
      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-muted">
          GitHub Adventurer
        </p>
        <h2 className="mt-1 truncate text-xl font-black tracking-tight text-text-strong sm:text-2xl">
          {data.displayName}
        </h2>

        <p className="truncate text-sm font-semibold text-text-muted">
          @{data.username}
        </p>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <Badge className={rarityClassName}>{getRarityLabel(data.rarity)}</Badge>
        <Badge className="border-transparent bg-danger text-danger-foreground">
          LV {data.level}
        </Badge>
      </div>
    </div>
  );
}
