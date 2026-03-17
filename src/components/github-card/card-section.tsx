import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  children: ReactNode;
  delayClassName?: string;
  className?: string;
};

export function CardSection({ children, delayClassName, className }: Props) {
  return (
    <div className={cn("animate-card-enter", delayClassName, className)}>
      {children}
    </div>
  );
}
