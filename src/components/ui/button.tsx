import * as React from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "soft" | "danger";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-[0_12px_32px_var(--shadow-color)]",
  secondary:
    "border border-border-strong bg-surface text-foreground shadow-[0_12px_24px_color-mix(in_srgb,var(--shadow-color)_70%,transparent)]",
  soft:
    "border border-transparent bg-accent-soft text-accent-soft-foreground shadow-[0_10px_24px_color-mix(in_srgb,var(--button-glow)_55%,transparent)]",
  danger:
    "border border-transparent bg-danger text-danger-foreground shadow-[0_12px_28px_color-mix(in_srgb,var(--danger)_38%,transparent)]",
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variantClassNames[variant],
        className,
      )}
      {...props}
    />
  );
}
