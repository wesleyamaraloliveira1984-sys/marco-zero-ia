# E07 — Agenda Financeira (Saldo a Receber em Cartão de Crédito) — decodificação completa

**Origem dos dados:** pasta `Financeiro/Relatorio GetNet - Cartão/Saldo de clientes a receber - cartão de crédito/` — 3 planilhas Agenda Financeira Detalhada emitidas pelo portal Get Net em 01/06/2026.

**Solicitação Wesley (05/06/2026):** decodificar os conceitos das planilhas (Inclusão, Dedução, Agenda Livre, Cessão) e cruzá-los com as demais informações do projeto.

---

## 1. Estrutura das 3 planilhas

Cada planilha tem 3 abas:

| Aba | Conteúdo |
|---|---|
| **Detalhado** | Cabeçalho com totais consolidados das movimentações + composição da agenda |
| **Resumo** | Tabela limpa dos mesmos totais oficiais |
| **Composição** | Lista UR a UR (cada linha = uma Unidade de Recebível) com até 18 colunas |

**Ressalva metodológica importante** (extraída de uma nota dentro da própria planilha 72452):

> "Os valores por UR são fidedignos ao relatório Detalhado da Get Net. **A soma das URs na aba Composição NÃO reproduz o consolidado oficial** porque o relatório agrupa URs relacionadas (UR de origem e sua cessão) repetindo os mesmos valores em cada bloco — o que duplica valores na soma. **Os totais oficiais estão na aba Resumo.**"

Aplicamos essa orientação rigorosamente: para qualquer análise quantitativa, **usamos os totais da aba Resumo**, não a soma da Composição.

---

## 2. O que são os conceitos da agenda

| Conceito | Definição | Natureza contábil |
|---|---|---|
| **Inclusão** | Soma total das URs (Unidades de Recebível) que entraram na agenda no período. Representa todas as vendas em cartão de crédito já processadas que ainda vão liquidar nos próximos meses. | Receita já reconhecida com recebimento futuro |
| **Dedução** | Pequenos ajustes negativos aplicados sobre URs específicas (R$ 731,66 no grupo todo, ~0,07% da Inclusão). | Hipóteses: tarifas de consulta, estornos parciais, ajustes manuais, eventuais IOF |
| **Antecipação** | Operações pontuais de antecipação realizadas no período. **No snapshot atual: R$ 0,00 em todas as 3 PJs.** | — |
| **Agenda Livre** | Saldo ainda **NÃO cedido** — disponível para receber no vencimento normal ou para antecipar futuramente. | Realizável a Curto Prazo (Contas a Receber Cartão) |
| **Cessão** | Saldo **já cedido** ao Santander (antecipado por operação automática ou cessão pontual). O dinheiro correspondente já entrou na conta do lojista, com deságio. | Receita já convertida em caixa (com deságio aplicado) |
| **Saldo Negativo / Gravame / Valor Retido / Reserva Financeira** | Travas ou bloqueios na agenda. **No snapshot atual: R$ 0,00 em todas.** | — |

### Equação fundamental

```
Inclusão = Agenda Livre + Cessão + |Dedução|
```

Validação numérica:

| Estab | Inclusão | Agenda Livre | + Cessão | + |Dedução| | Soma | Bate? |
|---|---:|---:|---:|---:|---:|---:|
| Merchant 72452 | 557.648,14 | 389.592,92 | 167.614,76 | 440,46 | 557.648,14 | ✅ |
| Merchant 72453 | 359.012,69 | 267.494,53 | 91.321,96 | 196,20 | 359.012,69 | ✅ |
| Merchant 147098 | 479.552,19 | 299.733,69 | 179.527,30 | 291,20 | 479.552,19 | ✅ |

A equação fecha em todas as 3.

---

## 3. Atenção — Merchant 72452 consolida 2 CNPJs

A planilha do Merchant 72452 (cadastrado em nome da Matriz Luminis) **contém URs de DOIS CNPJs:**

| CNPJ | Qtd URs | Razão |
|---|---:|---|
| 07.843.328/0001-19 (Matriz Luminis) | 297 | Vendas registradas sob CNPJ da Matriz |
| 07.843.328/0002-08 (Filial Proview) | 341 | Vendas registradas sob CNPJ da Filial |
| **Total Merchant 72452** | **638** | |

A planilha do Merchant 72453 contém **apenas as 341 URs do CNPJ /0002-08** (Filial Proview).

**Interpretação:** o Merchant 72452 opera como agenda consolidada Mais (Matriz + Filial), enquanto o Merchant 72453 isola só a Filial. Por isso, **para obter a posição só da Matriz Luminis**, fazemos:

```
Matriz Luminis = Merchant 72452 − Merchant 72453
```

---

## 4. Snapshot oficial em 01/06/2026 — visão por PJ e Grupo

### Por estabelecimento (decomposição)

| Métrica | Matriz Luminis | Filial Proview | Mais (Mat+Fil) | Óticas BH | **Grupo** |
|---|---:|---:|---:|---:|---:|
| Inclusão | 198.635,45 | 359.012,69 | 557.648,14 | 479.552,19 | **1.037.200,33** |
| Dedução | -244,26 | -196,20 | -440,46 | -291,20 | **-731,66** |
| Agenda Livre | 122.098,39 | 267.494,53 | 389.592,92 | 299.733,69 | **689.326,61** |
| Cessão | 76.292,80 | 91.321,96 | 167.614,76 | 179.527,30 | **347.142,06** |
| % do total cedido | 38,4% | 25,4% | 30,1% | 37,5% | **33,5%** |

**Validação cruzada com E01 (Agenda Angelina, mesma data):**
- Matriz Servidor /0001-19 do E01 = R$ 122.098,39 ✅ (bate com Agenda Livre da Matriz nesta análise)
- Filial Luminis /0002-08 do E01 = R$ 267.494,53 ✅ (bate com Agenda Livre da Filial)
- BH /0001-94 do E01 = R$ 299.733,69 ✅ (bate com Agenda Livre da BH)

Os dois conjuntos de dados são consistentes — confirma que a Angelina extraiu valores de "Agenda Livre" das mesmas planilhas que recebemos agora detalhadas.

---

## 5. Decodificando o que essas planilhas revelam

### 5.1 Saldo total a receber em cartão de crédito (snapshot)

O grupo Dr. Haldley tem hoje **R$ 1.036.468,67** (Inclusão menos Dedução) em vendas de cartão de crédito já processadas que ainda vão produzir entrada de caixa:

- **R$ 689.326,61 ainda não cedido** — vai entrar conforme vencimento natural das parcelas (até março/2027 para algumas)
- **R$ 347.142,06 já cedido** — o dinheiro correspondente já caiu nas contas Santander (com deságio aplicado)

### 5.2 Política de cessão observada

| Estab | % do total cedido | Leitura |
|---|---:|---|
| Matriz Luminis | 38,4% | Maior taxa de cessão proporcional |
| Filial Proview | 25,4% | Menor proporção cedida (resto fica para vencer no prazo) |
| BH | 37,5% | Mais próxima da Matriz |
| Grupo | 33,5% | Cerca de 1/3 do saldo a receber é antecipado |

A política não é "100% cessão automática" — uma parte significativa da agenda **é mantida livre** para vencer no prazo natural. Isso é coerente com o que o Termo Get Net da BH (E02) mostrou: ali a opção marcada foi **"Sem antecipação"** automática (operações de cessão são pontuais, não automáticas).

### 5.3 Cessão e composição financeira

Como **Antecipação = R$ 0** atualmente, **as movimentações de cessão ativas hoje são apenas as registradas como "Cessão" (cedidas e ainda em curso, vão liquidar para o Santander conforme vencimento)**. Não há operações pontuais novas em aberto. Isso simplifica a análise: tudo que está em "Cessão" já foi cedido e o dinheiro correspondente já entrou (com deságio).

### 5.4 A natureza da "Dedução"

A Dedução é pequena (~0,07% da Inclusão) e **não é uniforme entre os 3 estabelecimentos**:

| Estab | Dedução | % sobre Inclusão |
|---|---:|---:|
| Matriz Luminis | -244,26 | 0,123% |
| Filial Proview | -196,20 | 0,055% |
| BH | -291,20 | 0,061% |

Variação coerente com **comportamento por evento**, não por taxa fixa percentual. Hipóteses metodologicamente fortes para investigar:

1. **Cashback estornado** ao cliente em transações com bandeiras que oferecem benefícios
2. **Tarifas Get Net por consulta/operação avulsa** (extrato, segunda via)
3. **Estornos parciais** de transações canceladas com valor menor que o líquido a receber
4. **IOF residual** em operações específicas

Para esclarecer, **pedido para a Jeane no R04**: confirmação da Get Net sobre o que compõe a "Dedução" — pode ser detalhado UR a UR no portal.

---

## 6. Integração com as demais fontes do projeto

A Agenda Financeira **adiciona um quarto vértice** à análise:

```
                    NF-e (vendas declaradas Jan-Mai/26)
                         │
                         │ A-B: vendas declaradas × vendas processadas
                         ↓
                    Get Net Vendas Detalhado (transações Jan/25 - Jun/26)
                         │
                         │ B-D: cada transação alimenta a agenda futura
                         ↓
                    Agenda Financeira (saldo a receber em 01/06/26)
                         │
                         │ D-C: parte cedida vira crédito no Santander
                         ↓
                    Extratos Bancários (créditos recebidos Jan-Jun/26)
```

### O que cada par revela

| Par | O que revela |
|---|---|
| A↔B (NF-e × Get Net Detalhado) | Coerência de registro fiscal vs credenciamento |
| B↔D (Get Net Detalhado × Agenda) | Conversão de venda em saldo futuro a receber |
| D↔C (Agenda × Extratos) | Conversão do cedido em caixa efetivo (com deságio) |

### Como usamos a Agenda na Contabilidade Financeira

- **Agenda Livre** = ativo realizável (componente do nosso fluxo de caixa projetado)
- **Cessão (passada)** = caixa já recebido nos últimos meses (com deságio aplicado nos extratos)
- **Inclusão mensal** = referência de receita em cartão de crédito a reconhecer
- **Dedução** = pequeno ajuste a registrar como despesa operacional

---

## 7. Achados materiais novos

### 7.1 Validação cruzada com E01 confirma a metodologia
Os valores de Agenda Livre por CNPJ batem exatamente com o que a Angelina (Get Net) listou no e-mail de 01/06/2026 — duas fontes independentes apontando o mesmo número.

### 7.2 Mecanismo do Merchant 72452 confirmado
A consolidação Matriz + Filial em uma única agenda Get Net (Merchant 72452) é coerente com a estrutura operacional descrita anteriormente — máquinas compartilhadas, vendas registradas sob CNPJs diferentes conforme orientação interna.

### 7.3 Política de cessão revelada
Não é antecipação automática (que veríamos como 100% cedido), nem é zero. **Aproximadamente 1/3 do saldo é cedido**, sugerindo uso seletivo da antecipação. Coerente com o Termo Get Net BH que marca "Sem antecipação automática" — operações são pontuais.

### 7.4 Operações futuras de cessão monitoráveis
Como **Antecipação atual = 0**, qualquer nova operação pontual aparecerá nesta linha em snapshots futuros. Marco Zero pode acompanhar mês a mês a evolução das movimentações.

---

## 8. O que ainda precisa esclarecer

Para o R04 — solicitações à Jeane:

1. **Composição da Dedução** — detalhamento UR a UR ou natureza dos eventos (tarifa, estorno, cashback, IOF)
2. **Política operacional de cessão** — quem decide quando ceder? frequência? volume mínimo?
3. **Domicílio bancário da Cessão por CNPJ** — para qual conta Santander cai o líquido cedido em cada caso (já pedido, repetir se necessário)
4. **Histórico de movimentações** da agenda em períodos anteriores (mês a mês) — permite analisar como a cessão evoluiu ao longo do tempo
5. **Termo de Cessão de Recebíveis com o Santander** — já pedido no R03 — agora fica ainda mais relevante para validar contra os valores cedidos identificados

---

## 9. Implicações para a entrega de 16/06

A Agenda Financeira nos permite, para a Prévia v3:

1. **Apresentar o saldo total a receber em cartão** do grupo: R$ 1.036.469 (Inclusão líquida de Dedução), distribuído entre R$ 689.327 livre e R$ 347.142 cedido
2. **Estruturar projeção de fluxo de caixa** dos próximos meses com base nas datas de vencimento das URs da Agenda Livre
3. **Mostrar a posição por CNPJ** na metodologia de 3 níveis com confiança plena
4. **Demonstrar coerência metodológica** — os números da Angelina, das planilhas Saldo a Receber e do nosso parser convergem

Posso integrar esta análise à Prévia v3 (Bloco "Saldo a Receber em Cartão") quando você confirmar a direção da Fase 1.
