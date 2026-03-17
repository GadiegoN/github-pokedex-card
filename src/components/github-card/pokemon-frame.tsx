import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  frameClassName?: string;
};

export function PokemonFrame({ children, className, frameClassName }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-4xl border-10 shadow-[0_24px_80px_rgba(0,0,0,0.28)]",
        "bg-[linear-gradient(180deg,#fff7cc_0%,#ffd86b_48%,#ffbe3b_100%)] border-[#f6d365]",
        frameClassName,
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-white/35 blur-2xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
