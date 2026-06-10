# EST03 — Dicionário MIRA · v1.0

**Data:** 08/06/2026
**Autor:** Wesley Amaral · Marco Zero Inteligência Financeira
**Status:** Versão de fundação · valida para todos os artefatos a partir desta data
**Independente de:** Anamnese (EST02), Mockups, Código
**Reaplicável a:** Dr. Haldley (Óticas Mais — piloto), Namour (próximo), clientes futuros

> **Fonte única de verdade do produto MIRA.**
> Toda métrica, toda tela, toda comunicação com cliente, todo mockup, toda linha de código se referencia a este documento. Quem renomear uma métrica fora daqui está fora do padrão MIRA.

---

## Parte 1 — Identidade do produto

| Campo | Valor |
|---|---|
| **Nome do produto** | MIRA |
| **Sub-marca** | "um produto Marco Zero Inteligência Financeira" — assinado no rodapé de toda tela |
| **Conceito-síntese** | Inteligência Financeira que dá foco aos números do seu negócio |
| **Manifesto curto** | Os óculos certos não criam o mundo — só revelam o que estava lá, sem distorção. O MIRA não inventa receita, não esconde despesa, não promete milagre. Ele entrega **foco** sobre o que sua empresa já é, com a linguagem do seu dia-a-dia. |
| **Versão deste dicionário** | v1.0 — fundação |
| **Próxima revisão prevista** | Antes do release do MVP (v1.1 incorpora ajustes do mockup e da reunião com o Dr. Haldley) |

---

## Parte 2 — Regras editoriais (princípios fundadores)

### Regra 1 · Camada Dupla (princípio fundador nº 1)

Toda métrica do MIRA existe em **2 camadas simultâneas**, controladas pelo usuário:

| Camada | Visibilidade padrão | Para quê | Como aparece |
|---|---|---|---|
| **Simples** | Sempre visível em primeiro plano | Uso diário do cliente · leitura rápida no celular | "Reserva de Oxigênio: 1,8 mês" |
| **Técnica** | Sob clique no ícone `?` ao lado da métrica | Conversa com contador externo · revisão técnica · momentos de tensão (banco, fiscalização, sócio) | "Capital de Giro Líquido: R$ 287.450 — equivalente a 1,8 mês de custo operacional médio (R$ 159.694/mês)" |

**Implicação editorial:** cada métrica é cadastrada **duas vezes** no Dicionário — nome simples e nome técnico. Sem exceção.

**Implicação técnica:** no banco de dados, a tabela `metricas` tem colunas `nome_simples`, `nome_tecnico`, `unidade`, `formula`, `interpretacao_simples`, `interpretacao_tecnica`.

### Regra 2 · Quando NÃO usar metáfora

Metáfora serve para **conceitos analíticos**. Não serve para **objetos do mundo real**.

| Categoria | Sempre técnico, sem metáfora | Por quê |
|---|---|---|
| Tributos (DAS, ICMS, IRPJ, CSLL, PIS, COFINS, INSS) | Nome técnico direto | Cifra é cifra. Inventar nome confunde e expõe risco jurídico |
| Documentos legais (Termo de Cessão, Contrato Social, Aditivo) | Nome legal exato | É o nome que o cliente busca em arquivo, em e-mail, em conversa com terceiros |
| CPF, CNPJ, Razão Social, Endereço, NIRE | Cadastral é cadastral | Confusão aqui gera erro grave |
| Datas de vencimento | "Vence em 25/08" | Sem invenção |
| Boleto, NF-e, Fatura, Comprovante | Nome real | Cliente reconhece o objeto que tem na mesa |
| Banco, Agência, Conta | Nome real | Idem |

### Regra 3 · Multi-tenancy Editorial (núcleo + camada por cliente)

O Dicionário MIRA tem **2 níveis editoriais**:

| Nível | Conteúdo | Escopo |
|---|---|---|
| **Núcleo (Parte 3)** | Termos financeiros válidos para qualquer cliente: receita, custo, margem, ciclo, ponto de equilíbrio, ticket médio, capital de giro etc. | Universal · imutável entre clientes |
| **Camada Cliente (Partes 4 e 6)** | Aplicação específica da analogia para um cliente: óptica/oftalmologia para Dr. Haldley; fotografia para Namour; outras para futuros | Por cliente · cada cliente herda o Núcleo e ganha sua camada própria |

A arquitetura técnica replica isso: no banco, há `dicionario_nucleo` (compartilhado) e `dicionario_cliente_camada` (por tenant).

### Regra 4 · Vocabulário Marco Zero

| Sempre | Nunca |
|---|---|
| Estruturar, analisar, entregar, organizar, mapear | Apurar, escriturar, fechar (verbos contábeis — Marco Zero não faz contabilidade) |
| "Não tem julgamento. Tem leitura." | "Falha de gestão" · "erro do contador" · "descuido" |
| "Conforme combinado" · "para destravar" · "para ficar organizado" | "Cobrar resposta" · "exigir" · "alertar urgência" desnecessariamente |
| FATO · HIPÓTESE marcados explicitamente | Hipótese vestida de fato sem indicação |
| Vocabulário do cliente cunhado por ele | Vocabulário emprestado de outro cliente |

### Regra 5 · Tom

**Cuidadoso · Zeloso · Gentil · Elegante.** Profissional com proximidade. Sem juridiquês, sem condescendência, sem alarmismo, sem fofo.

---

## Parte 3 — Dicionário Núcleo (universal · qualquer cliente)

Termos financeiros aplicáveis a qualquer negócio. Reutilizados na camada-cliente sempre que couber.

### 3.1 Resultado e margem

| Conceito | Nome Simples MIRA | Nome Técnico | Como calcula | Quando mostrar |
|---|---|---|---|---|
| Receita Bruta | **Entrada Total** | Receita Bruta | Soma de todas as vendas no período (com NF emitida ou recebida) | Visão Geral · Saúde por Loja |
| Deduções (impostos, devoluções) | **Descontos Obrigatórios** | Deduções de Receita | Tributos sobre venda + devoluções + abatimentos | Visão Geral (sob `?`) |
| Receita Líquida | **Entrada Limpa** | Receita Líquida | Entrada Total − Descontos Obrigatórios | Saúde por Loja |
| Custo das Mercadorias Vendidas | **Custo do que Vendeu** | CMV | Custo direto dos produtos vendidos no período | Sobra por Produto |
| Margem Bruta | **Sobra Bruta** | Margem Bruta | (Receita Líquida − CMV) ÷ Receita Líquida | Sobra por Produto · Saúde por Loja |
| Despesas Operacionais | **Custos para Manter Aberto** | Despesas Operacionais | Aluguel, folha, marketing, contabilidade, etc. | Saúde por Loja |
| Margem Operacional | **Sobra Depois das Contas** | Margem Operacional | (Sobra Bruta − Despesas Operacionais) ÷ Receita Líquida | Saúde por Loja |
| Lucro Líquido | **Sobra Final** | Lucro Líquido do Exercício | Sobra Depois das Contas − IR/CSLL | Visão Geral (anual) |

### 3.2 Caixa e ciclo financeiro

| Conceito | Nome Simples MIRA | Nome Técnico | Como calcula | Quando mostrar |
|---|---|---|---|---|
| Prazo Médio de Recebimento | **Quantos dias até cair na conta** | PMR | Média ponderada dos prazos das vendas | Cabo de Guerra do Caixa |
| Prazo Médio de Pagamento | **Quantos dias até precisar pagar** | PMP | Média ponderada dos prazos com fornecedores | Cabo de Guerra do Caixa |
| Ciclo Financeiro | **Cabo de Guerra do Caixa** | Ciclo Financeiro = PMR − PMP (+ giro de estoque) | Diferença em dias entre receber e pagar | Painel de Bordo principal |
| Capital de Giro Líquido | **Reserva de Oxigênio** | CGL = Ativo Circulante − Passivo Circulante | Recurso disponível para operação | Painel de Bordo principal |
| Capital de Giro em meses | **Meses de Oxigênio** | CGL ÷ custo operacional médio mensal | Quanto tempo a empresa sobrevive sem entrada | Painel de Bordo principal |
| Caixa Disponível | **Dinheiro Vivo Agora** | Saldos bancários + caixa físico | Snapshot atual | Visão Geral |

### 3.3 Vendas e funil

| Conceito | Nome Simples MIRA | Nome Técnico | Como calcula | Quando mostrar |
|---|---|---|---|---|
| Ticket Médio | **Distância de Foco** | Ticket Médio | Receita Bruta ÷ Nº de vendas | Foco em Cartão · Visão Geral |
| Volume de transações | **Quantidade de Vendas** | Transações | Nº de vendas no período | Foco em Cartão |
| Conversão | **Acuidade da Equipe** | Taxa de Conversão | Vendas ÷ Visitantes | Acuidade do Mês (quando houver dado) |
| Mix por bandeira | **Mapa da Iluminação** | Mix por Bandeira/Forma de Pagamento | % Visa, Master, Elo, Amex, Débito, Crédito, à vista | Foco em Cartão |
| Parcelamento médio | **Quantas Vezes Cliente Parcela** | Nº médio de parcelas | Soma de parcelas ÷ Nº vendas parceladas | Foco em Cartão |

### 3.4 Estrutura (Balanço)

| Conceito | Nome Simples MIRA | Nome Técnico | Como calcula | Quando mostrar |
|---|---|---|---|---|
| Ativo Total | **O que a Empresa Tem** | Ativo | Soma de bens e direitos | Visão Geral (anual) |
| Passivo Total | **O que a Empresa Deve** | Passivo | Soma de obrigações | Visão Geral (anual) |
| Patrimônio Líquido | **O que Sobra Pra Você** | PL | Ativo − Passivo | Visão Geral (anual) |
| Endividamento | **Peso da Conta** | Passivo ÷ Ativo | % do que a empresa deve sobre o que tem | Saúde por Loja (sob `?`) |

### 3.5 Equipe

| Conceito | Nome Simples MIRA | Nome Técnico | Como calcula | Quando mostrar |
|---|---|---|---|---|
| Custo Total do Vendedor | **Custo da Cadeira** | Salário + encargos + comissões + benefícios | Por colaborador, mensal | Meta de Autossustento |
| Ponto de Equilíbrio Individual | **Meta de Autossustento** | Receita necessária × margem para cobrir custo da cadeira | Custo da Cadeira ÷ Margem Bruta | Meta de Autossustento |
| Produtividade | **Quanto Cada Vendedor Vendeu** | Receita por colaborador | Soma de vendas por vendedor | Meta de Autossustento |

### 3.6 Risco e proteção

| Conceito | Nome Simples MIRA | Nome Técnico | Como calcula | Quando mostrar |
|---|---|---|---|---|
| Inadimplência | **Vendas que Não Voltam** | Taxa de Inadimplência | Vendas não recebidas ÷ Vendas com prazo | Pontos de Atenção |
| Cessão de Recebíveis | **Lente de Aumento Cara** | Antecipação com deságio | Valor cedido × taxa de deságio | Pontos de Atenção |
| Comissão Antecipada | **Receita Antecipada da Equipe** | Adiantamento de comissão | Comissão paga antes do recebimento do cliente | Pontos de Atenção |
| Adiantamentos a Fornecedores | **Estoque Pago e Não Entregue** | Adiantamentos a Fornecedores (BP) | Valor pago × entrega pendente | Pontos de Atenção |

---

## Parte 4 — Camada Cliente: Óticas Mais (Dr. Haldley)

Aplicação específica da analogia **óptica + oftalmologia + cotidiano da loja**.

### 4.1 A estrutura dos óculos = estruturas financeiras

| Parte dos óculos | Estrutura financeira | Mensagem ao cliente |
|---|---|---|
| **Armação** | Balanço Patrimonial | É o que sustenta tudo. Se a armação for fraca (passivos altos, capital baixo), o negócio desmorona |
| **Lentes** | DRE (Demonstração do Resultado) | Determinam a nitidez do resultado mensal. Mostram se a operação está em lucro claro ou prejuízo embaçado |
| **Plaquetas de apoio (nasais)** | Fluxo de Caixa | Evitam que os óculos escorreguem do nariz. Garantem dinheiro vivo no dia-a-dia |

### 4.2 Exames refrativos = diagnósticos

| Termo oftálmico | Conceito financeiro | Aplicação no MIRA |
|---|---|---|
| **Acuidade Visual** | Nitidez geral da gestão | Tela: "Acuidade do Mês" |
| **Miopia Financeira** | Foco excessivo no curto prazo | Diagnóstico textual nos Pontos de Atenção (usar com parcimônia — chavão) |
| **Hipermetropia Financeira** | Planeja longe sem cuidar do hoje | Idem |
| **Astigmatismo de Margem** | Margem muda de eixo dependendo do produto (armação tem margem X, lente tem margem Y, serviço tem margem Z) | Sobra por Produto — mostrar os eixos |
| **Exame de Refração** | Diagnóstico financeiro | Conceito do relatório anual ao Dr. Haldley |
| **Receita Médica** | Plano de Ação | Tela: "Receituário Aberto" — pendências de execução |
| **Consulta de Retorno** | Reunião mensal Marco Zero × Dr. Haldley | Tela: "Consultas Anteriores" — histórico de relatórios |

### 4.3 Operação da ótica = eficiência operacional

| Termo da loja | Conceito financeiro | Aplicação no MIRA |
|---|---|---|
| **Tratamento Antirreflexo** | Mitigação de risco | Pontos de Atenção · "O que protege a loja dos brilhos do mercado" (inadimplência, sazonalidade, cessão cara) |
| **Lentes Multifocais** | Capacidade de enxergar perto e longe simultaneamente | Mensagem editorial: o MIRA é multifocal — mostra o dia (caixa) e o futuro (orçamento) na mesma tela |
| **Giro de Estoque** | Velocidade de transformação de estoque em caixa | Quando o cliente tiver dado de estoque — não temos no piloto ainda |
| **Lente de Contato** | Operação direta sem intermediário | Quando aplicável — venda direta ao consumidor sem antecipação |
| **Cirurgia Refrativa** | Correção definitiva (vs. paliativo) | Nos Pontos de Atenção: distinguir "ajuste pontual" de "reorganização estrutural" |

### 4.4 Classificação de lojas (avaliação editorial)

Substitui a versão original "Lentes de Alta Performance × Lentes com Grau Descalibrado":

| Classificação MIRA | Critério | Cor de status |
|---|---|---|
| **Loja em Foco** | Sobra Operacional ≥ meta + Reserva de Oxigênio ≥ 2 meses | 🟢 |
| **Loja Quase em Foco** | Sobra Operacional positiva mas abaixo da meta · ou Reserva entre 1 e 2 meses | 🟡 |
| **Loja Desfocada** | Sobra Operacional negativa · ou Reserva < 1 mês | 🔴 |

A classificação aparece em "Saúde por Loja". Permite ranking visual imediato.

---

## Parte 5 — Dicionário de Telas MIRA

10 telas. Cada uma com nome MIRA + subtítulo + métricas principais.

| # | Nome MIRA | Subtítulo | Métricas principais |
|---|---|---|---|
| 1 | **Entrar no MIRA** | Login multi-tenant (cliente vê só os próprios dados) | — |
| 2 | **Acuidade do Mês** | KPIs do mês corrente, em 4 cards | Entrada Total · Sobra Bruta · Reserva de Oxigênio · Cabo de Guerra do Caixa |
| 3 | **Saúde por Loja** | Comparativo entre estabelecimentos | Status (Em Foco / Quase / Desfocada) por loja · 5 colunas (no piloto: Matriz · Filial · Mais Consolidado · BH · Grupo) |
| 4 | **Foco em Cartão** | Vendas em cartão · bandeiras · parcelamento · MDR efetivo | Mapa da Iluminação · Distância de Foco · MDR por loja |
| 5 | **O Que Vem Aí** | Saldo a receber projetado por mês (Agenda Get Net + outras) | Saldo total · % cedido (Lente de Aumento Cara) · cronograma de recebíveis |
| 6 | **Eixo Refrativo** | Triangulação NF-e × Get Net × Extratos | Gap por mês · ranking de lojas alinhadas × desalinhadas |
| 7 | **Pontos de Atenção** | Achados materiais com diagnóstico textual | Cards explicativos (Adiantamentos · Cessão · Comissão · Outros) |
| 8 | **Receituário Aberto** | Pendências do cliente (o que precisa entregar pra Marco Zero) | Lista por prioridade · status · prazo |
| 9 | **Consultas Anteriores** | Histórico de relatórios e memorandos | Lista cronológica · download · resumo |
| 10 | **Sala de Exames** | Backend Wesley · upload de dados · gestão de clientes | Admin: upload CSV/PDF · status de processamento · log |

---

## Parte 6 — Painel de Bordo: as 5 métricas-coração

Estas 5 são o **coração** do MIRA. Aparecem na Visão Geral e se repetem em outras telas conforme contexto.

### 6.1 Saúde por Loja

| Atributo | Valor |
|---|---|
| Nome Simples | Saúde por Loja |
| Nome Técnico | DRE por estabelecimento + indicadores de Caixa por loja |
| O que responde | A Loja A está se pagando e dando lucro, ou está sendo puxada pela Loja B? |
| Como calcula | Receita Bruta · CMV · Despesas Operacionais · Sobra Operacional · Reserva de Oxigênio — por loja |
| Como apresenta | Tabela em 5 colunas (no piloto Dr. Haldley) · status em cor (🟢🟡🔴) por loja · gráfico de barra comparativa |
| Como interpretar | Loja Desfocada (🔴) precisa de intervenção imediata · Quase em Foco (🟡) precisa de ajuste · Em Foco (🟢) sustenta o grupo |

### 6.2 Meta de Autossustento

| Atributo | Valor |
|---|---|
| Nome Simples | Meta de Autossustento |
| Nome Técnico | Ponto de Equilíbrio Individual por colaborador |
| O que responde | O vendedor João já vendeu o suficiente este mês para pagar o próprio salário e comissão? |
| Como calcula | Custo da Cadeira (salário + encargos + comissão + benefícios) ÷ Sobra Bruta % média do colaborador |
| Como apresenta | Barra horizontal por colaborador · linha vermelha = Custo da Cadeira · barra verde = receita já gerada |
| Como interpretar | 🔴 Abaixo da linha: a loja está pagando para o vendedor trabalhar · 🟢 Acima da linha: o vendedor se pagou e gera lucro real |

### 6.3 Sobra por Produto

| Atributo | Valor |
|---|---|
| Nome Simples | Sobra por Produto |
| Nome Técnico | Margem Bruta por categoria de produto |
| O que responde | Ganhamos mais vendendo armação ou indicando upgrade de lente? |
| Como calcula | (Preço de Venda − Custo Direto − Tributos sobre venda) ÷ Preço de Venda, por categoria |
| Como apresenta | Gráfico simples: "A cada R$ 100 vendidos em armação, sobram R$ X · em lente, sobram R$ Y" |
| Como interpretar | Direciona o discurso de venda · embasa upgrade de lente |

### 6.4 Cabo de Guerra do Caixa

| Atributo | Valor |
|---|---|
| Nome Simples | Cabo de Guerra do Caixa |
| Nome Técnico | Ciclo Financeiro = PMR − PMP (ajustado por giro de estoque quando aplicável) |
| O que responde | O prazo que eu dou para o cliente pagar é mais longo do que o prazo que o fornecedor me dá? |
| Como calcula | PMR (dias para receber) menos PMP (dias para pagar) |
| Como apresenta | "Hoje, esperamos **45 dias** para receber do cliente, mas pagamos o fornecedor em **30 dias**. Descompasso: 15 dias" |
| Como interpretar | Descompasso positivo (recebe antes) = saudável · Descompasso negativo (paga antes) = aperto · Quanto maior o descompasso negativo, maior a pressão sobre a Reserva de Oxigênio |

### 6.5 Reserva de Oxigênio

| Atributo | Valor |
|---|---|
| Nome Simples | Reserva de Oxigênio |
| Nome Técnico | Capital de Giro Líquido em meses de operação |
| O que responde | Quanto tempo as lojas continuam abertas se o faturamento zerar? |
| Como calcula | (Ativo Circulante − Passivo Circulante) ÷ Custo Operacional médio mensal |
| Como apresenta | "Reserva atual: R$ X — garante operação por **2,3 meses** sem entrada" |
| Como interpretar | < 1 mês: 🔴 crítico · 1-2 meses: 🟡 atenção · ≥ 2 meses: 🟢 saudável (referencial — pode variar por setor) |

---

## Parte 7 — Métricas adicionais (próxima camada do painel)

Não entram no Painel de Bordo principal, mas têm tela própria ou aparecem como destaque sob contexto.

| Nome Simples MIRA | Nome Técnico | Tela onde aparece |
|---|---|---|
| **Distância de Foco** | Ticket Médio | Visão Geral · Foco em Cartão |
| **Acuidade da Equipe** | Taxa de Conversão | Visão Geral (quando houver dado de tráfego) |
| **Lente de Aumento Cara** | Cessão de Recebíveis com deságio | Pontos de Atenção · O Que Vem Aí |
| **Receita Antecipada da Equipe** | Comissão Antecipada sem recebimento do cliente | Pontos de Atenção |
| **Estoque Pago e Não Entregue** | Adiantamentos a Fornecedores | Pontos de Atenção |
| **Mapa da Iluminação** | Mix por Bandeira/Forma de Pagamento | Foco em Cartão |
| **Receita Médica Vencida** | Risco tributário em estrutura societária | Pontos de Atenção (somente quando aplicável) |
| **Vendas que Não Voltam** | Inadimplência | Pontos de Atenção |
| **Quantas Vezes Cliente Parcela** | Parcelamento médio | Foco em Cartão |

---

## Parte 8 — Glossário invertido (Técnico → MIRA)

Para uso editorial reverso: quando o Wesley estiver escrevendo um e-mail, um R0X, um memorando — e quiser checar como chamar a métrica no MIRA.

| Termo Técnico | Nome MIRA Equivalente |
|---|---|
| Adiantamento a Fornecedor | Estoque Pago e Não Entregue |
| Capital de Giro Líquido | Reserva de Oxigênio |
| Cessão de Recebíveis | Lente de Aumento Cara |
| Ciclo Financeiro | Cabo de Guerra do Caixa |
| CMV (Custo Mercadoria Vendida) | Custo do que Vendeu |
| Comissão Antecipada | Receita Antecipada da Equipe |
| Conversão | Acuidade da Equipe |
| Deduções de Receita | Descontos Obrigatórios |
| Despesas Operacionais | Custos para Manter Aberto |
| DRE | Lentes / Saúde por Loja |
| Endividamento | Peso da Conta |
| Faturamento Bruto | Entrada Total |
| Inadimplência | Vendas que Não Voltam |
| Lucro Líquido | Sobra Final |
| Margem Bruta | Sobra Bruta |
| Margem Operacional | Sobra Depois das Contas |
| Margem por Categoria | Sobra por Produto |
| Mix por Bandeira | Mapa da Iluminação |
| Patrimônio Líquido | O que Sobra Pra Você |
| PMP (Prazo Médio de Pagamento) | Quantos dias até precisar pagar |
| PMR (Prazo Médio de Recebimento) | Quantos dias até cair na conta |
| Ponto de Equilíbrio Individual | Meta de Autossustento |
| Receita Bruta | Entrada Total |
| Receita Líquida | Entrada Limpa |
| Ticket Médio | Distância de Foco |
| Triangulação NF-e × Cartão × Banco | Eixo Refrativo |

---

## Parte 9 — O que **não** se traduz no MIRA

Para evitar erro grave de comunicação, esta lista é absoluta:

| Categoria | Manter sempre técnico |
|---|---|
| Tributos | DAS · ICMS · ISS · IRPJ · CSLL · PIS · COFINS · INSS · FGTS |
| Cadastrais | CPF · CNPJ · Razão Social · Nome Fantasia · Endereço · NIRE · Inscrição Estadual |
| Documentos | Contrato Social · Termo de Cessão · NF-e · Boleto · DAS gerado · Comprovante · Recibo · Aditivo · Procuração |
| Bancário | Banco (nome) · Agência · Conta · CHave PIX · Boleto · TED · DOC · PIX |
| Datas | Sempre formato DD/MM/AAAA · vencimentos sempre absolutos |
| Pessoas | Nome real · CPF · função no organograma |

---

## Parte 10 — Regras de evolução do dicionário

| Quando | O que fazer |
|---|---|
| Métrica nova precisa entrar | Criar entrada **simultaneamente nas duas camadas** (simples + técnica) · nunca só uma · documentar formula, unidade, exemplo |
| Cliente novo entra no MIRA | Núcleo (Parte 3) é herdado intacto · cria-se camada cliente própria (réplica das Partes 4 e 6 com analogia adaptada) |
| Cliente cunha um termo novo em conversa | Avaliar adoção · se entrar no dicionário, marcar como "termo do cliente X" e considerar se vale para outros |
| Atualização de versão | Versão menor (v1.1) para acréscimos · versão maior (v2.0) para redefinição de termos ou mudança editorial · sempre data de revisão |
| Termo se mostra confuso na prática | Reavaliar · não há vergonha em retirar termo do dicionário se ele falhar em campo |

---

## Parte 11 — Expansão para outros clientes (preparação)

Estrutura proposta para a próxima camada cliente — Namour (fotografia):

| Em Dr. Haldley (óptica) | Em Namour (fotografia) — projeção |
|---|---|
| Armação = Balanço | Câmera = Balanço |
| Lentes = DRE | Lentes (fotográficas) = DRE |
| Plaquetas = Caixa | Tripé = Caixa |
| Acuidade Visual | Foco / Nitidez |
| Astigmatismo de Margem | Aberração Cromática de Margem |
| Antirreflexo | Polarizador (proteção) |
| Multifocais | Zoom (perto e longe) |
| Saúde por Loja | Saúde por Frente (eventos · ensaios · cursos · venda de imagens) |
| Lente de Aumento Cara | Filtro Caro (antecipação) |

Esta tabela é **referência projetiva**, não compromisso. Será expandida quando Namour entrar no MIRA (não está no plano imediato).

---

## Parte 12 — Como este dicionário se conecta com o resto do projeto

| Artefato | Como usa o EST03 |
|---|---|
| **EST02 — Anamnese** | Referencia os nomes MIRA em qualquer menção de métrica · não duplica conteúdo |
| **Relatório Final ao Dr. Haldley** | Aplica a Camada Cliente (Parte 4 e 6) · usa Painel de Bordo como espinha · marca FATO/HIPÓTESE em cada métrica |
| **Mockups** | Telas seguem nomes da Parte 5 · componentes carregam métricas conforme Parte 3 |
| **Banco de dados** | Tabela `dicionario_nucleo` e `dicionario_cliente_camada` espelham as Partes 3 e 4 |
| **Código (front-end)** | Componente `<Metric>` lê do dicionário · nunca hardcoded |
| **Comunicações ao cliente (R0X)** | Vocabulário MIRA aparece naturalmente quando o tema for métrica do produto |
| **Memorandos internos (M0X)** | Linguagem técnica (Parte 8 invertida) — uso interno preserva rigor |
| **Glossário do Relatório Final** | Extraído deste dicionário, filtrado para o cliente piloto |

---

## Encerramento

Este é o **piso editorial do MIRA**. Tudo a partir daqui se sustenta nele. Versões menores acrescentam · versões maiores redefinem · ninguém renomeia métrica fora deste documento sem revisão formal.

**Versão atual:** v1.0
**Próxima revisão prevista:** antes do release do MVP (após mockup e reunião com Dr. Haldley)
**Responsável editorial:** Wesley Amaral · Marco Zero Inteligência Financeira

---

*um documento de fundação · Marco Zero Inteligência Financeira · 2026*
