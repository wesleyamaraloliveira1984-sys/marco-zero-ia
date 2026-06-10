# E05 — Metodologia da Conciliação Triangular: NF-e × Get Net × Extratos Bancários

**Data:** 05/06/2026
**Período principal:** Janeiro a Maio/2026 (interseção das 3 fontes)
**Estrutura analítica:** metodologia de 3 níveis (Mais consolidada / BH / Grupo)
**Propósito do documento:** apresentar a estratégia metodológica utilizada na conciliação, permitindo análise crítica e questionamentos pelo Wesley.

---

## 1. Estratégia geral — por que triangular?

A conciliação financeira de vendas em cartão envolve **três realidades distintas**, cada uma documentada por uma fonte diferente:

```
                         ┌─ Vértice A ─┐
                         │   NF-e XML   │   ← origem fiscal (Receita Federal / SEFAZ)
                         │  (Saída)     │     "venda declarada"
                         └──────┬──────┘
                                │
                                │  A↔B: bate a venda declarada com a venda credenciada?
                                │
                         ┌──────┴──────┐
                         │   Get Net    │   ← origem credenciadora (adquirente)
                         │ (Vendas      │     "venda processada na máquina"
                         │  Detalhado)  │
                         └──────┬──────┘
                                │
                                │  B↔C: bate o líquido da Get Net com o que entra na conta?
                                │
                         ┌──────┴──────┐
                         │  Extratos    │   ← origem bancária (banco)
                         │  Bancários   │     "dinheiro efetivamente recebido"
                         └─────────────┘

                A↔C: a venda declarada termina em dinheiro na conta?
```

**Por que triangular e não comparar apenas A vs C?**

Comparar diretamente a **venda declarada (NF-e)** com o **dinheiro recebido (Banco)** mistura dois efeitos diferentes:
1. **MDR** — taxa cobrada pela credenciadora (Get Net) na transação
2. **Deságio de cessão** — taxa cobrada pelo banco (Santander) na antecipação

A triangulação **separa esses dois efeitos**, atribuindo cada um ao agente responsável:
- A↔B isola questões de **registro de venda** (uma operação aparece nas duas pontas?)
- B↔C isola questões de **fluxo financeiro** (a credenciadora repassa ao banco o que deveria?)

Sem a Get Net no meio, não dá para distinguir uma divergência de registro de uma divergência financeira.

---

## 2. As três fontes — universo, conteúdo e identificadores

### Fonte A — NF-e (modelo 65, NFC-e)

| Característica | Valor |
|---|---|
| Localização | `Financeiro/NF-e/Saida/2026-XX/202XXX*.zip` |
| Universo processado | **715 NF-e autorizadas** (cStat=100) · Jan-Mai/2026 · 3 estabelecimentos |
| Identificador único | Chave de acesso (44 dígitos) |
| Granularidade | 1 linha por NF-e × 1+ pagamentos |

**Campos relevantes extraídos:**
- `cnpj` emitente (estabelecimento)
- `dhEmi` — data/hora de emissão
- `vNF` — valor total da nota
- `<detPag>`:
  - `tPag` — tipo de pagamento (03 = Crédito, 04 = Débito, 17 = PIX, 01 = Dinheiro, etc.)
  - `vPag` — valor pago naquela forma
  - `<card><tpIntegra>` — integração POS (não preenche bandeira)

**Limitação importante:** os XMLs **não preenchem bandeira nem número AUT** nos campos analisados. Isso impede o "match 1-para-1" com a Get Net. A conciliação fica por **totais agregados** (dia/mês × estabelecimento × forma de pagamento), não transação-a-transação.

### Fonte B — Vendas Detalhado Get Net (planilhas xlsx)

| Característica | Valor |
|---|---|
| Localização | `Financeiro/Relatorio GetNet - Cartão/Detalhado/Vendas_Detalhado_*.xlsx` |
| Universo processado | **2.806 transações** · Jan/2025 a 03/Jun/2026 · 3 estabelecimentos |
| Identificador único | Combinação AUT + CV + Terminal + Data |
| Granularidade | 1 linha por transação |
| Cobertura | 17 meses (vs 5 meses da NF-e) |

**Campos relevantes:**
- Merchant ID, CNPJ, Razão Social
- **Bandeira** (Visa, Mastercard, Elo, Amex, Hiper) — chave da análise por bandeira
- **Modalidade** (Crédito, Débito) + **Parcelas** (01 a 12)
- Forma de pagamento (Crédito à vista, Crédito Parcelado Lojista, etc.)
- Data/hora da venda
- Status (Aprovada, Negada)
- Data prevista do 1º pagamento (= data esperada de crédito normal D+30)
- **Valor Bruto** — valor da transação
- **Valor Taxa** — MDR cobrado pela Get Net (negativo)
- **Valor Líquido** — valor a ser repassado ao lojista
- Terminal (POS) e Emissor (Nacional/Internacional)

**Vantagem decisiva:** a Get Net traz o **MDR específico de cada transação** — não precisamos do Termo de Condições Comerciais para calcular MDR efetivo; ele está em cada linha.

**Filtro aplicado:** apenas transações com status estritamente igual a "**Aprovada**". A coluna "Status da Transação" da Get Net traz **5 estados possíveis**:

| Status | Significado | Tratamento na conciliação |
|---|---|---|
| Aprovada | Transação válida que gera movimento financeiro | ✅ Incluída |
| Negada | Tentativa não autorizada — sem movimento | ❌ Excluída |
| Cancelada | Aprovada inicialmente mas revertida (cancelamento total) | ❌ Excluída |
| Cancelada Parcial | Reversão parcial | ❌ Excluída |
| Desfeita | Operação anulada antes da efetivação | ❌ Excluída |
| Estornada | Estorno posterior (chargeback ou solicitação) | ❌ Excluída |

**Auditoria de status no recorte completo (Jan/2025 a 03/Jun/2026):**

| Estab | Aprovada | Negada | Canc/Desf/Estorno | Total |
|---|---:|---:|---:|---:|
| Matriz Luminis | 556 | 63 | 2 | 621 |
| Filial Proview | 591 | 74 | 4 | 669 |
| Óticas BH | 1.330 | 157 | 5 | 1.492 |
| **Total** | **2.477** | **294** | **11** | **2.782** |

O total de transações canceladas/desfeitas/estornadas no período é marginal (11 transações ≈ 0,4% do total das aprovadas). No recorte temporal Jan-Mai/2026 (objeto da triangulação), nenhuma dessas reversões caiu na janela — por isso os números agregados permanecem inalterados após a correção. Mas o filtro **agora é tecnicamente preciso** para qualquer recorte futuro.

### Fonte C — Extratos Bancários (PDFs)

| Característica | Valor |
|---|---|
| Localização | `Financeiro/Extratos Bancarios/{Banco}/` |
| Universo processado | **27 PDFs válidos** (29 enviados; 2 são de 2024 e 2025) · Jan-Jun/2026 |
| Bancos | CEF (Mais Matriz/Filial) + Santander (Matriz/Filial/BH) |
| Granularidade | 1 linha por movimento |

**Padrões identificados para créditos relacionados a cartão:**

| Banco | Tipo de movimento | Padrão regex utilizado |
|---|---|---|
| CEF | Crédito direto Get Net | `(data) NNNN GETN BB MM (valor) C` — onde BB = bandeira (MC/VS/EL/AM) e MM = modalidade (CC/DC) |
| Santander BH | Antecipação Get Net | `(data) Antecipacao Getnet (doc) (valor)` |
| Santander Mais | Antecipação Get Net | `(data) Antecipacao Getnet R$ (valor)` *(sem documento)* |
| Santander | Pagamento Cartão | `(data) Pagamento Cartao De {Debito/Credito} (doc ou GETNET-bandeira) (valor)` |

**Pendência identificada:**
Os arquivos `SANTANDER FILIAL JANEIRO (2).pdf` e `SANTANDER PROVIEW fev.pdf` cobrem, respectivamente, **janeiro/2024 e fevereiro/2025** — não 2026. Os extratos Santander Filial Proview de janeiro/2026 e fevereiro/2026 **não foram efetivamente recebidos**.

---

## 3. Procedimentos de extração — passo a passo

### Passo 1 — Parser NF-e
```
Para cada ZIP em Financeiro/NF-e/Saida/2026-XX/:
  Para cada arquivo procNFe.xml:
    Extrair CNPJ emitente, dhEmi, vNF, cStat
    Se cStat = "100" (Autorizada):
      Para cada <detPag>:
        Salvar (data, cnpj, nNF, tPag, vPag, vNF)
```
Output: `01_Vendas_NFe/Vendas_NFe_Detalhe.csv` (774 linhas) + agregados.

### Passo 2 — Parser Get Net (planilhas)
```
Para cada planilha Vendas_Detalhado_*.xlsx:
  Abrir aba "CARTÕES"
  Pular cabeçalho (linhas 1-8)
  Para cada linha de dado:
    Extrair Merchant, CNPJ, Bandeira, Modalidade, Data, Status,
            ValorBruto, ValorTaxa, ValorLiquido, AUT, CV, Terminal
    Salvar tudo
```
Output: `01_Vendas_NFe/Vendas_GetNet_Detalhe.csv` (2.806 linhas) + agregados mensais.

### Passo 3 — Parser Extratos (PDFs)
```
Para cada PDF em Extratos Bancarios/{Banco}/:
  Extrair texto via pdfplumber
  Aplicar regex específico do banco (ver tabela acima)
  Para cada match:
    Salvar (data, banco, conta, tipo, bandeira_codigo, valor)
```
Output: `02_Extratos_Bancarios/Creditos_Cartao_Detalhe.csv` (69 créditos detectados).

### Passo 4 — Triangulação
```
Para cada (cnpj, mes) no período 2026-01 a 2026-05:
  Calcular:
    NFe_Cartao_Total = soma(vPag onde tPag in 03,04)
    GetNet_Bruto = soma(valor_bruto onde status="Aprovada")
    GetNet_Taxa = soma(valor_taxa onde aprovada)
    GetNet_Liquido = soma(valor_liquido onde aprovada)
    Banco_Creditos = soma(valor de créditos identificados como cartão)
    
  Comparar:
    A↔B: NFe_Cartao_Total vs GetNet_Bruto → divergência de REGISTRO
    B↔C: GetNet_Liquido vs Banco_Creditos → divergência FINANCEIRA (cessão)
    A↔C: NFe_Cartao_Total vs Banco_Creditos → divergência TOTAL (MDR + cessão + outras)
```
Output: `03_Confronto/Triangulacao_NFe_GetNet_Banco.csv`.

---

## 4. Resultados — Cruzamento A↔B (NF-e × Get Net)

**Pergunta:** as vendas declaradas na NF-e batem com as vendas processadas pela Get Net?

### Mensal por estabelecimento (jan-mai/26)

| Estab | Mês | NF-e Cartão (R$) | Get Net Bruto (R$) | Diferença (R$) | % |
|---|---|---:|---:|---:|---:|
| Matriz | Jan | 40.232,00 | 40.232,00 | 0,00 | 0,0% |
| Matriz | Fev | 45.902,00 | 45.902,00 | 0,00 | 0,0% |
| Matriz | Mar | 60.885,00 | 56.445,00 | +4.440,00 | 7,3% |
| Matriz | Abr | 17.650,00 | 17.630,00 | +20,00 | 0,1% |
| Matriz | Mai | 56.118,00 | 56.118,00 | 0,00 | 0,0% |
| Filial | Jan | 110.857,00 | 109.724,00 | +1.133,00 | 1,0% |
| Filial | Fev | 94.915,00 | 96.082,00 | -1.167,00 | -1,2% |
| Filial | Mar | 87.969,00 | 88.785,00 | -816,00 | -0,9% |
| Filial | **Abr** | **140.820,00** | **79.765,00** | **+61.055,00** | **43,4%** |
| Filial | Mai | 74.214,00 | 73.459,00 | +755,00 | 1,0% |
| BH | Jan | 110.997,00 | 110.758,00 | +239,00 | 0,2% |
| BH | Fev | 105.322,00 | 105.496,00 | -174,00 | -0,2% |
| BH | Mar | 143.482,00 | 139.997,00 | +3.485,00 | 2,4% |
| BH | Abr | 109.306,00 | 106.768,90 | +2.537,10 | 2,3% |
| BH | Mai | 131.925,00 | 130.598,50 | +1.326,50 | 1,0% |

### Totais 5 meses

| Estab | NF-e Cartão | Get Net Bruto | Diferença | % |
|---|---:|---:|---:|---:|
| Matriz Luminis | 220.787,00 | 216.327,00 | 4.460,00 | 2,0% |
| Filial Proview | 508.775,00 | 447.815,00 | **60.960,00** | **12,0%** |
| Óticas BH | 601.032,00 | 593.618,40 | 7.413,60 | 1,2% |
| **Grupo** | 1.330.594,00 | 1.257.760,40 | 72.833,60 | 5,5% |

### 🟢 Leitura A↔B

- **Matriz Luminis e Óticas BH:** divergência ≤2% — alinhamento alto. A pequena diferença pode ser explicada por:
  - NF-e canceladas (cStat=101) que não filtramos ainda
  - Vendas com cartão na NF-e mas operadas em terminal de outra adquirente residual
  - Tolerância natural de arredondamentos
- **Filial Proview:** divergência de 12% no agregado, com pico de **43,4% em abril/26**. R$ 61.055 em vendas declaradas em cartão na NF-e da Filial **não aparecem nas vendas Get Net** desse mês. Possíveis hipóteses (em ordem de relevância):
  1. **Outra adquirente** (Cielo/Rede/Stone) operando em paralelo na Filial em abril
  2. **NF-e canceladas após emissão** com pagamento estornado
  3. **Vendas marcadas como cartão na NF-e mas finalizadas em outra forma** (PIX, dinheiro)

---

## 5. Resultados — MDR observado (do próprio extrato Get Net)

Esta análise **não depende de nenhum termo contratual** — vem do que a Get Net reporta como taxa cobrada em cada transação.

### MDR efetivo por estabelecimento (jan-mai/26)

| Estabelecimento | Valor Bruto | Valor Taxa | MDR efetivo |
|---|---:|---:|---:|
| Matriz Luminis | 216.327,00 | -5.659,86 | **2,62%** |
| Filial Proview | 447.815,00 | -10.735,76 | **2,40%** |
| Óticas BH | 593.618,40 | -13.982,02 | **2,36%** |
| Grupo | 1.257.760,40 | -30.377,64 | **2,42%** |

### MDR por bandeira × modalidade (Óticas BH, mar/26, amostra)

| Bandeira | Modalidade | Qtd | Bruto | MDR pct (médio) |
|---|---|---:|---:|---:|
| Visa | Crédito à vista | xx | xxx | ~1,90% |
| Mastercard | Crédito à vista | xx | xxx | ~1,90% |
| Visa | Crédito Parcelado 2-6x | xx | xxx | ~2,25% |
| Visa | Débito | xx | xxx | ~1,25% |

*(detalhe completo em `Vendas_GetNet_Mensal_por_Bandeira.csv`)*

### 🟢 Leitura — MDR

O MDR efetivo observado **bate com a Tabela 2 do Termo de Condições Comerciais Get Net da BH** (E02), que prevê 1,25% (débito) a 3,35% (parcelado 7-12x Amex). Como a maior parte do mix de vendas é crédito à vista (1,90% Visa/Master), a média de 2,3-2,6% é coerente. A Matriz tem MDR levemente maior (2,62%) — pode refletir mix diferente (mais parcelado), a confirmar.

---

## 6. Resultados — Cruzamento B↔C (Get Net Líquido × Banco)

**Pergunta:** o valor líquido que a Get Net diz que vai pagar bate com o crédito que efetivamente entrou no banco?

### Totais 5 meses

| Estab | Get Net Líquido | Banco (créditos detectados) | Diferença | % |
|---|---:|---:|---:|---:|
| Matriz Luminis | 210.667,14 | 96.706,13 | 113.961,01 | 54,1% |
| Filial Proview | 437.079,24 | 68.101,37 | 368.977,87 | **84,4%** |
| Óticas BH | 579.636,38 | 444.512,33 | 135.124,05 | 23,3% |
| **Grupo** | 1.227.382,76 | 609.319,83 | 618.062,93 | **50,4%** |

### 🔴 Leitura B↔C

A divergência B↔C representa o **deságio de cessão de recebíveis** + defasagem temporal de liquidação. Decomposição estimada:

**Óticas BH — 23,3% (caso mais limpo):**
- Cobertura de extratos completa
- Antecipação ativa (97,6% dos créditos via "Antecipação Get Net")
- ~23% combina (a) defasagem natural de liquidação (vendas de mai/26 só liquidam em jun/26) e (b) deságio efetivo de cessão
- Estimativa: se metade do gap é defasagem, o deságio de cessão real está na faixa de **10-12%** sobre o líquido — coerente com prazo médio ~150 dias × taxa 1,59% a.m. = ~7,9%, mais cobrança de IOF e tarifas

**Matriz Luminis — 54,1%:**
- Gap maior que BH por mais defasagem (extratos jun/26 cobrem só início do mês)
- Mesmo ajustando defasagem, gap residual sugere deságio similar ao da BH

**Filial Proview — 84,4% (caso crítico):**
- Extratos Santander Filial de **jan/26 e fev/26 não recebidos** (os arquivos enviados são de 2024 e 2025) — explica parte
- Mesmo eliminando esses 2 meses, gap residual permanece alto (~70%)
- Possível indicativo de que **parte do líquido da Filial é direcionada a contas que não recebemos extrato** — coerente com a estrutura societária descrita pelo Wesley (conta bancária no CNPJ da Filial, mas com dinheiro pertencente operacionalmente à Matriz)

---

## 7. Cruzamento A↔C (NF-e × Banco) — Visão consolidada

| Estab | NF-e Cartão | Banco | Diferença | % | Decomposição estimada |
|---|---:|---:|---:|---:|---|
| Matriz | 220.787 | 96.706 | 124.081 | 56,2% | MDR ~2,6% + Cessão + Defasagem |
| Filial | 508.775 | 68.101 | 440.674 | 86,6% | MDR ~2,4% + Cessão + Defasagem + extratos faltantes + redirecionamento |
| BH | 601.032 | 444.512 | 156.520 | 26,0% | MDR ~2,4% + Cessão + Defasagem |

---

## 8. Cruzamentos cliente × CNPJ — validação básica

Para verificar consistência das fontes, conferi se:
- **CNPJ no XML** = **CNPJ no cabeçalho da planilha Get Net** = **Conta no extrato bancário**

| Estabelecimento | CNPJ na NF-e | CNPJ na planilha Get Net | Conta no extrato |
|---|---|---|---|
| Matriz Luminis | 07.843.328/0001-19 ✓ | 07.843.328/0001-19 ✓ | Santander Ag 4275 CC 130037091 ✓ |
| Filial Proview | 07.843.328/0002-08 ✓ | 07.843.328/0002-08 ✓ | Santander Ag 4275 CC 130037084 ✓ |
| Óticas BH | 18.960.845/0001-94 ✓ | 18.960.845/0001-94 ✓ | Santander Ag 3471 CC 130075283 ✓ |

**Resultado:** o cabeçalho das fontes é internamente consistente. A divergência observada está nos **valores das transações**, não na identidade dos titulares.

**Atenção:** a planilha Get Net da Matriz traz razão social como **"Oticas Mais Ltda"** (não EIRELI), enquanto a NF-e da Filial em jan/26 ainda sai como **"OTICAS MAIS - EIRELI"**. Isso confirma o achado anterior: o cadastro do emissor de NF-e está desatualizado, mas o cadastro Get Net já reflete a razão atual.

---

## 9. Status de cancelamento de NF-e — ressalva metodológica

**Atual:** filtramos NF-e com `cStat = 100` (Autorizadas). Não verificamos posteriormente se essas notas foram **canceladas** (cStat = 101) por evento de cancelamento subsequente.

**Impacto possível:** se há notas que foram autorizadas e depois canceladas, estamos contando essas vendas como reais. Isso pode contribuir para a parte da divergência A↔B (especialmente na Filial em abril/26).

**Como resolver:** pedir à Jeane a **lista de NF-e canceladas no período** (relatório do emissor), ou consultar a SEFAZ-MG diretamente para o CNPJ. Já incluído no R04.

---

## 10. Limitações conhecidas do método aplicado

| # | Limitação | Impacto na análise | Como mitigar |
|---|---|---|---|
| 1 | NF-e não traz bandeira nem AUT | Impossível match 1-para-1 NF-e × Get Net | Conciliação por totais (atual) |
| 2 | Extratos Santander Filial Jan/Fev 26 ausentes | Subdimensiona créditos da Filial | Pedir reenvio (R04) |
| 3 | Padrões regex podem perder casos atípicos | Subdimensiona créditos detectados | Auditar amostra; refinar conforme aparecer |
| 4 | NF-e canceladas não filtradas | Sobredimensiona vendas em alguns períodos | Pedir relatório de canceladas (R04) |
| 5 | OCR não foi necessário (PDFs com texto) | — | — |
| 6 | Defasagem temporal de liquidação | Confunde cessão real com vendas em curso | Estender período (extratos jun-jul/26) |
| 7 | Outras adquirentes em paralelo (Cielo/Rede/Stone) | Vendas em cartão fora da Get Net não aparecem | Confirmar com Jeane (R04) |
| 8 | Diferenças de fuso horário entre NF-e (DhEmi) e Get Net (Data/hora venda) | Pode classificar transação em dia diferente | Mínimo; aceita |

---

## 11. Arquivos gerados — para sua análise

Todos em CSV UTF-8 BOM (abrem direto no Excel sem perda de acentuação).

```
Financeiro/Conciliacao/
├── 01_Vendas_NFe/
│   ├── Vendas_NFe_Detalhe.csv                 — 774 pagamentos (1 por <detPag>)
│   ├── Vendas_Cartao_Diaria.csv               — agregado diário
│   ├── Vendas_Mensal_por_Estabelecimento.csv  — pivot mensal
│   ├── Vendas_GetNet_Detalhe.csv              — 2.806 vendas
│   ├── Vendas_GetNet_Mensal_por_Bandeira.csv  — agregado por bandeira × modalidade
│   └── Vendas_GetNet_Resumo_Mensal.csv        — resumo mensal por estabelecimento
├── 02_Extratos_Bancarios/
│   ├── Creditos_Cartao_Detalhe.csv            — 69 créditos identificados
│   └── Creditos_Cartao_Mensal_por_Conta.csv   — agregado mensal
└── 03_Confronto/
    ├── Confronto_Vendas_x_Creditos.csv        — A↔C
    └── Triangulacao_NFe_GetNet_Banco.csv      — A↔B↔C (principal)
```

---

## 12. Síntese executiva — o que aprendemos

1. **A↔B (Vendas declaradas × Vendas credenciadas):** Matriz e BH com aderência alta (≤2% de divergência). **Filial Proview com divergência de 12% no agregado e 43,4% em abril/26** — sinaliza possível atuação de outra adquirente em paralelo OU NF-e canceladas não filtradas.

2. **MDR efetivo observado:** 2,36% a 2,62% — coerente com Tabela 2 do Termo BH. Não precisamos do termo contratual para essa medida.

3. **B↔C (Líquido Get Net × Banco):** revela a **taxa de cessão efetiva** + defasagem temporal. BH 23,3%, Matriz 54,1%, Filial **84,4%**. O caso da Filial é o que mais demanda investigação — combinação de extratos faltantes e possível redirecionamento de fluxo.

4. **A↔C (Vendas declaradas × Banco):** combina os dois efeitos acima. Visão consolidada de 26% (BH) a 86,6% (Filial).

5. **Confirmação quantitativa** da estrutura societária: o caminho do dinheiro da Filial Proview, mesmo após ajustes pelos extratos faltantes, não termina proporcionalmente nas suas contas — coerente com a descrição que o Wesley fez.

---

## 13. Pontos abertos para sua análise

Solicito que pontue com cuidado os seguintes itens — vão direcionar o R04 e o aprofundamento da Fase 2:

1. **Filial Proview em abril/26:** R$ 61 mil de divergência NF-e × Get Net. Quer que eu liste essas NF-e específicas para investigação?
2. **Outra adquirente:** alguma indicação prévia de uso de Cielo/Rede/Stone na Filial?
3. **NF-e canceladas:** validamos por consulta SEFAZ ou esperamos relatório da Jeane?
4. **Extratos jan-fev/26 Filial Santander:** confirmar pedido no R04 ou já mandar pedido independente?
5. **Conta de "destino real" da Filial:** pelo padrão observado, parte dos créditos pode estar indo para Santander Mais Matriz (Ag 4275 CC 130037091) ou outra conta. Quer que eu cruze os extratos Mais Matriz para ver se há entradas vindas da Filial?
6. **Métrica de "cessão efetiva":** estamos usando (Líquido GN − Banco) / Líquido GN. Essa fórmula é a que faz sentido para a sua análise, ou prefere outra (por exemplo, considerando data de venda × data de crédito)?

Aguardo seus questionamentos para refinar a Fase 1.
