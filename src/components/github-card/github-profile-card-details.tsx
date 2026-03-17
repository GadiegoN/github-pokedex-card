import {
  BriefcaseBusiness,
  Github,
  Link as LinkIcon,
  MapPin,
} from "lucide-react";
import type { GithubProfileCardData } from "@/lib/github/types";

type Props = {
  data: GithubProfileCardData;
};

export function GithubProfileCardDetails({ data }: Props) {
  return (
    <div className="mt-4 rounded-3xl bg-white/60 p-4 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5">
      <p className="line-clamp-2 text-sm leading-5 text-black/80">{data.bio}</p>

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
  );
}
