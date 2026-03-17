# GitHub Pokedex Card

GitHub Pokedex Card e uma aplicacao web que gera um card estilizado inspirado em cartas de Pokemon usando dados publicos de perfis do GitHub.

Hoje o projeto ja inclui dois modos principais:

- `Card Mode`: gera um card individual por usuario
- `Battle Mode`: compara dois perfis em um duelo visual

O resultado pode ser baixado como PNG, compartilhado por link e exibido com preview social automatica.

---

## O que o projeto faz

### Card Mode

- busca dados publicos de um perfil do GitHub
- gera um card estilizado com avatar, bio e estatisticas
- calcula `level`, `rarity`, `cardType` e atributos extras
- mostra linguagem principal e atividade publica recente
- permite baixar o card em PNG
- permite compartilhar a URL do card

### Battle Mode

- compara dois perfis em uma rota dedicada
- avalia metricas como `level`, `followers`, `repos`, `anos no GitHub` e `power`
- define vencedor por categoria e score final
- permite baixar o duelo como imagem
- bloqueia comparacao do mesmo perfil contra ele mesmo

---

## Rotas principais

- `/` -> home focada em gerar card
- `/card/[username]` -> card compartilhavel de um usuario
- `/battle` -> landing do modo batalha
- `/battle/[leftUsername]/vs/[rightUsername]` -> resultado do duelo
- `/card/[username]/opengraph-image` -> imagem social automatica

---

## Tecnologias utilizadas

- **Next.js 16** com App Router
- **React**
- **TypeScript**
- **Tailwind CSS v4**
- **html-to-image**
- **Lucide React**
- **GitHub REST API**

---

## Arquitetura

O projeto foi estruturado para manter separacao clara entre:

- `app` -> rotas e composicao de paginas
- `components/ui` -> design system reutilizavel
- `components/github-card` -> componentes do card individual
- `components/github-battle` -> componentes do modo batalha
- `components/github-card-og` -> composicao da Open Graph image
- `lib/github` -> integracao com a API e regras de dominio
- `lib/github/card` -> regras especificas do card
- `lib/github/battle` -> regras especificas do duelo
- `lib/utils` -> utilitarios genericos

---

## Estrutura resumida

```text
src
├─ app
│  ├─ page.tsx
│  ├─ battle
│  │  ├─ page.tsx
│  │  └─ [leftUsername]/vs/[rightUsername]/page.tsx
│  ├─ card
│  │  └─ [username]
│  │     ├─ page.tsx
│  │     └─ opengraph-image.tsx
│  └─ _components
│
├─ components
│  ├─ ui
│  ├─ github-card
│  ├─ github-battle
│  └─ github-card-og
│
└─ lib
   ├─ github
   │  ├─ api.ts
   │  ├─ mapper.ts
   │  ├─ types.ts
   │  ├─ card
   │  ├─ battle
   │  └─ activity
   └─ utils
```

---

## Dados usados do GitHub

O projeto consome dados publicos do GitHub usando principalmente:

- `GET /users/{username}`
- `GET /users/{username}/repos`
- `GET /users/{username}/events/public`

Com isso, o app monta:

- dados basicos do perfil
- estatisticas gerais
- linguagem principal
- atividade publica recente
- comparacao entre perfis

---

## Design system

O visual do projeto foi organizado com tokens globais em `:root`, incluindo:

- cores base da interface
- superficies e overlays
- tokens de texto
- estados de acao
- tokens especificos dos temas do card

O componente `Button` tambem passou a suportar variantes visuais para evitar botoes com o mesmo peso em todos os contextos.

---

## Instalacao

```bash
npm install
npm run dev
```

A aplicacao fica disponivel em:

```text
http://localhost:3000
```

---

## Estado atual

O backlog principal do projeto foi concluido.

As entregas originalmente previstas ja foram implementadas, com excecao da exportacao vertical para stories, que foi descartada por decisao de produto.

---

## Licenca

Este projeto esta disponivel sob a licenca MIT.
