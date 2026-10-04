import Image from "next/image";

type Props = {
  avatarUrl: string;
  displayName: string;
  mediaClassName: string;
};

export function GithubProfileCardPortrait({
  avatarUrl,
  displayName,
  mediaClassName,
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border-4 border-surface-overlay-strong p-1 ${mediaClassName}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--surface)_0%,transparent_55%)]" />

        <Image
          src={avatarUrl}
          alt={displayName}
          fill
          sizes="420px"
          className="object-cover object-top"
          priority
        />
      </div>
    </div>
  );
}
