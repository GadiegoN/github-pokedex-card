import type { GithubProfileCardData } from "@/lib/github/types";
import { GithubProfileCardShell } from "./github-profile-card-shell";

type Props = {
  data: GithubProfileCardData | null;
};

export function GithubProfileCardPreview({ data }: Props) {
  return (
    <div className="mx-auto flex w-full justify-center">
      <div id="github-profile-card-export" className="w-full max-w-105 min-w-0">
        <GithubProfileCardShell data={data} />
      </div>
    </div>
  );
}
