# GitHub Pokédex Card

O GitHub Pokédex Card transforma informações públicas de um perfil do GitHub em uma ficha visual de personagem desenvolvedor. A ficha combina classe, atributos, progressão, raridade, linguagens e estatísticas públicas em um card que pode ser compartilhado ou baixado como PNG.

O projeto também oferece um modo de batalha para comparar dois perfis.

## Experiências

### Ficha do desenvolvedor

- **Classe:** determinada por linguagens e sinais encontrados nos repositórios, como tópicos e adoção da comunidade.
- **Atributos:** Código, Experiência, Conhecimento, Social e Consistência, normalizados de 0 a 100.
- **Nível e XP:** progressão determinística baseada em dados públicos, sem limite baixo de nível.
- **Raridade:** Common, Uncommon, Rare, Epic ou Legendary, calculada a partir de atributos e alcance dos projetos.
- **Linguagens:** até cinco linguagens mais presentes entre os repositórios próprios analisados.
- **Estatísticas:** repositórios públicos e seguidores do perfil, além das stars e atividade encontradas nos dados recentes.
- **Compartilhamento:** URL do perfil, preview social e exportação PNG do card renderizado.

### Battle Mode

Compara dois perfis em uma rota compartilhável. O duelo compara nível, XP, raridade, os cinco atributos, quantidade de linguagens, seguidores, repositórios e anos no GitHub. Classe e linguagens mais frequentes também aparecem como comparação textual. Para não contar progressão três vezes, Level/XP/Power juntos valem o peso de uma categoria no placar; os cinco atributos também dividem o peso de uma categoria. Empates contam metade do peso.

### Histórico local

Ao abrir a ficha, o navegador registra um snapshot do ano atual com nível, XP, classe, raridade e atributos. Visitas posteriores no mesmo ano atualizam esse snapshot; anos anteriores são mantidos. O histórico pertence ao navegador e perfil onde foi criado, não é compartilhado pelo link e pode ser apagado na própria ficha. Não há backend para snapshots.

## Como os dados são obtidos

O app usa a GitHub REST API sem exigir login:

- `GET /users/{username}` para dados públicos do perfil.
- `GET /users/{username}/repos?per_page=100&sort=updated` para os até 100 repositórios mais recentemente atualizados.
- `GET /users/{username}/events/public?per_page=100` para eventos públicos recentes.

O perfil, os repositórios e os eventos são combinados no serviço de `src/lib/github`. As respostas são armazenadas em cache por uma hora.

**Limites dos dados:** a lista de repositórios é uma amostra de até 100 itens, ordenados pela atualização mais recente, não necessariamente o histórico completo do perfil. O card informa quantos itens foram retornados e quantos repositórios próprios entraram nos cálculos. Stars, forks e distribuição de linguagens são calculados somente sobre os repositórios próprios da amostra. Atividade usa os eventos públicos disponíveis e considera os últimos 30 dias. A API REST pública usada aqui não fornece o gráfico anual de contribuições; o app não inventa essa contagem. Repositórios privados não são acessíveis sem autorização.

## Regras do personagem

Os cálculos ficam em funções puras em `src/lib/github/developer`, independentes da interface. As regras são determinísticas e usam apenas dados obtidos pelo app.

### Atributos

Todos os valores são arredondados e limitados ao intervalo de 0 a 100:

- **Código:** `2 × repositórios próprios analisados + 10 × linguagens distintas`.
- **Experiência:** `5 × anos no GitHub + 0,75 × repositórios próprios analisados`.
- **Conhecimento:** `12 × linguagens distintas + 0,5 × repositórios próprios analisados`.
- **Social:** 80% de seguidores e 20% de pessoas seguidas, ambos em escala logarítmica. Isso reduz o peso desproporcional de perfis com muitos seguidores.
- **Consistência:** `2,5 × eventos públicos recentes + 5 × repositórios ativos nos últimos 30 dias`.

Forks não contam como repositórios próprios para Código, Conhecimento ou linguagens. Experiência, Social e Consistência medem sinais diferentes e são mantidos separados.

### XP e nível

O XP total é calculado com pesos simples:

- 100 XP por repositório público informado pelo perfil;
- 20 XP por star e 10 XP por fork somados nos repositórios próprios analisados;
- 5 XP por seguidor;
- 100 XP por ano no GitHub;
- 20 XP por evento de push e 30 XP por repositório ativo observado nos últimos 30 dias;
- 50 XP por linguagem distinta observada.

O próximo nível exige `1.000 + 250 × nível atual` XP. O XP que sobra após subir de nível permanece no progresso seguinte. Os títulos são Novice (1–10), Apprentice (11–20), Adventurer (21–30), Veteran (31–40), Elite (41–50) e Legendary (51+).

### Classe

A classe avalia linguagens observadas e, quando disponíveis, nomes, descrições e tópicos dos repositórios:

- **Full Stack Adventurer:** há linguagens de interface e de servidor.
- **Frontend Knight** e **Backend Guardian:** predominância de sinais de interface ou servidor.
- **Mobile Ranger:** linguagens como Kotlin, Swift, Dart ou Objective-C.
- **DevOps Engineer:** linguagens de automação/infraestrutura ou tópicos correspondentes.
- **Data Mage:** linguagens ou tópicos ligados a dados e análise.
- **AI Alchemist:** nomes, descrições ou tópicos com sinais explícitos de IA.
- **Open Source Paladin:** projetos próprios com pelo menos 25 stars ou 10 forks.
- **Code Wizard:** fallback honesto quando não há evidência suficiente para especializar a classe.

Se mais de uma classe for elegível, vence a que tiver maior pontuação de evidências; especializações técnicas têm prioridade sobre a classe de adoção comunitária. Open Source Paladin é usada quando não há outra especialização sustentada pelos dados. Os critérios observados são incluídos na ficha. A classe não é sorteada.

### Raridade

A raridade é uma soma ponderada dos atributos: Código (25%), Experiência (20%), Conhecimento (20%), Social (10%) e Consistência (15%), mais alcance de código aberto (10%). O alcance usa stars e forks observados em escala logarítmica. Assim, seguidores sozinhos não elevam a raridade, e um perfil técnico pode obter raridade alta mesmo com poucos seguidores.

- Common: abaixo de 32.
- Uncommon: de 32 a menos de 52.
- Rare: de 52 a menos de 70.
- Epic: de 70 a menos de 85.
- Legendary: 85 ou mais.

### Linguagens

As linguagens são contadas por repositório próprio com linguagem detectada pela API, ordenadas por frequência e limitadas às cinco primeiras. O percentual é relativo aos repositórios analisados com linguagem detectada; empates são ordenados alfabeticamente. Ele representa quantidade de repositórios, não linhas de código.

## Imagem e acessibilidade

O card da página e o PNG usam o mesmo componente e o mesmo elemento de exportação. `html-to-image` captura o card em resolução 2×, incluindo barras de progresso CSS e os ícones SVG da interface. A preview Open Graph é uma composição separada otimizada para 1200 × 630.

Os valores das barras têm rótulos acessíveis, os avatares incluem texto alternativo e os estados de carregamento/erro possuem mensagens. A classe também é identificada por texto e critérios, não apenas pelo ícone.

## Tecnologias e estrutura

- Next.js 16 com App Router
- React 19 e TypeScript estrito
- Tailwind CSS v4
- GitHub REST API
- `html-to-image` para exportação PNG
- Vitest para regras de domínio

```text
src/
├─ app/                         # Rotas, formulários e estados de página
├─ components/
│  ├─ github-card/              # Ficha visual exportável
│  ├─ github-card-og/           # Imagem social
│  ├─ github-battle/            # Comparação entre perfis
│  └─ ui/                       # Componentes básicos
└─ lib/
   ├─ github/
   │  ├─ developer/             # Tipos e cálculos puros do personagem
   │  ├─ card/                  # Tema visual e regras existentes do card
   │  ├─ battle/                # Métricas e resultado da batalha
   │  └─ activity/              # Resumo de eventos públicos recentes
   └─ utils/
```

## Rotas

- `/` — gerar uma ficha.
- `/card/[username]` — ficha compartilhável.
- `/card/[username]/opengraph-image` — preview Open Graph.
- `/battle` — início do Battle Mode.
- `/battle/[leftUsername]/vs/[rightUsername]` — duelo compartilhável.
- `/privacy` — política de privacidade.

## Executar

Requer Node.js e npm instalados.

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>, informe um username público do GitHub e gere a ficha. Na página do perfil, use **Baixar PNG** para exportar a mesma ficha exibida na tela.

## Testes, lint e build

```bash
npm run lint
npm test
npm run build
```

Os testes cobrem fórmulas, limites, perfis com poucos e muitos dados, ausência de repositórios, classificação, raridade, XP, comparação e snapshots anuais. O lint usa as regras oficiais do Next.js.

## Dependências e segurança

Next.js, `eslint-config-next` e Vitest são atualizados como um conjunto compatível. O npm audit ainda sinaliza advisories altos em dependências de desenvolvimento transitivas do `eslint-config-next` (braces/fast-glob/micromatch); a correção automática sugerida rebaixaria a configuração do Next para a linha 14, incompatível com este app. Não se aplica downgrade forçado. Esses avisos devem ser reavaliados quando o upstream publicar uma atualização corrigida compatível.

## Histórico e evolução

Os cálculos recebem um `DeveloperProfile` serializável e produzem resultados independentes. A ficha já mantém snapshots anuais versionados no `localStorage`, separados por username: uma nova visita atualiza o ano corrente, anos anteriores permanecem e o botão da ficha apaga o histórico daquele perfil. Os dados ficam somente no navegador, sem backend ou sincronização. O Battle Mode também compara classe, raridade, atributos e linguagens dos dois perfis.

## Licença

Este projeto está disponível sob a licença MIT.
