import Image from "next/image";
import {
  MapPin,
  Link as LinkIcon,
  BriefcaseBusiness,
  Github,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatChip } from "@/components/ui/stat-chip";
import { formatCompactNumber } from "@/lib/utils/format-number";
import type { GithubProfileCardData } from "@/lib/github/types";
import { PokemonFrame } from "./pokemon-frame";

type Props = {
  data: GithubProfileCardData;
};

export function GithubProfileCard({ data }: Props) {
  return (
    <PokemonFrame className="mx-auto w-full max-w-105">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 rounded-3xl bg-white/55 p-2">
          <div className="min-w-0">
            <h2 className="text-2xl font-black tracking-tight text-black">
              {data.displayName}
            </h2>

            <p className="truncate text-sm font-semibold text-black/65">
              @{data.username}
            </p>
          </div>

          <Badge className="shrink-0 bg-red-500 text-white my-4">
            LV {data.level}
          </Badge>
        </div>

        <div className="mt-4 overflow-hidden rounded-[1.75rem] border-[6px] border-black/12 bg-[linear-gradient(180deg,#8be9fd_0%,#5fd1ff_100%)] p-3">
          <div className="relative aspect-[4/4.35] overflow-hidden rounded-[1.25rem] bg-white/35">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff_0%,transparent_55%)]" />

            <Image
              src={data.avatarUrl}
              alt={data.displayName}
              fill
              sizes="420px"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        <div className="mt-4 rounded-3xl bg-white/60 p-4">
          <p className="line-clamp-2 text-sm leading-5 text-black/80">
            {data.bio}
          </p>

          <div className="mt-3 grid gap-2 text-sm text-black/72">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" />
              <span className="truncate">{data.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <BriefcaseBusiness className="size-4 shrink-0" />
              <span className="truncate">{data.company}</span>
            </div>

            <div className="flex items-center gap-2">
              <Github className="size-4 shrink-0" />
              <span>{data.yearsOnGithub} anos no GitHub</span>
            </div>

            {data.website ? (
              <div className="flex items-center gap-2">
                <LinkIcon className="size-4 shrink-0" />
                <span className="truncate">{data.website}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatChip
            label="Repos"
            value={formatCompactNumber(data.publicRepos)}
          />
          <StatChip
            label="Followers"
            value={formatCompactNumber(data.followers)}
          />
          <StatChip
            label="Following"
            value={formatCompactNumber(data.following)}
          />
          <StatChip
            label="Power"
            value={formatCompactNumber(data.level * 125)}
          />
        </div>
      </div>
    </PokemonFrame>
  );
}
