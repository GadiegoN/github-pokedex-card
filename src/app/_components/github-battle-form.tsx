"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidGithubUsername } from "@/lib/github/is-valid-github-username";

type Props = {
  initialLeftUsername?: string;
  initialRightUsername?: string;
};

export function GithubBattleForm({
  initialLeftUsername = "",
  initialRightUsername = "",
}: Props) {
  const router = useRouter();
  const [leftUsername, setLeftUsername] = useState(initialLeftUsername);
  const [rightUsername, setRightUsername] = useState(initialRightUsername);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const normalizedLeftUsername = leftUsername.trim().toLowerCase();
  const normalizedRightUsername = rightUsername.trim().toLowerCase();
  const hasDuplicateUsernames =
    normalizedLeftUsername !== "" &&
    normalizedRightUsername !== "" &&
    normalizedLeftUsername === normalizedRightUsername;
  const displayedError =
    error ||
    (hasDuplicateUsernames
      ? "Escolha dois perfis diferentes para a batalha."
      : "");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const leftValue = leftUsername.trim();
    const rightValue = rightUsername.trim();

    if (!leftValue || !rightValue) {
      setError("Informe os dois usernames para iniciar a batalha.");
      return;
    }

    if (
      !isValidGithubUsername(leftValue) ||
      !isValidGithubUsername(rightValue)
    ) {
      setError(
        "Cada username deve ter de 1 a 39 letras, números ou hífens e não pode começar ou terminar com hífen.",
      );
      return;
    }

    if (hasDuplicateUsernames) {
      setError("Escolha dois perfis diferentes para a batalha.");
      return;
    }

    setError("");
    startTransition(() => {
      router.push(
        `/battle/${encodeURIComponent(leftValue)}/vs/${encodeURIComponent(rightValue)}`,
      );
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-5 rounded-4xl border border-border/70 bg-surface-glass p-4 backdrop-blur-sm"
    >
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-muted-foreground">
        Arena de Batalha
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
        <Input
          aria-label="Primeiro username do GitHub"
          aria-invalid={Boolean(displayedError)}
          aria-describedby={
            displayedError ? "github-battle-form-error" : undefined
          }
          autoCapitalize="none"
          autoComplete="off"
          disabled={isPending}
          placeholder="Primeiro username"
          spellCheck={false}
          value={leftUsername}
          onChange={(event) => {
            setLeftUsername(event.target.value);
            if (error) setError("");
          }}
        />
        <span className="text-center text-sm font-black tracking-[0.24em] text-text-muted">
          VS
        </span>
        <Input
          aria-label="Segundo username do GitHub"
          aria-invalid={Boolean(displayedError)}
          aria-describedby={
            displayedError ? "github-battle-form-error" : undefined
          }
          autoCapitalize="none"
          autoComplete="off"
          disabled={isPending}
          placeholder="Segundo username"
          spellCheck={false}
          value={rightUsername}
          onChange={(event) => {
            setRightUsername(event.target.value);
            if (error) setError("");
          }}
        />
      </div>
      {displayedError ? (
        <p
          id="github-battle-form-error"
          className="mt-3 text-sm text-danger"
          role="alert"
        >
          {displayedError}
        </p>
      ) : null}
      <div className="mt-3 flex justify-center lg:justify-start">
        <Button
          type="submit"
          variant="secondary"
          disabled={isPending || hasDuplicateUsernames}
          className="w-full sm:w-auto sm:min-w-40"
        >
          {isPending ? (
            <>
              <LoaderCircle
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
              Preparando batalha...
            </>
          ) : (
            "Comparar perfis"
          )}
        </Button>
      </div>
    </form>
  );
}
