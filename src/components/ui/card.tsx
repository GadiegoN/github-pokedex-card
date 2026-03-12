import * as React from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-4xl border border-border bg-surface", className)}
      {...props}
    />
  );
}
