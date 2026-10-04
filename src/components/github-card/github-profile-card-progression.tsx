import {
  Brain,
  ChartNoAxesCombined,
  Code2,
  HeartHandshake,
  Layers,
  Layout,
  Server,
  Smartphone,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { formatCompactNumber } from "@/lib/utils/format-number";
import type { GithubProfileCardData } from "@/lib/github/types";
import type { DeveloperClass } from "@/lib/github/developer/types";

type Props = {
  data: GithubProfileCardData;
};

const classIcons: Record<DeveloperClass["icon"], LucideIcon> = {
  "heart-handshake": HeartHandshake,
  brain: Brain,
  "chart-no-axes-combined": ChartNoAxesCombined,
  terminal: Terminal,
  smartphone: Smartphone,
  layers: Layers,
  layout: Layout,
  server: Server,
  code: Code2,
};

export function GithubProfileCardProgression({ data }: Props) {
  const ClassIcon = classIcons[data.developerClass.icon];
  const { developerLevel, developerClass } = data;

  return (
    <section
      className="mt-3 rounded-3xl bg-surface-glass-strong p-4"
      aria-label="Classe e progressão"
    >
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-surface-overlay text-accent">
          <ClassIcon size={20} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="text-[10px] font-black uppercase tracking-[0.24em] text-text-muted">
            Classe
          </h3>
          <p className="truncate text-base font-black text-text-strong">
            {developerClass.name}
          </p>
          <p className="mt-1 line-clamp-2 text-xs leading-4 text-text-soft">
            {developerClass.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <p className="text-xs font-bold text-text-strong">
          {developerLevel.title} · Nível {developerLevel.level}
        </p>
        <p className="text-xs tabular-nums text-text-muted">
          {formatCompactNumber(developerLevel.totalXp)} XP total
        </p>
      </div>

      <div
        className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-overlay-strong"
        role="progressbar"
        aria-label={`Progresso para o nível ${developerLevel.level + 1}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={developerLevel.progress}
      >
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${developerLevel.progress}%` }}
        />
      </div>
      <p className="mt-1 text-right text-[10px] tabular-nums text-text-muted">
        {developerLevel.xpIntoLevel.toLocaleString("pt-BR")} /{" "}
        {developerLevel.xpForNextLevel.toLocaleString("pt-BR")} XP ·{" "}
        {developerLevel.progress}%
      </p>
      <p
        className="mt-2 text-[10px] leading-4 text-text-muted"
        title={developerClass.criteria.join(" ")}
      >
        Classe baseada em {developerClass.criteria.join(" ")}
      </p>
    </section>
  );
}
