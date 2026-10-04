import type {
  DeveloperClass,
  DeveloperClassId,
  DeveloperProfile,
} from "./types";

type ClassCandidate = {
  id: DeveloperClassId;
  name: string;
  description: string;
  icon: DeveloperClass["icon"];
  evaluate: (profile: DeveloperProfile) => DeveloperClass | null;
};

function getLanguageCounts(profile: DeveloperProfile): Map<string, number> {
  const counts = new Map<string, number>();

  for (const repository of profile.repositories) {
    if (repository.isFork || !repository.language) {
      continue;
    }

    const normalizedLanguage = repository.language.toLowerCase();
    counts.set(
      normalizedLanguage,
      (counts.get(normalizedLanguage) ?? 0) + 1,
    );
  }

  return counts;
}

function getDisplayLanguage(
  profile: DeveloperProfile,
  normalizedLanguage: string,
): string {
  return (
    profile.repositories.find(
      (repository) =>
        !repository.isFork &&
        repository.language?.toLowerCase() === normalizedLanguage,
    )?.language ?? normalizedLanguage
  );
}

function getRepositorySignals(profile: DeveloperProfile): string[] {
  return profile.repositories
    .filter((repository) => !repository.isFork)
    .flatMap((repository) => [
      repository.name ?? "",
      repository.description ?? "",
      ...(repository.topics ?? []),
    ])
    .map((signal) => signal.toLowerCase());
}

function createLanguageCandidate(
  definition: Omit<ClassCandidate, "evaluate">,
  languages: string[],
  descriptionFor: (matched: string[]) => string,
  minimum = 1,
): ClassCandidate {
  return {
    ...definition,
    evaluate(profile) {
      const counts = getLanguageCounts(profile);
      const matched = languages.filter((language) => counts.has(language));

      if (matched.length < minimum) {
        return null;
      }

      const displayNames = matched.map((language) =>
        getDisplayLanguage(profile, language),
      );
      const score = Math.min(
        100,
        60 + matched.reduce((total, language) => total + (counts.get(language) ?? 0) * 5, 0),
      );

      return {
        id: definition.id,
        name: definition.name,
        description: definition.description,
        icon: definition.icon,
        criteria: [descriptionFor(displayNames)],
        score,
      };
    },
  };
}

const classCandidates: ClassCandidate[] = [
  {
    id: "open-source-paladin",
    name: "Open Source Paladin",
    description: "Seus projetos públicos conquistaram estrelas e forks da comunidade.",
    icon: "heart-handshake",
    evaluate(profile) {
      const repositories = profile.repositories.filter(
        (repository) => !repository.isFork,
      );
      const stars = repositories.reduce(
        (total, repository) => total + Math.max(0, repository.stars),
        0,
      );
      const forks = repositories.reduce(
        (total, repository) => total + Math.max(0, repository.forks),
        0,
      );

      if (stars < 25 && forks < 10) {
        return null;
      }

      return {
        id: "open-source-paladin",
        name: "Open Source Paladin",
        description: this.description,
        icon: this.icon,
        criteria: [
          `Projetos públicos: ${stars.toLocaleString("pt-BR")} estrelas e ${forks.toLocaleString("pt-BR")} forks.`,
        ],
        score: Math.min(100, 70 + Math.log1p(stars + forks * 2) * 5),
      };
    },
  },
  {
    id: "ai-alchemist",
    name: "AI Alchemist",
    description: "Seus repositórios mostram sinais públicos de trabalho com IA.",
    icon: "brain",
    evaluate(profile) {
      const signals = getRepositorySignals(profile);
      const matches = signals.filter((signal) =>
        /\b(ai|artificial-intelligence|machine-learning|deep-learning|llm)\b/.test(
          signal,
        ),
      );

      if (matches.length === 0) {
        return null;
      }

      return {
        id: "ai-alchemist",
        name: this.name,
        description: this.description,
        icon: this.icon,
        criteria: [`${matches.length} sinal(is) de IA nos nomes, descrições ou tópicos dos projetos.`],
        score: Math.min(100, 70 + matches.length * 5),
      };
    },
  },
  {
    id: "data-mage",
    name: "Data Mage",
    description: "Seus projetos indicam foco em dados e análise.",
    icon: "chart-no-axes-combined",
    evaluate(profile) {
      const counts = getLanguageCounts(profile);
      const languages = ["r", "jupyter notebook", "sql", "sas", "julia"].filter(
        (language) => counts.has(language),
      );
      const signals = getRepositorySignals(profile).filter((signal) =>
        /\b(data-science|data-analysis|analytics|big-data)\b/.test(signal),
      );

      if (languages.length === 0 && signals.length === 0) {
        return null;
      }

      return {
        id: this.id,
        name: this.name,
        description: this.description,
        icon: this.icon,
        criteria: [
          languages.length
            ? `Linguagens de dados: ${languages.map((language) => getDisplayLanguage(profile, language)).join(", ")}.`
            : "Tópicos dos projetos indicam análise ou ciência de dados.",
        ],
        score: Math.min(100, 65 + languages.length * 8 + signals.length * 3),
      };
    },
  },
  {
    id: "devops-engineer",
    name: "DevOps Engineer",
    description: "Seus repositórios destacam automação e infraestrutura.",
    icon: "terminal",
    evaluate(profile) {
      const counts = getLanguageCounts(profile);
      const languages = [
        "shell",
        "hcl",
        "dockerfile",
        "makefile",
        "nix",
        "puppet",
      ].filter((language) => counts.has(language));
      const signals = getRepositorySignals(profile).filter((signal) =>
        /\b(devops|kubernetes|terraform|docker|ansible|github-actions|infrastructure-as-code|ci-cd)\b/.test(
          signal,
        ),
      );

      if (languages.length === 0 && signals.length === 0) {
        return null;
      }

      return {
        id: this.id,
        name: this.name,
        description: this.description,
        icon: this.icon,
        criteria: [
          languages.length
            ? `Linguagens de automação: ${languages.map((language) => getDisplayLanguage(profile, language)).join(", ")}.`
            : "Tópicos dos projetos indicam infraestrutura ou automação.",
        ],
        score: Math.min(100, 65 + languages.length * 8 + signals.length * 3),
      };
    },
  },
  createLanguageCandidate(
    {
      id: "mobile-ranger",
      name: "Mobile Ranger",
      description: "Seus repositórios usam linguagens comuns no desenvolvimento mobile.",
      icon: "smartphone",
    },
    ["kotlin", "swift", "dart", "objective-c"],
    (matched) => `Linguagens mobile: ${matched.join(", ")}.`,
  ),
  {
    id: "full-stack-adventurer",
    name: "Full Stack Adventurer",
    description: "Seus repositórios cobrem linguagens de interface e de servidor.",
    icon: "layers",
    evaluate(profile) {
      const counts = getLanguageCounts(profile);
      const frontend = ["javascript", "typescript", "html", "css", "vue", "svelte"].filter(
        (language) => counts.has(language),
      );
      const backend = ["python", "go", "ruby", "php", "java", "c#", "rust"].filter(
        (language) => counts.has(language),
      );

      if (frontend.length === 0 || backend.length === 0) {
        return null;
      }

      return {
        id: this.id,
        name: this.name,
        description: this.description,
        icon: this.icon,
        criteria: [
          `Interface: ${frontend.map((language) => getDisplayLanguage(profile, language)).join(", ")}; servidor: ${backend.map((language) => getDisplayLanguage(profile, language)).join(", ")}.`,
        ],
        score: Math.min(100, 75 + frontend.length * 3 + backend.length * 3),
      };
    },
  },
  createLanguageCandidate(
    {
      id: "frontend-knight",
      name: "Frontend Knight",
      description: "Seus repositórios destacam linguagens de interface web.",
      icon: "layout",
    },
    ["javascript", "typescript", "html", "css", "vue", "svelte"],
    (matched) => `Linguagens de interface: ${matched.join(", ")}.`,
  ),
  createLanguageCandidate(
    {
      id: "backend-guardian",
      name: "Backend Guardian",
      description: "Seus repositórios destacam linguagens de servidor e sistemas.",
      icon: "server",
    },
    ["python", "go", "ruby", "php", "java", "c#", "rust", "elixir"],
    (matched) => `Linguagens de servidor: ${matched.join(", ")}.`,
  ),
];

export function determineDeveloperClass(
  profile: DeveloperProfile,
): DeveloperClass {
  const matchedClasses = classCandidates
    .map((candidate) => candidate.evaluate(profile))
    .filter((result): result is DeveloperClass => result !== null)
    .sort((left, right) => right.score - left.score);
  const bestMatch = matchedClasses[0];

  if (bestMatch) {
    return bestMatch;
  }

  const languages = [...getLanguageCounts(profile).keys()].map((language) =>
    getDisplayLanguage(profile, language),
  );

  return {
    id: "code-wizard",
    name: "Code Wizard",
    description: "Um perfil versátil, ainda sem sinais suficientes para uma especialidade.",
    icon: "code",
    criteria: [
      languages.length > 0
        ? `Linguagens observadas: ${languages.slice(0, 5).join(", ")}.`
        : "Ainda não há linguagens em repositórios públicos suficientes para identificar uma especialidade.",
    ],
    score: Math.min(60, 40 + languages.length * 4),
  };
}
