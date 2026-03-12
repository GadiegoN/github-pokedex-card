# GitHub Trainer Card

GitHub Trainer Card é uma aplicação web que gera um **card estilizado inspirado em cartas de Pokémon** utilizando dados públicos de um perfil do GitHub.
O card pode ser **baixado como imagem PNG** e compartilhado em redes sociais.

A aplicação consulta a API pública do GitHub, transforma os dados do perfil em métricas visuais e renderiza um card com avatar, bio, estatísticas e um sistema simples de nível.

---

## Preview

O card gerado inclui:

- Nome e username do GitHub
- Avatar do perfil
- Bio e informações públicas
- Estatísticas do perfil
- Nível calculado a partir das métricas do usuário
- Download do card em PNG

---

## Tecnologias utilizadas

- **Next.js 16** — App Router
- **React**
- **TypeScript**
- **Tailwind CSS v4**
- **html-to-image** — exportação do card para PNG
- **Lucide React** — ícones
- **GitHub REST API**

---

## Arquitetura

O projeto foi estruturado para manter **separação clara entre domínio, UI e infraestrutura**.

```
src
 ├─ app
 │   ├─ page.tsx
 │   ├─ layout.tsx
 │   ├─ globals.css
 │   └─ _components
 │
 ├─ components
 │   ├─ ui
 │   │   ├─ badge.tsx
 │   │   ├─ button.tsx
 │   │   ├─ card.tsx
 │   │   ├─ input.tsx
 │   │   └─ stat-chip.tsx
 │   │
 │   └─ github-card
 │       ├─ github-profile-card.tsx
 │       ├─ github-profile-card-shell.tsx
 │       ├─ github-profile-card-preview.tsx
 │       └─ pokemon-frame.tsx
 │
 └─ lib
     ├─ github
     │   ├─ api.ts
     │   ├─ mapper.ts
     │   └─ types.ts
     │
     └─ utils
         ├─ cn.ts
         └─ format-number.ts
```

### Organização

- **`app`** — rotas e componentes ligados à página
- **`components/ui`** — design system reutilizável
- **`components/github-card`** — componentes específicos do card
- **`lib/github`** — integração com a API do GitHub
- **`lib/utils`** — utilitários genéricos

---

## Fluxo da aplicação

1. O usuário informa um **username do GitHub**.
2. A aplicação consulta a **GitHub REST API**.
3. Os dados retornados são transformados em um **modelo interno**.
4. O card é renderizado utilizando componentes reutilizáveis.
5. O usuário pode **baixar o card como PNG**.

---

## Instalação

Clone o repositório:

```
git clone https://github.com/seu-usuario/github-trainer-card.git
```

Entre na pasta do projeto:

```
cd github-trainer-card
```

Instale as dependências:

```
npm install
```

Inicie o servidor de desenvolvimento:

```
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## API utilizada

O projeto utiliza a **GitHub REST API** para obter dados públicos do perfil:

```
GET https://api.github.com/users/{username}
```

Informações utilizadas:

- avatar
- nome
- bio
- localização
- empresa
- website
- número de repositórios
- seguidores
- seguindo
- data de criação da conta

---

## Sistema de nível

O nível do card é calculado a partir de algumas métricas do perfil:

- número de repositórios
- seguidores
- tempo de conta no GitHub
- número de contas seguidas

Esses dados são combinados para gerar um valor numérico que representa o **nível do desenvolvedor no card**.

---

## Exportação do card

A exportação da imagem utiliza a biblioteca:

```
html-to-image
```

O componente captura o DOM do card e gera um **PNG em alta resolução**, pronto para download.

---

## Melhorias futuras

Algumas melhorias planejadas para o projeto:

- sistema de **raridade do card** (common, rare, legendary)
- suporte a **linguagens mais utilizadas**
- exibição de **estatísticas de contribuição**
- exportação em **formato vertical para stories**
- geração de **Open Graph image para compartilhamento**

---

## Licença

Este projeto está disponível sob a licença MIT.
