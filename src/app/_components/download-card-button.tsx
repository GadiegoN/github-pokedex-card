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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function handleDownload() {
    const element = document.getElementById(targetId);
    if (!element) return;

    try {
      setStatus("loading");

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      setStatus("success");
      await sleep(1400);
      setStatus("idle");
    } catch {
      setStatus("error");
      await sleep(1800);
      setStatus("idle");
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={status === "loading"}
      className="animate-button-glow min-w-40"
    >
      <DownloadButtonLabel status={status} />
    </Button>
  );
}
