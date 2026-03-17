import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { PokemonFrameDecor } from "./pokemon-frame-decor";

type Props = {
  children: ReactNode;
  className?: string;
  frameClassName?: string;
};

export function PokemonFrame({ children, className, frameClassName }: Props) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-4xl border-10 shadow-[0_24px_80px_var(--shadow-color)] transition-transform duration-300 hover:-translate-y-1",
        "border-[var(--card-frame-border)] bg-[image:var(--card-frame-bg)]",
        frameClassName,
        className,
      )}
    >
      <PokemonFrameDecor />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
