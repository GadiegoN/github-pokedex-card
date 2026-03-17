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
        "group relative overflow-hidden rounded-4xl border-10 shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1",
        "bg-[linear-gradient(180deg,#fff7cc_0%,#ffd86b_48%,#ffbe3b_100%)] border-[#f6d365]",
        frameClassName,
        className,
      )}
    >
      <PokemonFrameDecor />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
