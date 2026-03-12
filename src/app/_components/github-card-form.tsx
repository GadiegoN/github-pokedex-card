"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function GithubCardForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState(searchParams.get("username") ?? "");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = username.trim();

    if (!value) {
      router.push("/");
      return;
    }

    router.push(`/?username=${encodeURIComponent(value)}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        placeholder="Digite o username do GitHub"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <Button type="submit" className="sm:min-w-36">
        Gerar card
      </Button>
    </form>
  );
}
