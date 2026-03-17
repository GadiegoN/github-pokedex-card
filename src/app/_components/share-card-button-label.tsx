type Props = {
  status: "idle" | "sharing" | "success" | "error";
};

const labels = {
  idle: "Compartilhar",
  sharing: "Compartilhando...",
  success: "Link copiado",
  error: "Falha ao compartilhar",
} as const;

export function ShareCardButtonLabel({ status }: Props) {
  return labels[status];
}
