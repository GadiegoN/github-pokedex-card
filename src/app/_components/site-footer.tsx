import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-surface-glass px-4 py-5 text-sm text-muted-foreground backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-center sm:text-left">
          Desenvolvido por{" "}
          <a
            href="https://www.gadiego.com.br/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-foreground transition-colors hover:text-accent"
          >
            Gadiego Nogueira
          </a>
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/GadiegoN/github-pokedex-card"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Pokedex GitHub
          </a>
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
