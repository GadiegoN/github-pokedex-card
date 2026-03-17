type Props = {
  status: "idle" | "loading" | "success" | "error";
};

const labels = {
  idle: "Baixar PNG",
  loading: "Gerando imagem...",
  success: "PNG pronto",
  error: "Falha ao gerar",
} as const;

export function DownloadButtonLabel({ status }: Props) {
  return labels[status];
}
