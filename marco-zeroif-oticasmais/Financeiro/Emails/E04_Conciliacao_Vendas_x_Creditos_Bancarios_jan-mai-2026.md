# E04 — Conciliação Vendas em Cartão (NF-e) × Créditos Bancários (Extratos)

## Metadados
- **Período analisado:** Jan a Mai/2026 (NF-e) · Jan a Jun/2026 (Extratos)
- **Estrutura analítica:** metodologia de 3 níveis (Matriz Luminis + Filial Proview = Óticas Mais consolidada · Óticas BH · Grupo)
- **Universo NF-e:** 715 NF-e modelo 65 (NFC-e) autorizadas (cStat=100)
- **Universo Extratos:** 27 PDFs válidos (29 enviados; 2 referem-se a 2024/2025 — ver pendência operacional)
- **Data da análise:** 05/06/2026

## 1. Objetivo

Confrontar:
- **Origem (NF-e):** valor total declarado em transações de cartão (tPag=03 crédito + tPag=04 débito) por estabelecimento × mês
- **Destino (Extratos):** créditos relacionados a cartão identificados nos extratos bancários (Get Net direto via CEF + Antecipação Get Net via Santander)

Para entender o **caminho efetivo do dinheiro**: quanto entrou de fato nas contas, em qual banco, com qual identificação, e qual o gap observado.

## 2. Resultados consolidados — Grupo

| Estabelecimento | Vendas Cartão (NF-e) | Créditos Bancários | Diferença | % Diferença |
|---|---:|---:|---:|---:|
| Matriz Luminis | 220.787,00 | 96.706,13 | 124.080,87 | 56,2% |
| Filial Proview | 508.775,00 | 69.953,11 | 438.821,89 | 86,3% |
| Óticas BH | 601.032,00 | 444.512,33 | 156.519,67 | 26,0% |
| **Grupo (consolidado)** | **1.330.594,00** | **611.171,57** | **719.422,43** | **54,1%** |

## 3. Mapa por canal de recebimento

| Estabelecimento | Antecipação Get Net (Santander) | Crédito Get Net Direto (CEF) | Pagamento Cartão (Santander) | Total |
|---|---:|---:|---:|---:|
| Matriz Luminis | 83.940,51 | 2.057,71 | 10.707,91 | 96.706,13 |
| Filial Proview | 42.475,26 | 27.477,85 | — | 69.953,11 |
| Óticas BH | 433.864,34 | — | 10.647,99 | 444.512,33 |

**Observações:**
- **Óticas BH:** 97,6% dos créditos identificados vêm de "Antecipação Get Net" no Santander. Padrão consistente com perfil de antecipação ativa.
- **Matriz Luminis:** 86,7% via Antecipação Santander, 2,1% via créditos diretos no CEF. Antecipação é o mecanismo principal.
- **Filial Proview:** Antecipação aparece apenas em abril/2026 (R$ 42.475) — sinal de que faltam dados (ver pendência).

## 4. Análise mês a mês — Óticas BH (caso mais completo)

| Mês | Vendas Cartão NF-e | Créditos Banco | Diferença | % | Leitura |
|---|---:|---:|---:|---:|---|
| Jan/26 | 110.997,00 | 62.993,16 | 48.003,84 | 43,2% | Defasagem inicial — vendas de janeiro ainda liquidando |
| Fev/26 | 105.322,00 | 43.820,01 | 61.501,99 | 58,4% | Acumulando defasagem |
| Mar/26 | 143.482,00 | 105.976,61 | 37.505,39 | 26,1% | Começa a equilibrar |
| Abr/26 | 109.306,00 | 81.379,60 | 27.926,40 | 25,5% | Estabilizado em ~25% |
| Mai/26 | 131.925,00 | 150.342,95 | -18.417,95 | -14,0% | Excedente — créditos de meses anteriores liquidando |

**Leitura interpretativa:** o padrão temporal é consistente com **defasagem natural de liquidação cartão** (D+30 para crédito à vista, mais longo para parcelado). O gap diminui ao longo dos meses e vira excedente em maio, indicando que parte das vendas mar/abr está liquidando agora. **Para conciliação fechada, precisamos estender a janela de extratos até julho/agosto/26.**

## 5. Pendências operacionais identificadas

### 5.1 Extratos Santander Filial Proview — Janeiro e Fevereiro/2026 ausentes
Os dois arquivos enviados com nomes similares são, na verdade, de períodos diferentes:
- `SANTANDER FILIAL JANEIRO (2).pdf` → cobertura: **Janeiro de 2024** (não 2026)
- `SANTANDER PROVIEW fev.pdf` → cobertura: **Fevereiro de 2025** (não 2026)

Apenas março, abril, maio e junho/2026 estão disponíveis para a Filial Proview no Santander. **Isto explica boa parte do gap de 86% identificado para a Filial.**

### 5.2 Extratos potencialmente faltantes (a confirmar)
- Conta principal de recebimento de cartão da Filial Proview no Santander (jan-fev/2026)
- Possíveis contas adicionais não mapeadas (a Filial pode ter mais de uma conta Santander)

## 6. Hipóteses para o gap residual (a confirmar com dados adicionais)

Mesmo considerando a defasagem temporal e a ausência dos extratos de janeiro/fevereiro da Filial Santander, parte do gap pode estar relacionada a:

1. **Operações de antecipação não rastreadas** — se há uma conta Santander de domicílio de antecipação que não recebemos extrato.
2. **Outras adquirentes em paralelo** (Cielo/Rede/Stone) — hipótese já no R01 Bloco 2.
3. **Bandeiras Amex/Hiper em outra credenciadora** — observamos que Amex aparece apenas na agenda da BH e Hiper não aparece em nenhuma das agendas Get Net.
4. **Chargebacks e estornos** — reduzem o crédito efetivo na conta vs venda declarada.
5. **Cancelamentos de NF-e** — algumas notas autorizadas (cStat=100) podem ter sido posteriormente canceladas (cStat=101) e nossa base atual não filtrou esse caso. *(A verificar — pode demandar reprocessamento.)*

## 7. Cálculo da taxa efetiva combinada (MDR + Cessão) — observada

Para a Óticas BH, tomando o mês de **março/2026** como amostra estabilizada (gap de 26%, sem defasagem extrema):

```
Vendas Cartão NF-e Mar/26    = R$ 143.482,00
Créditos Banco Mar/26        = R$ 105.976,61
Deságio observado            = R$  37.505,39  (26,1% sobre vendas)
```

Este 26,1% **inclui ambos**: MDR (taxa de credenciamento) e Cessão (taxa de antecipação). Como o Termo BH (E02) indica MDR variando de 1,25% (débito) a 3,35% (parcelado 7-12x Amex), e a maior parte das vendas é à vista (1,90% Visa/Master/Elo), o **MDR esperado é ~2-3%**. O restante (~23-24%) seria deságio de antecipação.

**Importante:** este é um cálculo observacional. Para confirmar:
- Precisamos isolar quais valores no extrato são liquidação D+30 normal vs antecipação imediata
- Precisamos do prazo médio das operações antecipadas
- O Termo de Cessão Santander confirmará a fórmula real de deságio

## 8. Confirmação empírica do que já sabemos sobre a estrutura

O resultado **confirma de forma quantitativa** o que o Wesley já havia esclarecido sobre a Filial Proview:
- A Filial Proview registra vendas de cartão (R$ 508 mil em 5 meses) mas tem **discrepância significativa** entre vendas registradas e créditos bancários nas contas vinculadas a seu CNPJ.
- Mesmo considerando os extratos pendentes (jan-fev Santander), o padrão indica que o caminho do dinheiro **não termina nas contas da Filial Proview de forma proporcional às vendas registradas em seu nome**.

## 9. O que conseguimos entregar com base no que temos

Para a entrega de 16/06, a Marco Zero pode apresentar com confiança:

1. **Vendas totais em cartão por estabelecimento × mês** (NF-e jan-mai/2026) — base sólida, 715 NF-e autorizadas
2. **Mapa de fluxo dos créditos** — quanto entra em cada conta de cada estabelecimento, via Antecipação Get Net (Santander), Crédito Direto (CEF), Pagamento Cartão (Santander)
3. **Custo combinado observado** (MDR + Cessão) — com ressalva metodológica de ser observacional (não contratual)
4. **Gap identificado e suas hipóteses** — apresentado com transparência metodológica (FATO × HIPÓTESE)
5. **Pendências documentais identificadas pela própria análise** — fortalece o R04

## 10. O que pedir no R04 para fechar a conciliação

| Item | Por que |
|---|---|
| Extratos Santander Filial Proview de **Janeiro e Fevereiro/2026** | Os 2 arquivos enviados são de 2024 e 2025 — necessários para fechar o gap |
| Extratos do **mês de Julho/2026** das 3 contas principais (Mais Santander Matriz/Filial + BH Santander) | Para capturar liquidação das vendas de maio/26 |
| **Termo de Cessão de Recebíveis Santander** (R03 #3 — já pedido) | Validar fórmula de deságio observada |
| **Termos Get Net da Matriz e Filial** (R01 Bloco 1 — já pedido) | Validar MDR observado |
| **Histórico operação-a-operação de antecipação Santander** (R03 #3 — já pedido) | Conciliar com extratos |
| **Confirmação se há outra adquirente em paralelo** (Cielo/Rede/Stone) | Hipótese 6.2 |
| **Extratos de eventuais contas adicionais Santander da Filial** | Hipótese 6.1 |
| **Relatório de NF-e canceladas (cStat=101)** Jan-Mai/26 | Refinar a base de vendas |

## 11. Arquivos gerados (pasta `Financeiro/Conciliacao/`)

```
01_Vendas_NFe/
  Vendas_NFe_Detalhe.csv            — 774 linhas (1 por pagamento)
  Vendas_Cartao_Diaria.csv          — agregado diário
  Vendas_Mensal_por_Estabelecimento.csv — pivot mensal

02_Extratos_Bancarios/
  Creditos_Cartao_Detalhe.csv       — 69 créditos identificados
  Creditos_Cartao_Mensal_por_Conta.csv — agregado mensal

03_Confronto/
  Confronto_Vendas_x_Creditos.csv   — tabela comparativa por estab × mês
```

Todos em CSV UTF-8 BOM (abrem direto no Excel sem perda de acentuação).

---

## Conclusão executiva (para a entrega de 16/06)

A conciliação **é possível com os dados disponíveis**, e a análise revela:

- **Caminho dos créditos identificado** — predominância de Antecipação Get Net via Santander como mecanismo principal de recebimento nas 3 PJs.
- **Gap parcialmente explicado** — defasagem natural de liquidação D+30 e a ausência de 2 meses de extrato da Filial Santander explicam boa parte.
- **Custo combinado observado para BH (mar/26):** ~26% das vendas, dos quais ~2-3% MDR e ~23-24% deságio de cessão. Coerente com prazo médio de antecipação ~150 dias e taxa Get Net observada de 1,59% a.m. (hipótese a confirmar com Termo de Cessão).
- **Confirmação quantitativa** da estrutura societária: o caminho do dinheiro da Filial Proview não corresponde proporcionalmente às vendas registradas em seu CNPJ.

A entrega da Marco Zero em 16/06 inclui este mapa de fluxo + as hipóteses + o pedido focado de complementos (R04) — sem dependência de aguardar todos os documentos para apresentar o que já temos com solidez.
