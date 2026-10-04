import {
  Github,
  Radio,
} from "lucide-react";
import type { GithubProfileCardData } from "@/lib/github/types";

type Props = {
  data: GithubProfileCardData;
};

export function GithubProfileCardDetails({ data }: Props) {
  return (
    <div className="mt-3 rounded-3xl bg-surface-glass-strong p-4 backdrop-blur-sm">
      <p className="line-clamp-2 text-sm leading-5 text-text-soft">{data.bio}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <Github className="size-4 shrink-0" />
          {data.yearsOnGithub} anos no GitHub
        </span>

        <span className="flex items-center gap-1.5">
          <Radio className="size-4 shrink-0" />
          {data.recentActivity.eventsLast30Days} eventos públicos · 30 dias
        </span>
      </div>
    </div>
  );
}
