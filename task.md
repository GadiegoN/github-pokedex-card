# Task Backlog

Este arquivo organiza as próximas evoluções do projeto em uma ordem pragmática, considerando a estrutura atual:

- o fluxo principal está concentrado em `src/app/page.tsx`
- as métricas do card nascem em `src/lib/github/mapper.ts`
- o visual do card está concentrado em `src/components/github-card/*`
- hoje a API usa apenas `GET /users/{username}` em `src/lib/github/api.ts`

A prioridade abaixo favorece:

1. alto impacto visual
2. baixo risco de quebrar o projeto atual
3. máximo reaproveitamento da arquitetura existente
4. expansão gradual da fonte de dados

---

## Fase 1: Melhorias de alto impacto com baixo custo

### 1. Sistema de raridade do card

**Prioridade:** muito alta

**Por que vem primeiro**

- encaixa perfeitamente no conceito de card colecionável
- exige pouca mudança estrutural
- pode ser resolvido dentro do `mapper` + UI do card
- aumenta o fator de compartilhamento sem depender de novos endpoints

**Implementação sugerida**

- adicionar `rarity` em `GithubProfileCardData`
- derivar a raridade a partir de `level`, `followers`, `publicRepos` e `yearsOnGithub`
- exibir selo visual no header do card
- variar borda, brilho e paleta por raridade

**Arquivos mais afetados**

- `src/lib/github/types.ts`
- `src/lib/github/mapper.ts`
- `src/components/github-card/github-profile-card.tsx`
- `src/components/github-card/pokemon-frame.tsx`

---

### 2. Temas visuais por tipo

**Prioridade:** alta

**Por que vem agora**

- reutiliza a mesma base da raridade
- valoriza muito o card sem aumentar muito a complexidade
- transforma o layout atual, que hoje é fixo, em algo mais dinâmico

**Implementação sugerida**

- adicionar `cardType` no modelo interno
- criar temas como `electric`, `fire`, `water`, `steel`, `psychic`
- derivar o tipo por regra de negócio simples
- aplicar gradientes, moldura e badge com base no tipo

**Exemplos de regra**

- muitos seguidores: `electric`
- muitos repositórios: `steel`
- conta antiga: `rock` ou `ancient`
- bio/site preenchidos: `psychic`

**Arquivos mais afetados**

- `src/lib/github/types.ts`
- `src/lib/github/mapper.ts`
- `src/components/github-card/pokemon-frame.tsx`
- `src/components/github-card/github-profile-card.tsx`

---

### 3. Atributos extras no card

**Prioridade:** alta

**Por que entra cedo**

- o card já tem `level` e `power`, então a evolução é natural
- fortalece o tema “trading card”
- pode ser feito ainda com os dados atuais

**Implementação sugerida**

- substituir ou complementar os chips atuais com atributos como:
  - `Power`
  - `Influence`
  - `Consistency`
  - `Explorer`
- calcular cada atributo no `mapper`
- manter a fórmula simples e legível

**Arquivos mais afetados**

- `src/lib/github/types.ts`
- `src/lib/github/mapper.ts`
- `src/components/github-card/github-profile-card.tsx`

---

## Fase 2: Compartilhamento e apresentação

### 4. Exportação vertical para stories

**Prioridade:** alta

**Por que vem antes de features pesadas**

- grande potencial de compartilhamento
- usa a infraestrutura atual de exportação com `html-to-image`
- não depende de ampliar a integração com o GitHub

**Implementação sugerida**

- criar uma variante de layout vertical do card
- permitir alternar entre `square/default` e `story`
- baixar PNG em resolução otimizada para stories

**Observação técnica**

- hoje o export depende de um `targetId` único em `download-card-button.tsx`
- vale estruturar o preview para suportar múltiplas variantes de exportação

**Arquivos mais afetados**

- `src/app/_components/download-card-button.tsx`
- `src/components/github-card/github-profile-card-preview.tsx`
- `src/components/github-card/github-profile-card.tsx`
- possivelmente novo componente para variante vertical

---

### 5. Pequenas animações e microinterações

**Prioridade:** média-alta

**Por que vem aqui**

- melhora muito a percepção de acabamento
- não altera domínio nem integração externa
- deve entrar depois da definição final de raridade e temas

**Implementação sugerida**

- reveal do card ao carregar
- brilho sutil no frame
- animação de preenchimento do level
- feedback visual mais forte no botão de download

**Arquivos mais afetados**

- `src/components/github-card/pokemon-frame.tsx`
- `src/components/github-card/github-profile-card.tsx`
- `src/app/globals.css`
- `src/components/ui/button.tsx`

---

## Fase 3: Expansão de dados do GitHub

### 6. Linguagem principal do perfil

**Prioridade:** média-alta

**Por que não vem antes**

- já tem ótimo apelo, mas exige ampliar a coleta de dados
- a implementação deixa de ser só `GET /users/{username}`
- pode introduzir paginação, agregação e limites de API

**Implementação sugerida**

- buscar repositórios públicos do usuário
- agregar linguagens predominantes
- exibir `Main Language` ou usar isso como base do `cardType`

**Risco técnico**

- escolher entre usar `language` do repositório ou buscar linguagens detalhadas por repositório
- controlar custo de requests

**Arquivos mais afetados**

- `src/lib/github/api.ts`
- `src/lib/github/types.ts`
- `src/lib/github/mapper.ts`
- `src/components/github-card/github-profile-card.tsx`

---

### 7. Estatísticas de contribuição

**Prioridade:** média

**Por que fica depois**

- é atrativo, mas mais caro de implementar corretamente
- a API REST pública não entrega isso de forma tão direta
- pode exigir GraphQL, scraping evitável ou redefinição do escopo

**Implementação sugerida**

- começar com uma versão simplificada
- se necessário, trocar o objetivo para “atividade pública recente” em vez de contribuições completas

**Risco técnico**

- alta chance de complexidade desproporcional para o ganho

---

## Fase 4: Evoluções de produto

### 8. URL compartilhável por username

**Prioridade:** média-alta

**Por que entra depois**

- é excelente como produto
- combina com SEO, preview social e compartilhamento
- mas exige revisar a estrutura de rota e a experiência da página inicial

**Implementação sugerida**

- criar rota dedicada como `/card/[username]`
- manter a home como landing + busca
- reutilizar o mesmo componente de preview

**Arquivos mais afetados**

- `src/app/page.tsx`
- nova rota em `src/app/card/[username]/page.tsx`
- componentes de preview já existentes

---

### 9. Open Graph image automática

**Prioridade:** média

**Por que depende da anterior**

- fica muito mais útil quando existir URL dedicada por usuário
- melhora bastante a apresentação quando o link é compartilhado

**Implementação sugerida**

- gerar imagem social por rota
- usar os mesmos dados do card
- manter uma versão simplificada e estável da composição

**Dependência**

- recomendado implementar depois da rota `/card/[username]`

---

## Fase 5: Feature de engajamento

### 10. Comparação entre dois perfis

**Prioridade:** média

**Por que deixei por último**

- tem enorme potencial de viralização
- mas altera bastante a experiência e o layout
- é quase um segundo produto dentro do atual

**Implementação sugerida**

- modo `battle` com dois usernames
- comparação visual de stats
- vencedor por categoria e score final
- exportação do duelo como imagem

**Arquivos mais afetados**

- `src/app/page.tsx`
- `src/app/_components/github-card-form.tsx`
- `src/lib/github/api.ts`
- novos componentes específicos de batalha

---

## Ordem recomendada de execução

1. sistema de raridade
2. temas visuais por tipo
3. atributos extras no card
4. exportação vertical para stories
5. pequenas animações e microinterações
6. linguagem principal do perfil
7. URL compartilhável por username
8. Open Graph image automática
9. comparação entre dois perfis
10. estatísticas de contribuição, somente se o escopo continuar valendo o custo

---

## Próximo passo recomendado

Se a ideia for publicar uma segunda versão logo, a melhor entrega é um pacote curto:

1. raridade
2. tipo visual
3. atributos extras
4. export para stories

Esse conjunto gera uma `v2` clara, visualmente mais forte e ainda compatível com a arquitetura atual sem exigir uma expansão pesada da integração com a API do GitHub.
