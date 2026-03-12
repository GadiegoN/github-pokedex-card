import { Suspense } from "react";
import Image from "next/image";
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
    <main className="min-h-dvh bg-background px-4 py-6 text-foreground sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:items-center">
        <section className="order-1 flex flex-col justify-center">
          <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5 lg:justify-start">
              <div className="relative size-20 sm:size-24">
                <Image
                  src="/logo.png"
                  alt="GitHub Trainer Card"
                  fill
                  priority
                  className="object-contain drop-shadow-xl"
                />
              </div>

              <Badge className="bg-[linear-gradient(180deg,#8be9fd_0%,#5fd1ff_100%)] px-4 py-2 text-white">
                SSR + Next.js + Tailwind v4
              </Badge>
            </div>

            <h1 className="mt-6 text-balance text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Crie um card de GitHub com energia de carta Pokémon
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base lg:mx-0 lg:text-lg">
              Busque estatísticas públicas do perfil, monte um card estilizado e
              exporte uma imagem pronta para compartilhar.
            </p>

            <div className="mt-8">
              <Suspense>
                <GithubCardForm />
              </Suspense>
            </div>

            {profile ? (
              <div className="mt-4 flex justify-center lg:justify-start">
                <DownloadCardButton
                  targetId="github-profile-card-export"
                  fileName={`${profile.username}-trainer-card.png`}
                />
              </div>
            ) : null}
          </div>
        </section>

        <section className="order-2 flex items-center justify-center">
          <GithubProfileCardPreview data={profile} />
        </section>
      </div>
    </main>
  );
}
