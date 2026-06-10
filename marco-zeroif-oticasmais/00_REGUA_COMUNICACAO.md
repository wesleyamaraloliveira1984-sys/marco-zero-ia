# 📐 RÉGUA DE COMUNICAÇÃO — Marco Zero × Óticas Mais

> **Para quem é este arquivo:** Wesley + Marco Zero IF. **O que ele resolve:** padronizar como falamos entre nós, com a Jeane, com a Debora e com o Dr. Haldley. Aplicado a partir de **08/06/2026**.

---

## Parte 1 — Como Wesley e Marco Zero IF se comunicam (interno)

### 1.1 Regra do "ponto de entrada"

Wesley **nunca precisa navegar pastas** para entender onde estamos. Ele abre **um arquivo** e vê tudo: o `00_PAINEL.md` na raiz. Tudo o que muda no projeto, atualiza o painel primeiro.

### 1.2 Regra dos "3 arquivos centrais"

A raiz do projeto tem **3 arquivos `00_*`** e mais nada novo na raiz (os arquivos `1_` a `8_` originais e o PDF do Namour seguem onde estão).

| Arquivo | Para quê |
|---|---|
| `00_PAINEL.md` | Mapa geral. Onde estamos, o que está pronto, o que vem. |
| `00_PENDENCIAS_JEANE.md` | Status real de tudo que pedimos à Jeane. Único lugar com lista de pendências. |
| `00_REGUA_COMUNICACAO.md` | Este arquivo. |

### 1.3 Quando produzir um e-mail interno (E0X) × quando produzir um documento na raiz

- **E0X** (e-mails internos, na pasta `Financeiro/Emails/`): análise técnica de um achado específico. Cada um cobre **uma frente**. Não duplica conteúdo do painel — aprofunda.
- **R0X** (rascunhos de e-mail para o cliente, na pasta `Comunicacoes/`): comunicação enviada à Jeane/Debora. Sempre tem **versão pronta para copiar e colar** + **notas internas (não enviar)**.
- **M0X** (memorandos internos confidenciais, na pasta `Interno/Memorandos/`): proteção profissional. Só uso da Marco Zero.
- **EST0X** (estudos metodológicos, na pasta `Estudos_Internos/`): preparação para entregas grandes. Não circula com cliente.

### 1.4 Regra do "altitude correta"

Antes de produzir qualquer documento, Wesley e Marco Zero IF se perguntam: **qual a altitude?**

| Altitude | Tipo de documento | Exemplo |
|---|---|---|
| 1.000 m — Panorama | Painel, sumário, lista | `00_PAINEL.md` |
| 500 m — Frente analítica | E-mail interno E0X | E03 (Diagnóstico 2025) |
| 100 m — Detalhe técnico | Anexo, planilha, parser | `triangulacao.py` |
| 0 m — Comunicação externa | R0X enviado | R04 enxuto à Jeane |

Não misturar altitudes no mesmo arquivo. Cada um faz **uma coisa**.

### 1.5 Regra do "antes de escrever mais 200 linhas"

Sempre que a Marco Zero IF for produzir um artefato com mais de 1 página, **pergunta antes:** "Wesley, é nesta altitude que você quer?" Evita relatórios robustos que não cabem na conversa real do momento.

---

## Parte 2 — Como nos comunicamos com a Jeane

### 2.1 Princípios

1. **Sempre Jeane (não Debora, não Rosilene, não Angelina).** Wesley centraliza em Jeane. Ela é o ponto-focal.
2. **Pedido enxuto.** Cada e-mail tem **no máximo 4-5 itens**. Nunca despejar 12.
3. **Bloco de prioridade.** Quando passar de 3 itens, organizar em "Bloco 1 — Alta", "Bloco 2 — Média".
4. **Vocabulário Marco Zero.** Nunca julgar contabilidade, banco, fornecedor ou concorrente. Nunca usar "fantasma", "fraude", "sonegação", "esquema". Quem nomeia esses termos é o cliente, não nós.
5. **Sem logística interna do cliente.** Não dizer "pode pedir à Rosilene", "fala com a Angelina". Pedimos o material; como ela busca internamente é decisão dela.
6. **Sem repetir.** Item que já foi enviado uma vez sai da lista. Se for reiterar, escrever: *"já havíamos pedido em e-mail anterior; reitero aqui para ficar organizado"*.
7. **Quando for reiterar, justificar.** Se o item está sumido há tempo, vale uma linha explicativa do porquê é importante agora.

### 2.2 Estrutura padrão do e-mail à Jeane

```
Assunto: Marco Zero × Óticas Mais — [tema curto]

Olá, Jeane, [bom dia / tudo bem]!

[Abertura relacional — 1 a 2 linhas. Ex.: "Conforme combinado..." / 
 "Obrigado pelo último envio..." Sem cobrança.]

[Pedido em blocos por prioridade — máx. 4-5 itens]

Bloco 1 — Prioridade alta
1. [Item — Por que importa em 1 linha — Onde está, se aplicável]
2. [Item]

Bloco 2 — Prioridade média
3. [Item]
4. [Item]

Qualquer dúvida, me chama no WhatsApp (31) 99603-8407.

Obrigado, Jeane!

Wesley Júnio de Oliveira Amaral
Marco Zero — Inteligência Financeira
wesley@marcozerointeligencia.com.br · (31) 99603-8407
```

### 2.3 Padrão de R0X (rascunhos de comunicação)

Todo R0X salvo em `Comunicacoes/` tem 3 partes:

1. **Cabeçalho com metadados** (Para, De, Assunto, Contexto, Versão)
2. **E-mail pronto para copiar e colar** (blockquote `>` em markdown)
3. **Notas internas (não enviar)** — registro de decisões, regras aplicadas, próximos passos

### 2.4 Antes de enviar — checklist Marco Zero

- [ ] Cabe em uma tela de leitura (sem barra de rolagem)?
- [ ] Mais de 5 itens? Reorganizar em blocos.
- [ ] Linguagem julga contabilidade externa? Reescrever.
- [ ] Mencionei Rosilene/Angelina/Debora direto? Tirar.
- [ ] Tem item que já está na pasta ou em fonte primária? Tirar.
- [ ] Tem achado-coringa virando pedido? Mover para apresentação ao Dr. Haldley.
- [ ] Tom: cuidadoso, zeloso, gentil, elegante?

---

## Parte 3 — Como nos comunicamos com a Debora

Mesmas regras da Jeane, com 2 ajustes:

1. **Debora é assistente operacional** (digitaliza, escaneia, envia). Foco em tarefas operacionais simples (faltou um anexo, qualidade do PDF, formato).
2. **Não escalar problema com a Debora à Jeane sem necessidade.** Resolvemos no nível dela quando dá.

---

## Parte 4 — Como nos comunicamos com o Dr. Haldley

### 4.1 Princípios

1. **O Dr. Haldley é o decisor estratégico.** Conversa com ele é **estratégica**, não operacional.
2. **Documentação que vai a ele é assinada e diagramada.** Tom técnico, vocabulário próprio, identidade Marco Zero aplicada (Azul Petróleo `#0D2F3A`, tipografia consistente).
3. **Reunião de leitura conjunta** sempre que possível para entregas pesadas (relatório final, prévia executiva, memorandos).
4. **Achados materiais** (Adiantamentos R$ 5,6M, custo cego por loja, fragmentação societária) **abrem conversa**, não fecham. Marco Zero apresenta o que vê, não acusa.
5. **Sem julgamento de prestadores anteriores** — quem julga é ele, não nós.

### 4.2 Disciplina FATO × HIPÓTESE

Toda afirmação numérica em documento para o Dr. Haldley vem com etiqueta:

- **FATO** — sustentado em fonte primária (NF-e, extrato, balancete, agenda Get Net).
- **HIPÓTESE** — leitura inferida que pede confirmação.

Quando não der para cravar, escrever: *"Para classificarmos como fato, precisamos de [X]"*. Nunca apresentar hipótese vestida de fato.

### 4.3 Período de competência × data de geração

Sempre apresentar número com o **período de competência** explícito (Ex.: "Receita Bruta 2025 — exercício 01/01 a 31/12/2025"). Data de geração do PDF é irrelevante para análise.

---

## Parte 5 — Régua de tempo (cadência)

| Situação | Resposta esperada |
|---|---|
| Jeane envia material | Resposta no mesmo dia ou D+1, confirmando recebimento e o que faremos com aquilo |
| Pendência crítica do Dr. Haldley | Sem atraso — entra na fila imediata |
| Pedido de material novo à Jeane | No máximo 1 e-mail por semana — não saturar |
| Reunião com Dr. Haldley | Marcada com 5+ dias de antecedência, com pauta enviada antes |
| Entrega de relatório/memorando | Combinada por SMS/WhatsApp antes do envio do PDF |

---

## Parte 6 — Tom Marco Zero (resumo de marca)

> **Cuidadoso, zeloso, gentil, elegante.** Profissional com proximidade.
>
> Nunca: condescendente, didático demais, alarmista, julgador, fofo, cínico.
> Sempre: claro, técnico, com altitude correta, com fonte sustentável (FATO × HIPÓTESE).

---

## Parte 7 — Regras de gravação no projeto

| O quê | Onde |
|---|---|
| Comunicação enviada a cliente | `Comunicacoes/R0X_*.md` |
| Análise técnica interna por frente | `Financeiro/Emails/E0X_*.md` |
| Memorando técnico confidencial (defesa profissional) | `Interno/Memorandos/M0X_*.docx` |
| Estudo metodológico / preparação de entrega grande | `Estudos_Internos/EST0X_*.md` |
| Documento entregue ao cliente (PDF, DOCX assinado) | Raiz do projeto, com número `9_`, `10_`, etc. |
| Atualização de painel | `00_PAINEL.md` |
| Atualização de pendências | `00_PENDENCIAS_JEANE.md` |

---

## Parte 8 — O que muda na prática a partir de hoje

1. **Toda vez que algo se move**, atualizo o `00_PAINEL.md` antes de qualquer outra coisa.
2. **Toda mudança em pedidos à Jeane** atualiza o `00_PENDENCIAS_JEANE.md`. Lista única, sem dispersão.
3. **Sempre que eu (Marco Zero IF) for produzir documento com mais de 1 página**, eu te pergunto antes em qual altitude você quer.
4. **Não vou mais entregar wall-of-text** sem antes te mostrar a estrutura. Texto pesado quebra em blocos visuais ou em arquivos separados.
5. **Comunicação para você fica sempre em tabela** — você lê melhor em tabela do que em parágrafo corrido.

---

**Última atualização:** 08/06/2026
**Aplicação:** vale a partir de hoje, para todos os novos artefatos.
