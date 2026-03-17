import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy do GitHub Trainer Card.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-4xl border border-border/70 bg-surface-glass-strong p-6 backdrop-blur-sm sm:p-8">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>

        <div className="mt-6 grid gap-4 text-sm leading-7 text-text-soft sm:text-base">
          <p>
            This project uses Vercel Web Analytics to understand overall usage
            of the website.
          </p>
          <p>
            According to Vercel documentation, this analytics product does not
            use cookies and works with anonymized data.
          </p>
          <p>
            This website also requests public data from the GitHub API when a
            username is searched or compared.
          </p>
          <p>
            No private GitHub data is requested by this project.
          </p>
          <p>
            If this policy changes in the future, this page should be updated.
          </p>
        </div>
      </div>
    </main>
  );
}
