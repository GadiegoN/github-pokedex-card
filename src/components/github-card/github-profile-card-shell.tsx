import type { GithubProfileCardData } from "@/lib/github/types";
import { GithubProfileCard } from "./github-profile-card";

type Props = {
  data: GithubProfileCardData | null;
};

export function GithubProfileCardShell({ data }: Props) {
  if (!data) {
    return (
      <div className="flex min-h-170 items-center justify-center rounded-4xl border border-dashed border-border bg-surface p-8">
        <div className="max-w-sm text-center">
          <h2 className="text-xl font-bold text-foreground">
            Seu card aparece aqui
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Digite um username do GitHub para gerar um card estilizado, pronto
            para baixar e compartilhar.
          </p>
        </div>
      </div>
    );
  }

  return <GithubProfileCard data={data} />;
}
