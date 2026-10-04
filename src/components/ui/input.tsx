import * as React from "react";
import { cn } from "@/lib/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-full border px-4 text-sm outline-none transition",
        "border-border bg-surface text-foreground",
        "placeholder:text-muted-foreground focus:border-accent",
        "aria-invalid:border-danger aria-invalid:focus:border-danger",
        "disabled:cursor-wait disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
