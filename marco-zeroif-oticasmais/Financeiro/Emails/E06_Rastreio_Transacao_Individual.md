# E06 — Rastreio de Transação Individual: teste, resultado e implicações

**Solicitação:** Wesley (05/06/2026) — partir de uma venda específica observada na planilha Get Net e localizar a NF-e correspondente + o crédito no extrato bancário.

**Transação-alvo:** 06/01/2026 11:18 · Matriz Luminis (Merchant 72452) · Mastercard Crédito 10x · AUT: BLDIRW · CV: 000002441 · Terminal: 14180915 · Cartão: 531681\*\*\*\*\*\*3232 · Bruto R$ 1.600,00 · Taxa –R$ 45,60 · Líquido R$ 1.554,40 · Data prevista 1º pagamento: 06/02/2026.

---

## 1. O que o teste verifica

A triangulação do E05 foi feita por **totais agregados** (mês × estabelecimento × forma de pagamento). Esse agregado pode mascarar problemas individuais que se compensam dentro do mês. O teste 1-para-1 pega uma transação específica e verifica:

- **(A) Existe NF-e correspondente** com mesma data, estabelecimento e valor em cartão?
- **(C) Existe crédito no extrato bancário** com valor líquido (R$ 1.554,40) ou parcela mensal (R$ 155,44) compatível?

Se as três fontes (Get Net + NF-e + Extrato) representassem a mesma realidade, deveríamos achar a venda nas três.

---

## 2. Resultados do rastreio

### 2.1 Busca na fonte A (NF-e)

| Busca | Resultado |
|---|---|
| NF-e da Matriz Luminis em **06/01/2026** (qualquer valor, qualquer forma) | **Zero NF-e** emitidas pela Matriz no dia 06/01/2026 |
| NF-e em qualquer estabelecimento (Matriz, Filial, BH) em 06/01/2026 com pagamento cartão R$ 1.600,00 | Nenhuma |
| NF-e da Matriz com cartão crédito R$ 1.600,00 em **outras datas** próximas | 3 ocorrências: **NF 3404 em 26/01/26**, **NF 3423 em 11/02/26**, **NF 3443 em 26/02/26** |

**Conclusão A:** a transação Get Net de R$ 1.600,00 em 06/01/2026 às 11:18 **não tem NF-e correspondente** em nenhum dos três estabelecimentos do grupo. As três NF-e da Matriz com valor R$ 1.600,00 em cartão foram emitidas em datas diferentes (26/01, 11/02, 26/02) — não há como atribuir nenhuma delas à transação Get Net específica desse teste.

### 2.2 Busca na fonte C (Extratos bancários)

| Busca | Resultado |
|---|---|
| R$ 1.554,40 (líquido total, se antecipado) em qualquer extrato (CEF + Santander + BH) | **Zero ocorrências** |
| R$ 155,44 (parcela mensal, 1.554,40 ÷ 10) em qualquer extrato | Zero ocorrências |
| R$ 1.600,00 (valor bruto) em qualquer extrato | Zero ocorrências |

**Conclusão C:** o crédito relacionado a essa venda específica **não aparece em nenhum extrato bancário disponível** — nem como valor líquido único (se antecipada), nem como parcela mensal (se não antecipada).

### 2.3 Validação cruzada — agregado mês a mês

Para ter referência, comparei totais de janeiro/26 (Matriz Luminis):

| Métrica | Valor |
|---|---|
| Vendas Get Net aprovadas em Jan/26 (Matriz) | 27 transações · R$ 40.232,00 |
| Pagamentos cartão crédito em NF-e Matriz Jan/26 | 21 pagamentos · R$ 38.932,00 |
| Pagamentos cartão débito em NF-e Matriz Jan/26 | (compõe os 1.300,00 restantes) |
| **Total NF-e cartão Matriz Jan/26** | **R$ 40.232,00** ✓ |

O agregado **bate exatamente** entre NF-e e Get Net. Mas o cruzamento individual mostra que **a distribuição dia a dia não bate** — a venda de 06/01 não tem NF-e nesse dia, e alguma NF-e emitida em outro dia compensa o total mensal.

---

## 3. Interpretação técnica

A combinação dos resultados acima — venda Get Net aprovada + ausência de NF-e na data + ausência de crédito identificável — admite as seguintes hipóteses (em ordem decrescente de plausibilidade):

| # | Hipótese | O que confirmaria | Como verificar |
|---|---|---|---|
| 1 | **Vendas Get Net e NF-e operam em fluxos descoincidentes no dia a dia** (ainda que o agregado mensal feche). Funcionário processa a venda na maquininha, mas a emissão da NF-e ocorre em outro momento (outro turno, outro dia, agrupada). | NF-e de R$ 1.600,00 em datas diferentes batem com vendas Get Net de datas diferentes em padrão sistemático | Cruzar AUT/CV/Terminal com vNF da NF-e em janela ampliada |
| 2 | **NF-e foi cancelada** posteriormente (cStat=101). A nota foi emitida em 06/01/2026, registrou a venda em cartão, mas foi cancelada por evento posterior e por isso não aparece na nossa base (que filtra cStat=100). | Relatório de NF-e canceladas mostra evento em 06/01 ou subsequente | Pedir relatório SEFAZ-MG ou ao emissor |
| 3 | **Crédito agrupado** no extrato. O Santander credita várias antecipações em valor único, sem isolar cada operação. R$ 1.554,40 estaria embutido em um valor maior. | Confronto de totais diários Get Net (líquido) × créditos diários no extrato dentro de janela de D+0 a D+5 | Cruzar agregados diários |
| 4 | **Conta de destino diferente** das que temos extrato. Os extratos Santander Filial de janeiro/fevereiro/26 ainda não foram recebidos — pode haver outras contas também. | O crédito aparece em extrato Filial Santander jan/26 quando recebido | Pedir extratos faltantes (R04) |
| 5 | **NF-e não foi emitida para esta venda** específica. Caso isolado de não emissão. | Sem evidência adicional | Não é possível confirmar pelos dados que temos |

**Importante (FATO × HIPÓTESE):** o fato é a ausência de NF-e em 06/01 e a ausência de crédito identificável. As hipóteses 1 a 5 são leituras possíveis, ainda não verificadas.

---

## 4. O que isso muda na metodologia da conciliação

A conciliação **1-para-1 não é viável com os dados atuais** por dois motivos:

1. **Granularidade incompatível dos identificadores:**
   - NF-e tem chave de acesso, número e valor — mas não traz bandeira nem AUT/CV.
   - Get Net tem AUT, CV, terminal, bandeira — mas não tem número da NF-e.
   - Banco tem valor, data, descrição — mas não tem AUT nem chave NF-e.
   - Não há campo-chave comum entre as três.

2. **Compensação intra-mês:** os totais mensais batem mesmo quando vendas individuais não batem dia a dia. Isso é compatível com um padrão operacional onde emissão de NF-e e processamento na maquininha não são exatamente simultâneos.

### 4.1 Estratégias de refinamento possíveis

| Estratégia | Vantagem | Limitação |
|---|---|---|
| **Conciliação por janela temporal** (NF-e de R$ X em D ± 3 dias × Get Net de R$ X em D) | Permite identificar pares mais prováveis | Heurística — não 100% confiável; valores repetidos confundem |
| **Conciliação por totais diários** (vs mensais) | Mais granular que o agregado mensal, sem exigir match 1-a-1 | Sujeito a defasagens de emissão entre dias |
| **Conciliação por totais diários após filtrar NF-e canceladas** | Elimina o ruído mais óbvio | Depende de receber relatório de canceladas |
| **Solicitar à Get Net relatório com referência cruzada** (se existir um campo "NF-e vinculada" no portal) | Match direto | Em geral o portal não expõe NF-e, mas vale verificar |
| **Solicitar à equipe operacional uma amostra controlada** (uma semana específica) com correspondência manual (NF-e impressa × cupom Get Net) | Valida a hipótese 1 (descoincidência operacional) | Trabalho manual da equipe; só faz sentido em amostra |

---

## 5. Implicações para o que estamos analisando

### 5.1 Para a conciliação financeira (objeto da Fase 1)

O agregado mensal **continua válido** como ferramenta de análise — é o que conseguimos fechar com confiança. A leitura dos achados (MDR efetivo, cessão observada, gap por estabelecimento) **não muda** porque dependem de totais, não de pares.

A novidade é que agora sabemos: **o agregado fecha por compensação intra-mês**, não porque cada NF-e gera Get Net e cada Get Net gera crédito bancário no mesmo dia.

### 5.2 Para o diagnóstico estratégico

Identificamos um ponto operacional digno de aprofundamento: o **descompasso temporal entre processamento de cartão e emissão de NF-e** no dia a dia da Matriz. Esse descompasso, mesmo que tecnicamente regularize-se no agregado mensal, tem implicações:

- **Para controle interno:** dificulta a conferência diária do caixa
- **Para gestão de cessão:** cria janelas de exposição não monitoradas
- **Para conformidade fiscal:** vale validar com a contabilidade externa se há algum processo de regularização posterior (substituição, complementação) que justifica a defasagem

A Marco Zero não é a parte que precisa resolver isso — é informação para o diagnóstico estratégico apresentar ao Dr. Haldley, registrando que há oportunidade de melhoria de processo.

### 5.3 Para o R04

Inclusão sugerida:
- **Relatório de NF-e canceladas** Jan-Mai/26 (hipótese 2)
- **Confirmação se há outras contas Santander** da Matriz e Filial (hipótese 4)
- **Extratos Santander Filial Jan/Fev 26** (hipótese 4 — já no R04)
- **Confirmação se a Get Net oferece relatório com referência à NF-e** (estratégia de refinamento)

---

## 6. Resposta direta à sua pergunta

> **"Caso não seja possível fazer essa identificação, precisamos refinar nossa conciliação."**

Não é possível fazer a identificação 1-para-1 com os dados atuais — não pelos limites do nosso método, mas porque **as fontes não compartilham identificador comum e operam em ritmos descoincidentes** no dia a dia.

A conciliação **continua válida em base agregada**. Para refinar individualmente, dependeríamos de:
- Relatório de canceladas (resolve hipótese 2)
- Extratos completos da Filial Santander (resolve hipótese 4)
- Eventual relatório Get Net com vinculação à NF-e (resolve hipóteses 1 e 5)

Se você quiser, posso:
- **A.** Implementar a **conciliação por janela temporal D ± N** (heurística aproximada, mas que dá uma cobertura maior que o agregado mensal)
- **B.** Implementar **conciliação por totais diários** simples
- **C.** Esperar os documentos pendentes e refazer com base mais completa
- **D.** Aprofundar uma análise específica (ex.: investigar se existe padrão sistemático de NF-e emitida em D+1 ou D+2 da venda)

Qual direção prefere?
