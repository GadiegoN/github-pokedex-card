"use client";

import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type RouteFeedbackProps = {
  title: string;
  description: string;
  actionLabel?: string;
  href?: string;
  onRetry?: () => void;
};

export function RouteLoadingFeedback({ message }: { message: string }) {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-6 text-foreground">
      <div
        className="flex items-center gap-3 rounded-3xl border border-border/70 bg-surface-glass px-6 py-5 shadow-xl backdrop-blur-sm"
        role="status"
        aria-live="polite"
      >
        <LoaderCircle
          className="size-5 animate-spin text-accent"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      </div>
    </main>
  );
}

export function RouteFeedback({
  title,
  description,
  actionLabel,
  href,
  onRetry,
}: RouteFeedbackProps) {
  return (
    <main className="grid min-h-dvh place-items-center bg-background px-6 py-12 text-foreground">
      <section className="w-full max-w-lg rounded-4xl border border-border/70 bg-surface-glass p-8 text-center shadow-xl backdrop-blur-sm">
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        {actionLabel && href ? (
          <Link
            href={href}
            className={cn(
              "mt-6 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]",
              "bg-accent text-accent-foreground shadow-[0_12px_32px_var(--shadow-color)]",
            )}
          >
            {actionLabel}
          </Link>
        ) : null}
        {actionLabel && onRetry ? (
          <Button
            type="button"
            onClick={onRetry}
            variant="primary"
            className="mt-6"
          >
            {actionLabel}
          </Button>
        ) : null}
      </section>
    </main>
  );
}
