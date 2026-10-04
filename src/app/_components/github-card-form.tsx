"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidGithubUsername } from "@/lib/github/is-valid-github-username";

type Props = {
  initialUsername?: string;
};

export function GithubCardForm({ initialUsername = "" }: Props) {
  const router = useRouter();
  const [username, setUsername] = useState(initialUsername);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = username.trim();

    if (!value) {
      setError("Informe um username do GitHub.");
      return;
    }

    if (!isValidGithubUsername(value)) {
      setError(
        "Use de 1 a 39 letras, números ou hífens, sem hífen no início ou no fim.",
      );
      return;
    }

    setError("");
    startTransition(() => {
      router.push(`/card/${encodeURIComponent(value)}`);
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row"
    >
      <Input
        aria-label="Username do GitHub"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "github-card-form-error" : undefined}
        autoCapitalize="none"
        autoComplete="off"
        disabled={isPending}
        placeholder="Digite o username do GitHub"
        spellCheck={false}
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
          if (error) setError("");
        }}
        className="w-full"
      />

      <Button
        type="submit"
        variant="soft"
        disabled={isPending}
        className="w-full sm:w-auto sm:min-w-36"
      >
        {isPending ? (
          <>
            <LoaderCircle
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
            Buscando perfil...
          </>
        ) : (
          "Gerar card"
        )}
      </Button>
      {error ? (
        <p
          id="github-card-form-error"
          className="text-left text-sm text-danger sm:basis-full"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
