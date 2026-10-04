"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sleep } from "@/lib/utils/sleep";
import { ShareCardButtonLabel } from "./share-card-button-label";

export function ShareCardButton() {
  const [status, setStatus] = useState<
    "idle" | "sharing" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  async function copyCurrentUrl(url: string) {
    await navigator.clipboard.writeText(url);
  }

  async function handleShare() {
    const url = window.location.href;

    try {
      setStatus("sharing");
      setFeedback("");

      if (navigator.share) {
        try {
          await navigator.share({
            title: "GitHub Trainer Card",
            text: "Veja esse card de GitHub.",
            url,
          });
          setFeedback("Link compartilhado.");
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            setStatus("idle");
            return;
          }

          await copyCurrentUrl(url);
          setFeedback("Link copiado para a área de transferência.");
        }
      } else {
        await copyCurrentUrl(url);
        setFeedback("Link copiado para a área de transferência.");
      }

      setStatus("success");
      await sleep(1400);
      setStatus("idle");
      setFeedback("");
    } catch (error) {
      console.error("Falha ao compartilhar ou copiar o link do card.", error);
      setStatus("error");
      setFeedback(
        "Não foi possível compartilhar nem copiar o link. Verifique as permissões do navegador e tente novamente.",
      );
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:items-start">
      <Button
        type="button"
        onClick={handleShare}
        disabled={status === "sharing"}
        aria-busy={status === "sharing"}
        variant="secondary"
      >
        <ShareCardButtonLabel status={status} />
      </Button>
      {feedback ? (
        <p
          className={`max-w-xs text-center text-xs sm:text-left ${
            status === "error" ? "text-danger" : "text-muted-foreground"
          }`}
          role={status === "error" ? "alert" : "status"}
          aria-live={status === "error" ? "assertive" : "polite"}
        >
          {feedback}
        </p>
      ) : null}
    </div>
  );
}
