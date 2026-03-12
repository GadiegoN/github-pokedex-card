import { Suspense } from "react";
import { DownloadCardButton } from "./_components/download-card-button";
import { GithubCardForm } from "./_components/github-card-form";
import { GithubProfileCardPreview } from "@/components/github-card/github-profile-card-preview";
import { getGithubProfileCardData } from "@/lib/github/api";
import { Badge } from "@/components/ui/badge";

type PageProps = {
  searchParams: Promise<{
    username?: string;
  }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const username = params.username?.trim() ?? "";
  const profile = username ? await getGithubProfileCardData(username) : null;

  return (
    <main className="min-h-dvh bg-background px-4 py-8 text-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex flex-col justify-center">
          <div className="max-w-2xl">
            <Badge className="shrink-0 bg-[linear-gradient(180deg,#8be9fd_0%,#5fd1ff_100%)] text-white my-4">
              SSR + Next.js + Tailwind v4
            </Badge>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
              Crie um card de GitHub com energia de carta Pokémon
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Busque estatísticas públicas do perfil, monte um card estilizado e
              exporte uma imagem pronta para compartilhar.
            </p>

            <div className="mt-8">
              <Suspense>
                <GithubCardForm />
              </Suspense>
            </div>

            {profile ? (
              <div className="mt-4">
                <DownloadCardButton
                  targetId="github-profile-card-export"
                  fileName={`${profile.username}-trainer-card.png`}
                />
              </div>
            ) : null}
          </div>
        </section>

        <section className="flex items-center justify-center">
          <GithubProfileCardPreview data={profile} />
        </section>
      </div>
    </main>
  );
}
