import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GithubCardForm } from "./github-card-form";
import { ModeSwitcher } from "./mode-switcher";

type Props = {
  initialUsername?: string;
};

export function GithubCardPageHero({ initialUsername = "" }: Props) {
  return (
    <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
      <ModeSwitcher mode="card" />

      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5 lg:justify-start">
        <div className="relative size-20 sm:size-24">
          <Image
            src="/logo.png"
            alt="GitHub Trainer Card"
            fill
            priority
            sizes="(max-width: 640px) 80px, 96px"
            className="object-contain drop-shadow-xl"
          />
        </div>

        <Badge className="border-transparent bg-accent-soft px-4 py-2 text-accent-soft-foreground">
          Card Mode
        </Badge>
      </div>

      <h1 className="mt-6 text-balance text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
        Transforme seu GitHub em uma ficha de personagem
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base lg:mx-0 lg:text-lg">
        Descubra sua classe, atributos e progressão a partir dos dados públicos
        do seu perfil. Baixe e compartilhe sua ficha.
      </p>

      <div className="mt-8">
        <GithubCardForm initialUsername={initialUsername} />
      </div>
    </div>
  );
}
