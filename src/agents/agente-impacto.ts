import { ResultadoAgente2, ResultadoAgente4 } from '@/src/types'

/**
 * Agente 4: Análise de Impacto
 * Translates recommendations from Agente 2 into financial impact in 4 currencies
 */
export async function analisarImpacto(diagnostico: ResultadoAgente2): Promise<ResultadoAgente4[]> {
  const impactos: ResultadoAgente4[] = []

  // Map recommendations to impact analyses
  for (const recomendacao of diagnostico.recomendacoes) {
    const impacto = calcularImpactoRecomendacao(recomendacao, diagnostico)
    if (impacto) {
      impactos.push(impacto)
    }
  }

  return impactos
}

function calcularImpactoRecomendacao(
  recomendacao: string,
  diagnostico: ResultadoAgente2
): ResultadoAgente4 | null {
  // Pattern matching for common recommendations

  // Reduzir ciclo de recebimento
  if (recomendacao.toLowerCase().includes('recebimento')) {
    const diasLiberados = Math.min(diagnostico.indicadores.prazoRecebimento, 15)
    const custoAntecipacao = calcularCustoAntecipacao(diasLiberados, diagnostico)

    return {
      descricao: recomendacao,
      impactoMoedas: {
        'r$': custoAntecipacao,
        'dias': diasLiberados,
        'semanas': Math.round((diasLiberados / 7) * 10) / 10,
        'anos': Math.round((diasLiberados / 365) * 100) / 100,
      },
      alteracaoPorcentual:
        Math.round(((diasLiberados / diagnostico.indicadores.cicloConversaoCaixa) * 0.5) * 1000) /
        1000,
      investimentoNecessario: 0,
      tempoImplementacao: 30,
      risco: 'baixo',
    }
  }

  // Diversificar clientes
  if (recomendacao.toLowerCase().includes('diversif') || recomendacao.toLowerCase().includes('cliente')) {
    const reducaoConcentracao = diagnostico.indicadores.concentracaoRecebimento * 0.3
    const impactoFinanceiro = Math.round(
      (diagnostico.indicadores.giroAtivo * 1000000 * reducaoConcentracao) / 12
    )

    return {
      descricao: recomendacao,
      impactoMoedas: {
        'r$': impactoFinanceiro,
        'dias': 90,
        'semanas': Math.round((90 / 7) * 10) / 10,
        'anos': Math.round((90 / 365) * 100) / 100,
      },
      alteracaoPorcentual: Math.round(reducaoConcentracao * 1000) / 1000,
      investimentoNecessario: 5000, // Small investment in sales/marketing
      tempoImplementacao: 90,
      risco: 'medio',
    }
  }

  // Renegociar prazos com fornecedores
  if (
    recomendacao.toLowerCase().includes('fornecedor') ||
    recomendacao.toLowerCase().includes('pagamento')
  ) {
    const diasMaiorPrazo = 15 // Add 15 days to payment terms
    const custoEvitado = calcularCustoAntecipacao(diasMaiorPrazo, diagnostico) * 0.8

    return {
      descricao: recomendacao,
      impactoMoedas: {
        'r$': Math.round(custoEvitado),
        'dias': diasMaiorPrazo,
        'semanas': Math.round((diasMaiorPrazo / 7) * 10) / 10,
        'anos': Math.round((diasMaiorPrazo / 365) * 100) / 100,
      },
      alteracaoPorcentual: Math.round(
        ((diasMaiorPrazo / diagnostico.indicadores.prazoPagamento) * 0.3) * 1000
      ) / 1000,
      investimentoNecessario: 0,
      tempoImplementacao: 45,
      risco: 'medio',
    }
  }

  // Revisar estrutura de custos
  if (
    recomendacao.toLowerCase().includes('custo') ||
    recomendacao.toLowerCase().includes('operacional')
  ) {
    const margemAtual = diagnostico.indicadores.margemLiquida
    const margemAlvo = margemAtual + 0.02 // Target 2% improvement
    const faturamentoMensal = 300000 // Estimated monthly revenue
    const impactoAnual = faturamentoMensal * 12 * (margemAlvo - margemAtual)

    return {
      descricao: recomendacao,
      impactoMoedas: {
        'r$': Math.round(impactoAnual),
        'dias': 180,
        'semanas': Math.round((180 / 7) * 10) / 10,
        'anos': Math.round((180 / 365) * 100) / 100,
      },
      alteracaoPorcentual: Math.round(((margemAlvo - margemAtual) / margemAtual) * 1000) / 1000,
      investimentoNecessario: 10000, // Process improvements, training
      tempoImplementacao: 60,
      risco: 'medio',
    }
  }

  // Aumentar capital de giro
  if (recomendacao.toLowerCase().includes('caixa') || recomendacao.toLowerCase().includes('capital')) {
    const caixaNecessario = diagnostico.indicadores.diasCaixaDisponivel * 5000 // Estimate
    const custoCapital = caixaNecessario * 0.08 // 8% annual cost of capital
    const beneficio = caixaNecessario * 0.12 // Benefit from avoiding emergency financing
    const impactoLiquido = beneficio - custoCapital

    return {
      descricao: recomendacao,
      impactoMoedas: {
        'r$': Math.round(impactoLiquido),
        'dias': 365,
        'semanas': 52.0,
        'anos': 1.0,
      },
      alteracaoPorcentual: 0.1,
      investimentoNecessario: Math.round(caixaNecessario),
      tempoImplementacao: 30,
      risco: 'alto',
    }
  }

  // Default: generic impact calculation
  return {
    descricao: recomendacao,
    impactoMoedas: {
      'r$': 10000,
      'dias': 30,
      'semanas': Math.round((30 / 7) * 10) / 10,
      'anos': Math.round((30 / 365) * 100) / 100,
    },
    alteracaoPorcentual: 0.05,
    investimentoNecessario: 0,
    tempoImplementacao: 30,
    risco: 'baixo',
  }
}

function calcularCustoAntecipacao(dias: number, diagnostico: ResultadoAgente2): number {
  // Estimate based on typical card processing costs and antecipation rates
  // Assume 70% of revenue in card, 2.4% average fee
  const faturamentoMensal = 300000 // Estimated
  const vendiaCartao = faturamentoMensal * 0.7
  const taxaMedia = 0.024

  // If antecipating X days, cost is: (vendiaCartao * taxaMedia) * (dias / 365)
  // But also consider the interest cost of tying up capital
  const custoAntecipacao = vendiaCartao * taxaMedia * (dias / 365)
  const custoCapital = (vendiaCartao * dias) / 365 * 0.06 // 6% annual rate

  return Math.round(custoAntecipacao + custoCapital)
}
