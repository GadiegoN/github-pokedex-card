# Project Status

Este arquivo deixou de ser um backlog aberto e agora funciona como registro do que foi entregue e do que pode virar proxima iteracao.

---

## Entregas concluidas

### Card Mode

- sistema de raridade
- temas visuais por tipo
- atributos extras no card
- linguagem principal do perfil
- atividade publica recente
- exportacao em PNG
- compartilhamento por link
- rota compartilhavel em `/card/[username]`
- Open Graph image automatica

### Battle Mode

- landing dedicada em `/battle`
- rota de resultado em `/battle/[leftUsername]/vs/[rightUsername]`
- comparacao visual entre dois perfis
- score final e vencedor por categoria
- exportacao do duelo em PNG
- bloqueio de duelo com o mesmo perfil
- exportacao sempre lado a lado, inclusive no mobile

### UI e arquitetura

- separacao entre `Card Mode` e `Battle Mode`
- reorganizacao dos tokens globais em `:root`
- migracao do app principal para usar tokens de design
- variantes no componente `Button`
- componentizacao maior do dominio e da interface

---

## Decisoes de produto

- a exportacao vertical para stories foi removida
- a home ficou focada em `Card Mode`
- `Battle Mode` ganhou entrada propria para evitar confusao visual
- a parte de contribuicoes foi implementada como `atividade publica recente`, por ter melhor custo-beneficio tecnico

---

## Possiveis proximas iteracoes

- refinar o visual do modo battle para ter identidade mais propria
- criar Open Graph image para batalhas
- adicionar historico local dos ultimos cards ou batalhas geradas
- criar pagina de exemplos com perfis conhecidos
- revisar textos e naming para publicacao da proxima versao

---

## Estado atual

- backlog principal: concluido
- pendencias tecnicas criticas: nenhuma identificada
- proximo foco recomendado: acabamento de produto e comunicacao
