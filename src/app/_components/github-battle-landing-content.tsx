import { GithubBattlePageHero } from "./github-battle-page-hero";

export function GithubBattleLandingContent() {
  return (
    <main className="min-h-dvh bg-background px-4 py-6 text-foreground sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
        <section className="order-1 flex flex-col justify-center">
          <GithubBattlePageHero />
        </section>

        <section className="order-2">
          <div className="rounded-4xl border border-border/70 bg-surface-glass-strong p-6 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
              Como funciona
            </p>
            <div className="mt-4 grid gap-4 text-sm leading-7 text-text-soft sm:text-base">
              <p>Informe dois usernames do GitHub para iniciar o duelo.</p>
              <p>
                O modo battle compara level, followers, repositorios, anos de
                conta e power total.
              </p>
              <p>
                Depois voce pode compartilhar o link ou baixar a imagem do
                confronto.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
