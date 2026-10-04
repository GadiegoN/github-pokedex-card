import { RouteFeedback } from "@/app/_components/route-feedback";

export default function BattleNotFound() {
  return (
    <RouteFeedback
      title="Não foi possível encontrar os perfis"
      description="Confira os usernames. A batalha exige dois perfis públicos e diferentes do GitHub."
      actionLabel="Voltar à batalha"
      href="/battle"
    />
  );
}
