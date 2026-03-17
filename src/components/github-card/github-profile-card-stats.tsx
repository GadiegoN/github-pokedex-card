import { StatChip } from "@/components/ui/stat-chip";
import { formatCompactNumber } from "@/lib/utils/format-number";
import type { GithubProfileStat } from "@/lib/github/types";

type Props = {
  stats: GithubProfileStat[];
};

export function GithubProfileCardStats({ stats }: Props) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <StatChip
          key={stat.label}
          label={stat.label}
          value={formatCompactNumber(stat.value)}
        />
      ))}
    </div>
  );
}
