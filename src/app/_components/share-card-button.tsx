"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sleep } from "@/lib/utils/sleep";
import { ShareCardButtonLabel } from "./share-card-button-label";

export function ShareCardButton() {
  const [status, setStatus] = useState<
    "idle" | "sharing" | "success" | "error"
  >("idle");

  async function copyCurrentUrl(url: string) {
    await navigator.clipboard.writeText(url);
  }

  async function handleShare() {
    const url = window.location.href;

    try {
      setStatus("sharing");

      if (navigator.share) {
        await navigator.share({
          title: "GitHub Trainer Card",
          text: "Veja esse card de GitHub.",
          url,
        });
      } else {
        await copyCurrentUrl(url);
      }

      setStatus("success");
      await sleep(1400);
      setStatus("idle");
    } catch {
      try {
        await copyCurrentUrl(url);
        setStatus("success");
        await sleep(1400);
        setStatus("idle");
      } catch {
        setStatus("error");
        await sleep(1800);
        setStatus("idle");
      }
    }
  }

  return (
    <Button
      type="button"
      onClick={handleShare}
      disabled={status === "sharing"}
      variant="secondary"
    >
      <ShareCardButtonLabel status={status} />
    </Button>
  );
}
