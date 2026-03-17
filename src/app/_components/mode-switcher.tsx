import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type Props = {
  mode: "card" | "battle";
};

function getLinkClassName(isActive: boolean) {
  return cn(
    "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02]",
    isActive
      ? "bg-foreground text-background shadow-[0_12px_32px_var(--shadow-color)]"
      : "border border-border-strong bg-surface text-foreground shadow-[0_12px_24px_color-mix(in_srgb,var(--shadow-color)_70%,transparent)]",
  );
}

export function ModeSwitcher({ mode }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
      <Link href="/" className={getLinkClassName(mode === "card")}>
        Gerar Card
      </Link>
      <Link href="/battle" className={getLinkClassName(mode === "battle")}>
        Battle Mode
      </Link>
    </div>
  );
}
