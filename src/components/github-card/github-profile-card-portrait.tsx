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
      className={`mt-4 overflow-hidden rounded-[1.75rem] border-[6px] border-surface-overlay-strong p-3 ${mediaClassName}`}
    >
      <div className="relative aspect-[4/4.35] overflow-hidden rounded-[1.25rem] bg-surface-overlay">
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
