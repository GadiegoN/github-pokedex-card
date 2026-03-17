import { Badge } from "@/components/ui/badge";
import { getRarityLabel, getTypeLabel } from "./card-theme";
import type { GithubProfileCardData } from "@/lib/github/types";

type Props = {
  data: GithubProfileCardData;
  rarityClassName: string;
  typeClassName: string;
};

export function GithubProfileCardHeader({
  data,
  rarityClassName,
  typeClassName,
}: Props) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-3xl bg-white/55 p-2">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-2xl font-black tracking-tight text-black">
            {data.displayName}
          </h2>
          <Badge className={typeClassName}>{getTypeLabel(data.cardType)}</Badge>
        </div>

        <p className="truncate text-sm font-semibold text-black/65">
          @{data.username}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        <Badge className={rarityClassName}>{getRarityLabel(data.rarity)}</Badge>
        <Badge className="bg-red-500 text-white">LV {data.level}</Badge>
      </div>
    </div>
  );
}
