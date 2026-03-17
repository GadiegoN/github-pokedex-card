import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GithubBattleForm } from "./github-battle-form";
import { ModeSwitcher } from "./mode-switcher";

type Props = {
  initialLeftUsername?: string;
  initialRightUsername?: string;
};

export function GithubBattlePageHero({
  initialLeftUsername = "",
  initialRightUsername = "",
}: Props) {
  return (
    <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
      <ModeSwitcher mode="battle" />

      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5 lg:justify-start">
        <div className="relative size-20 sm:size-24">
          <Image
            src="/logo.png"
            alt="GitHub Trainer Card Battle"
            fill
            priority
            className="object-contain drop-shadow-xl"
          />
        </div>

        <Badge className="border-transparent bg-danger px-4 py-2 text-danger-foreground">
          Battle Mode
        </Badge>
      </div>

      <h1 className="mt-6 text-balance text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
        Coloque dois perfis de GitHub para duelar
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base lg:mx-0 lg:text-lg">
        Compare level, seguidores, repositorios, atividade recente e veja quem
        vence o duelo.
      </p>

      <GithubBattleForm
        initialLeftUsername={initialLeftUsername}
        initialRightUsername={initialRightUsername}
      />
    </div>
  );
}
