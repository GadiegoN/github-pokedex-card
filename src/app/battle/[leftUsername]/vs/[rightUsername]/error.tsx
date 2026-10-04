"use client";

import { RouteFeedback } from "@/app/_components/route-feedback";

export default function BattlePageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteFeedback
      title="Não foi possível carregar a batalha"
      description="O GitHub pode estar temporariamente indisponível. Tente novamente em instantes."
      actionLabel="Tentar novamente"
      onRetry={reset}
    />
  );
}
