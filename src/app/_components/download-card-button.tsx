"use client";

import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";

type Props = {
  targetId: string;
  fileName: string;
};

export function DownloadCardButton({ targetId, fileName }: Props) {
  async function handleDownload() {
    const element = document.getElementById(targetId);
    if (!element) return;

    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    link.click();
  }

  return <Button onClick={handleDownload}>Baixar PNG</Button>;
}
