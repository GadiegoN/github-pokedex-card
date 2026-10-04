"use client";

import { RouteFeedback } from "@/app/_components/route-feedback";

export default function CardPageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteFeedback
      title="Não foi possível carregar o card"
      description="O GitHub pode estar temporariamente indisponível ou ter atingido o limite de consultas. Tente novamente em instantes."
      actionLabel="Tentar novamente"
      onRetry={reset}
    />
  );
}
