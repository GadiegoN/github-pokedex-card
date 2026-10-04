"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { sleep } from "@/lib/utils/sleep";
import { DownloadButtonLabel } from "./download-button-label";

type Props = {
  targetId: string;
  fileName: string;
};

export function DownloadCardButton({ targetId, fileName }: Props) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  async function handleDownload() {
    const element = document.getElementById(targetId);
    if (!element) {
      setStatus("error");
      setFeedback("Não foi possível localizar o card para exportar. Recarregue a página e tente novamente.");
      return;
    }

    try {
      setStatus("loading");
      setFeedback("");

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      setStatus("success");
      setFeedback("Imagem baixada com sucesso.");
      await sleep(1400);
      setStatus("idle");
      setFeedback("");
    } catch (error) {
      console.error("Falha ao exportar o card como imagem.", error);
      setStatus("error");
      setFeedback(
        "Não foi possível gerar a imagem. Tente novamente ou use outro navegador.",
      );
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:items-start">
      <Button
        type="button"
        onClick={handleDownload}
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        variant="primary"
      >
        <DownloadButtonLabel status={status} />
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
