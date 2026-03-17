"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const normalizedLeftUsername = leftUsername.trim().toLowerCase();
  const normalizedRightUsername = rightUsername.trim().toLowerCase();
  const hasDuplicateUsernames =
    normalizedLeftUsername !== "" &&
    normalizedRightUsername !== "" &&
    normalizedLeftUsername === normalizedRightUsername;

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const leftValue = leftUsername.trim();
    const rightValue = rightUsername.trim();

    if (!leftValue || !rightValue || hasDuplicateUsernames) {
      return;
    }

    router.push(
      `/battle/${encodeURIComponent(leftValue)}/vs/${encodeURIComponent(rightValue)}`,
    );
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
          placeholder="Primeiro username"
          value={leftUsername}
          onChange={(event) => setLeftUsername(event.target.value)}
        />
        <span className="text-center text-sm font-black tracking-[0.24em] text-text-muted">
          VS
        </span>
        <Input
          placeholder="Segundo username"
          value={rightUsername}
          onChange={(event) => setRightUsername(event.target.value)}
        />
      </div>
      {hasDuplicateUsernames ? (
        <p className="mt-3 text-sm text-danger">
          Escolha dois perfis diferentes para a batalha.
        </p>
      ) : null}
      <div className="mt-3 flex justify-center lg:justify-start">
        <Button
          type="submit"
          variant="secondary"
          disabled={hasDuplicateUsernames}
          className="w-full sm:w-auto sm:min-w-40"
        >
          Comparar perfis
        </Button>
      </div>
    </form>
  );
}
