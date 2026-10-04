import type { DeveloperLanguage } from "@/lib/github/developer/types";

type Props = {
  languages: DeveloperLanguage[];
};

export function GithubProfileCardLanguages({ languages }: Props) {
  return (
    <section
      className="rounded-3xl bg-surface-glass-strong p-3"
      aria-label="Principais linguagens"
    >
      <h3 className="text-[10px] font-black uppercase tracking-[0.18em] text-text-muted">
        Linguagens
      </h3>
      {languages.length > 0 ? (
        <ul className="mt-2 grid gap-2">
          {languages.map((language) => (
            <li
              key={language.name}
              className="grid gap-1"
              aria-label={`${language.name}: ${language.repositoryCount} repositórios, ${language.percentage}%`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="truncate text-[10px] font-semibold text-text-soft">
                  {language.name}
                </span>
                <span className="text-[10px] tabular-nums text-text-muted">
                  {language.percentage}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-overlay-strong">
                <div
                  className="h-full rounded-full bg-accent-soft"
                  style={{ width: `${language.percentage}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-xs text-text-muted">
          Nenhuma linguagem detectada nos repositórios públicos analisados.
        </p>
      )}
    </section>
  );
}
