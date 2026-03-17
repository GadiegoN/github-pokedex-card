import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GithubCardForm } from "./github-card-form";

type Props = {
  initialUsername?: string;
};

export function GithubCardPageHero({ initialUsername = "" }: Props) {
  return (
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
        Crie um card de GitHub com energia de carta Pokemon
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base lg:mx-0 lg:text-lg">
        Busque estatisticas publicas do perfil, monte um card estilizado e
        exporte uma imagem pronta para compartilhar.
      </p>

      <div className="mt-8">
        <GithubCardForm initialUsername={initialUsername} />
      </div>
    </div>
  );
}
