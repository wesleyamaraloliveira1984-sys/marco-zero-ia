import { analisarImpacto } from '@/src/agents/agente-impacto'
import { ResultadoAgente2 } from '@/src/types'

describe('Agente 4: Análise de Impacto', () => {
  const diagnostico: ResultadoAgente2 = {
    cnpj: '07.843.328/0001-19',
    periodo: '2026-01-05',
    indicadores: {
      liquidezCorrente: 1.5,
      liquidezImediata: 0.8,
      margemBruta: 0.55,
      margemOperacional: 0.15,
      margemLiquida: 0.10,
      endividamento: 0.35,
      imobilizacao: 0.25,
      cicloConversaoCaixa: 45,
      prazoRecebimento: 30,
      prazoPagamento: 45,
      giroCaixa: 8,
      diasCaixaDisponivel: 30,
      roe: 0.20,
      roic: 0.18,
      rentabilidadeAtivo: 0.15,
      ebitdaMargin: 0.20,
      giroAtivo: 2.5,
      concentracaoRecebimento: 0.45,
      sazonalidade: 0.15,
      composicaoEndividamento: 0.5,
      saldoMinimo: 5000,
      saldoMaximo: 50000,
      saldoMedio: 25000,
    },
    padroesCriticos: ['caixa_critico', 'concentracao_clientes'],
    recomendacoes: [
      'Reduzir ciclo de recebimento ou aumentar disponibilidade',
      'Diversificar base de clientes para reduzir risco',
    ],
    scoreGeral: 65,
  }

  it('should translate recommendations to 4-currency impact', async () => {
    const impactos = await analisarImpacto(diagnostico)

    expect(impactos).toBeDefined()
    expect(impactos.length).toBeGreaterThan(0)
  })

  it('should calculate R$ impact correctly', async () => {
    const impactos = await analisarImpacto(diagnostico)
    const primeiroImpacto = impactos[0]

    expect(primeiroImpacto.impactoMoedas['r$']).toBeGreaterThan(0)
    expect(typeof primeiroImpacto.impactoMoedas['r$']).toBe('number')
  })

  it('should convert dias to semanas correctly', async () => {
    const impactos = await analisarImpacto(diagnostico)
    const impacto = impactos[0]

    // semanas should be dias / 7
    const semanasCalculado = impacto.impactoMoedas['dias'] / 7
    expect(impacto.impactoMoedas['semanas']).toBeCloseTo(semanasCalculado, 1)
  })

  it('should convert dias to anos correctly', async () => {
    const impactos = await analisarImpacto(diagnostico)
    const impacto = impactos[0]

    // anos should be dias / 365
    const anosCalculado = impacto.impactoMoedas['dias'] / 365
    expect(impacto.impactoMoedas['anos']).toBeCloseTo(anosCalculado, 2)
  })

  it('should include implementation time and risk', async () => {
    const impactos = await analisarImpacto(diagnostico)
    const impacto = impactos[0]

    expect(impacto.tempoImplementacao).toBeGreaterThan(0)
    expect(['baixo', 'medio', 'alto']).toContain(impacto.risco)
  })

  it('should calculate percentage change', async () => {
    const impactos = await analisarImpacto(diagnostico)
    const impacto = impactos[0]

    expect(impacto.alteracaoPorcentual).toBeGreaterThan(0)
    expect(impacto.alteracaoPorcentual).toBeLessThanOrEqual(1)
  })
})
