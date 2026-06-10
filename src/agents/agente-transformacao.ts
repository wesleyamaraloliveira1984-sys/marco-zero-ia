import { ResultadoAgente2, ResultadoAgente4, ResultadoAgente6, FaseTransformacao, CartaoExecutavel } from '@/src/types'

/**
 * Agente 6: Plano de Transformação 90 Dias
 * Creates a 5-phase transformation plan based on diagnosis and impact analysis
 */
export async function criarPlano90Dias(
  diagnostico: ResultadoAgente2,
  impactos: ResultadoAgente4[]
): Promise<ResultadoAgente6> {
  const fases = criarFases(diagnostico, impactos)
  const intensidade = determinarIntensidade(diagnostico.scoreGeral)

  return {
    fases,
    kpisGlobais: {
      saldoMinimoInicial: Math.max(diagnostico.indicadores.saldoMinimo, 50000),
      saldoMinimoFinal: Math.max(diagnostico.indicadores.saldoMinimo, 50000) * 1.4,
      cicloConversaoInicial: diagnostico.indicadores.cicloConversaoCaixa,
      cicloConversaoFinal: diagnostico.indicadores.cicloConversaoCaixa * 0.7,
    },
    scoreOriginal: diagnostico.scoreGeral,
    intensidade,
    metasKpis: calcularMetasKpis(diagnostico),
  }
}

function criarFases(diagnostico: ResultadoAgente2, impactos: ResultadoAgente4[]): FaseTransformacao[] {
  return [
    {
      numero: 0,
      nome: 'Sprint Emergencial',
      diasInicio: 1,
      diasFim: 7,
      descricao: 'Endereçar problemas críticos imediatamente',
      cards: criarCardsSprintEmergencial(diagnostico, impactos),
      kpis: {
        saldoMinimo: diagnostico.indicadores.saldoMinimo,
        cicloConversao: diagnostico.indicadores.cicloConversaoCaixa,
      },
    },
    {
      numero: 1,
      nome: 'Estabilização',
      diasInicio: 8,
      diasFim: 30,
      descricao: 'Estabilizar sistemas e implementar quick wins',
      cards: criarCardsEstabilizacao(diagnostico, impactos),
      kpis: {
        saldoMinimo: diagnostico.indicadores.saldoMinimo * 1.1,
        margemLiquida: diagnostico.indicadores.margemLiquida + 0.01,
      },
    },
    {
      numero: 2,
      nome: 'Reorganização',
      diasInicio: 31,
      diasFim: 60,
      descricao: 'Reorganizar processos e operações',
      cards: criarCardsReorganizacao(diagnostico, impactos),
      kpis: {
        cicloConversao: diagnostico.indicadores.cicloConversaoCaixa * 0.85,
        endividamento: diagnostico.indicadores.endividamento * 0.9,
      },
    },
    {
      numero: 3,
      nome: 'Preparação Inflow',
      diasInicio: 61,
      diasFim: 75,
      descricao: 'Preparar para melhoria contínua',
      cards: criarCardsPreparacaoInflow(diagnostico, impactos),
      kpis: {
        margemOperacional: diagnostico.indicadores.margemOperacional + 0.02,
        roe: diagnostico.indicadores.roe * 1.15,
      },
    },
    {
      numero: 4,
      nome: 'Operação Contínua',
      diasInicio: 76,
      diasFim: 90,
      descricao: 'Estabelecer operações contínuas e sustentáveis',
      cards: criarCardsOperacaoContinua(diagnostico, impactos),
      kpis: {
        saldoMinimo: diagnostico.indicadores.saldoMinimo * 1.4,
        cicloConversao: diagnostico.indicadores.cicloConversaoCaixa * 0.7,
        margemLiquida: diagnostico.indicadores.margemLiquida + 0.03,
      },
    },
  ]
}

function criarCardsSprintEmergencial(diagnostico: ResultadoAgente2, impactos: ResultadoAgente4[]): CartaoExecutavel[] {
  const cards: CartaoExecutavel[] = []

  // Critical issue cards based on patterns
  if (diagnostico.padroesCriticos.includes('caixa_critico')) {
    cards.push({
      titulo: 'Aumentar disponibilidade de caixa',
      descricao: 'Ativar linhas de crédito de emergência ou renegociar prazos imediatos',
      diaInicio: 1,
      diaFim: 3,
      prioridade: 'alta',
      recursosPessoa: '1-2 horas CFO/Gestor',
      indicadorSucesso: `Saldo caixa > ${diagnostico.indicadores.saldoMinimo * 1.2}`,
    })
  }

  if (diagnostico.padroesCriticos.includes('liquidez_insuficiente')) {
    cards.push({
      titulo: 'Solicitar antecipação de recebíveis',
      descricao: 'Antecipação seletiva de valores maiores para melhorar liquidez',
      diaInicio: 2,
      diaFim: 5,
      prioridade: 'alta',
      recursosPessoa: '2-3 horas',
      recursosFinanceiro: 1000,
      indicadorSucesso: 'Liquidez corrente > 1.2',
    })
  }

  // Always include recommendation-based cards
  if (impactos.length > 0 && impactos[0].risco === 'baixo') {
    cards.push({
      titulo: 'Implementar primeiro impacto de baixo risco',
      descricao: impactos[0].descricao,
      diaInicio: 4,
      diaFim: 7,
      prioridade: 'media',
      indicadorSucesso: `Alcançar ${impactos[0].alteracaoPorcentual * 100}% de melhoria planejada`,
    })
  }

  return cards.length > 0 ? cards : [getDefaultCard(1, 7, 'alta')]
}

function criarCardsEstabilizacao(diagnostico: ResultadoAgente2, impactos: ResultadoAgente4[]): CartaoExecutavel[] {
  return [
    {
      titulo: 'Implementar controles financeiros',
      descricao: 'Estabelecer dashboard de caixa diário e previsões semanais',
      diaInicio: 8,
      diaFim: 15,
      prioridade: 'alta',
      recursosPessoa: '5-8 horas',
      indicadorSucesso: 'Dashboard operacional com 100% de precisão',
    },
    {
      titulo: 'Renegociar prazos com top 3 fornecedores',
      descricao: 'Aumentar prazo médio de pagamento de 45 para 60 dias',
      diaInicio: 16,
      diaFim: 25,
      prioridade: 'media',
      recursosPessoa: '10 horas',
      indicadorSucesso: 'Prazo médio > 50 dias',
    },
    {
      titulo: 'Implementar rotina de recebimento',
      descricao: 'Cobrança sistemática de atrasados, redução de DSO',
      diaInicio: 20,
      diaFim: 30,
      prioridade: 'media',
      recursosPessoa: '15 horas',
      indicadorSucesso: 'Prazo recebimento < 25 dias',
    },
  ]
}

function criarCardsReorganizacao(diagnostico: ResultadoAgente2, impactos: ResultadoAgente4[]): CartaoExecutavel[] {
  return [
    {
      titulo: 'Reorganizar estrutura de custos',
      descricao: 'Análise ABC de despesas, eliminar ineficiências',
      diaInicio: 31,
      diaFim: 45,
      prioridade: 'alta',
      recursosPessoa: '20 horas',
      recursosFinanceiro: 5000,
      indicadorSucesso: 'Redução de 10% em custos variáveis',
    },
    {
      titulo: 'Otimizar ciclo de estoque',
      descricao: 'Melhorar giro de estoque, reduzir capital imobilizado',
      diaInicio: 35,
      diaFim: 55,
      prioridade: 'media',
      recursosPessoa: '15 horas',
      indicadorSucesso: 'Ciclo de estoque reduzido em 20%',
    },
    {
      titulo: 'Implementar sistema de previsão',
      descricao: 'Previsão de caixa de 90 dias com cenários',
      diaInicio: 45,
      diaFim: 60,
      prioridade: 'media',
      recursosPessoa: '25 horas',
      indicadorSucesso: 'Previsão operacional com 95% de acurácia',
    },
  ]
}

function criarCardsPreparacaoInflow(diagnostico: ResultadoAgente2, impactos: ResultadoAgente4[]): CartaoExecutavel[] {
  return [
    {
      titulo: 'Capacitar time em análise financeira',
      descricao: 'Treinamento em leitura de indicadores e tomada de decisão',
      diaInicio: 61,
      diaFim: 70,
      prioridade: 'media',
      recursosPessoa: '20 horas',
      recursosFinanceiro: 3000,
      indicadorSucesso: '100% do time com competências validadas',
    },
    {
      titulo: 'Definir métricas de acompanhamento contínuo',
      descricao: 'Dashboard mensal, KPIs por área, alertas automáticos',
      diaInicio: 65,
      diaFim: 75,
      prioridade: 'alta',
      recursosPessoa: '15 horas',
      indicadorSucesso: 'Dashboard mensal enviado dia 5 de cada mês',
    },
  ]
}

function criarCardsOperacaoContinua(diagnostico: ResultadoAgente2, impactos: ResultadoAgente4[]): CartaoExecutavel[] {
  return [
    {
      titulo: 'Revisar e ajustar plano trimestral',
      descricao: 'Avaliar progresso, ajustar metas, preparar Q2',
      diaInicio: 80,
      diaFim: 90,
      prioridade: 'alta',
      recursosPessoa: '10 horas',
      indicadorSucesso: 'Plano Q2 aprovado com scores atualizados',
    },
    {
      titulo: 'Estabelecer rotina de acompanhamento',
      descricao: 'Reuniões semanais de caixa, mensais de estratégia',
      diaInicio: 85,
      diaFim: 90,
      prioridade: 'media',
      recursosPessoa: '5 horas/mês contínuas',
      indicadorSucesso: 'Calendário confirmado para próximos 12 meses',
    },
  ]
}

function determinarIntensidade(score: number): 'leve' | 'moderada' | 'intensa' {
  if (score >= 80) return 'leve'
  if (score >= 50) return 'moderada'
  return 'intensa'
}

function calcularMetasKpis(diagnostico: ResultadoAgente2): { [key: string]: number } {
  return {
    liquidezCorrente: diagnostico.indicadores.liquidezCorrente * 1.2,
    margemLiquida: diagnostico.indicadores.margemLiquida + 0.05,
    cicloConversaoCaixa: diagnostico.indicadores.cicloConversaoCaixa * 0.65,
    diasCaixaDisponivel: diagnostico.indicadores.diasCaixaDisponivel * 2,
    endividamento: diagnostico.indicadores.endividamento * 0.8,
    roe: diagnostico.indicadores.roe * 1.25,
  }
}

function getDefaultCard(start: number, end: number, prioridade: 'alta' | 'media' | 'baixa'): CartaoExecutavel {
  return {
    titulo: 'Ação padrão',
    descricao: 'Revisar diagnóstico e iniciar planejamento',
    diaInicio: start,
    diaFim: end,
    prioridade,
    recursosPessoa: '5-10 horas',
    indicadorSucesso: 'Plano de ação definido',
  }
}
