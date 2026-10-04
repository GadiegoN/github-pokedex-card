"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { DeveloperClassId } from "@/lib/github/developer/types";
import type { GithubProfileCardData } from "@/lib/github/types";
import {
  buildDeveloperSnapshot,
  upsertDeveloperSnapshot,
} from "@/lib/github/history/build-developer-snapshot";
import type {
  DeveloperHistory,
  DeveloperSnapshot,
} from "@/lib/github/history/types";

type Props = {
  profile: GithubProfileCardData;
};

type HistoryState = {
  snapshots: DeveloperSnapshot[];
  message: string;
  isError: boolean;
};

const EMPTY_HISTORY: DeveloperHistory = {
  schemaVersion: 1,
  snapshots: [],
};
const DEVELOPER_CLASS_IDS: DeveloperClassId[] = [
  "open-source-paladin",
  "ai-alchemist",
  "data-mage",
  "devops-engineer",
  "mobile-ranger",
  "full-stack-adventurer",
  "frontend-knight",
  "backend-guardian",
  "code-wizard",
];

function isDeveloperClassId(value: string): value is DeveloperClassId {
  return DEVELOPER_CLASS_IDS.some((id) => id === value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isSnapshot(value: unknown): value is DeveloperSnapshot {
  if (!isRecord(value) || !isRecord(value.stats)) {
    return false;
  }

  const stats = value.stats;
  const rarity = value.rarity;

  return (
    Number.isInteger(value.year) &&
    typeof value.year === "number" &&
    value.year > 0 &&
    typeof value.level === "number" &&
    Number.isInteger(value.level) &&
    value.level > 0 &&
    typeof value.totalXp === "number" &&
    Number.isFinite(value.totalXp) &&
    value.totalXp >= 0 &&
    typeof value.developerClassId === "string" &&
    isDeveloperClassId(value.developerClassId) &&
    typeof value.developerClassName === "string" &&
    (rarity === "common" ||
      rarity === "uncommon" ||
      rarity === "rare" ||
      rarity === "epic" ||
      rarity === "legendary") &&
    ["coding", "experience", "knowledge", "social", "consistency"].every(
      (key) =>
        typeof stats[key] === "number" &&
        Number.isFinite(stats[key]) &&
        stats[key] >= 0 &&
        stats[key] <= 100,
    )
  );
}

function parseHistory(value: unknown): DeveloperHistory {
  if (
    !isRecord(value) ||
    value.schemaVersion !== 1 ||
    !Array.isArray(value.snapshots) ||
    !value.snapshots.every(isSnapshot)
  ) {
    throw new Error("O histórico salvo está inválido ou usa uma versão incompatível.");
  }

  return {
    schemaVersion: 1,
    snapshots: [...value.snapshots].sort((left, right) => left.year - right.year),
  };
}

function getStorageKey(username: string): string {
  return `github-developer-history:v1:${username.toLowerCase()}`;
}

function toHistoryState(
  history: DeveloperHistory,
  message: string,
  isError = false,
): HistoryState {
  return { snapshots: history.snapshots, message, isError };
}

export function DeveloperHistoryPanel({ profile }: Props) {
  const [state, setState] = useState<HistoryState>({
    snapshots: [],
    message: "Carregando histórico local...",
    isError: false,
  });
  const storageKey = getStorageKey(profile.username);

  useEffect(() => {
    let isActive = true;

    try {
      const storedValue = window.localStorage.getItem(storageKey);
      const history = storedValue
        ? parseHistory(JSON.parse(storedValue))
        : EMPTY_HISTORY;
      const updatedHistory = upsertDeveloperSnapshot(
        history,
        buildDeveloperSnapshot(profile),
      );

      window.localStorage.setItem(
        storageKey,
        JSON.stringify(updatedHistory),
      );
      window.setTimeout(() => {
        if (isActive) {
          setState(
            toHistoryState(
              updatedHistory,
              "Este ano é atualizado quando você visita esta ficha.",
            ),
          );
        }
      }, 0);
    } catch (error) {
      console.error("Não foi possível salvar o histórico neste navegador.", error);
      window.setTimeout(() => {
        if (isActive) {
          setState({
            snapshots: [],
            message:
              error instanceof SyntaxError ||
              (error instanceof Error &&
                error.message.includes("histórico salvo"))
                ? "O histórico local está corrompido. Apague-o para começar novamente."
                : "Não foi possível acessar o histórico local neste navegador.",
            isError: true,
          });
        }
      }, 0);
    }

    return () => {
      isActive = false;
    };
  }, [profile, storageKey]);

  function clearHistory() {
    try {
      window.localStorage.removeItem(storageKey);
      setState({
        snapshots: [],
        message: "Histórico local apagado.",
        isError: false,
      });
    } catch (error) {
      console.error("Não foi possível apagar o histórico local.", error);
      setState({
        ...state,
        message: "Não foi possível apagar o histórico deste navegador.",
        isError: true,
      });
    }
  }

  return (
    <section
      className="w-full max-w-105 rounded-4xl border border-border/70 bg-surface-glass-strong p-5 backdrop-blur-sm"
      aria-labelledby="developer-history-heading"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            id="developer-history-heading"
            className="text-lg font-black text-foreground"
          >
            Evolução anual
          </h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Salvo somente neste navegador, sem enviar snapshots ao servidor.
          </p>
        </div>
        {state.snapshots.length > 0 || state.isError ? (
          <Button
            type="button"
            variant="soft"
            className="h-9 shrink-0 px-3 text-xs"
            onClick={clearHistory}
          >
            Apagar histórico
          </Button>
        ) : null}
      </div>

      {state.snapshots.length > 0 ? (
        <ol className="mt-4 grid gap-2">
          {state.snapshots.map((snapshot) => (
            <li
              key={snapshot.year}
              className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-surface-overlay px-4 py-3"
            >
              <span className="font-black text-text-strong">
                {snapshot.year}
              </span>
              <span className="text-sm font-semibold text-text-soft">
                Nível {snapshot.level} ·{" "}
                {snapshot.totalXp.toLocaleString("pt-BR")} XP
              </span>
              <span className="text-xs text-text-muted">
                {snapshot.developerClassName} · {snapshot.rarity}
              </span>
            </li>
          ))}
        </ol>
      ) : null}

      <p
        className={`mt-3 text-xs ${
          state.isError ? "text-danger" : "text-muted-foreground"
        }`}
        role={state.isError ? "alert" : "status"}
        aria-live={state.isError ? "assertive" : "polite"}
      >
        {state.message}
      </p>
    </section>
  );
}
