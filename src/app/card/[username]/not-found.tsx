import { RouteFeedback } from "@/app/_components/route-feedback";

export default function CardNotFound() {
  return (
    <RouteFeedback
      title="Perfil não encontrado"
      description="Confira se o username está correto e se o perfil do GitHub é público."
      actionLabel="Tentar outro perfil"
      href="/"
    />
  );
}
