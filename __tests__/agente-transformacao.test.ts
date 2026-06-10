import { criarPlano90Dias } from '@/src/agents/agente-transformacao'
import { ResultadoAgente2, ResultadoAgente4 } from '@/src/types'

describe('Agente 6: Plano de Transformação 90 Dias', () => {
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
      saldoMinimo: 50000,
      saldoMaximo: 150000,
      saldoMedio: 100000,
      composicaoEndividamento: 0.5,
    },
    padroesCriticos: ['caixa_critico'],
    recomendacoes: ['Reduzir ciclo', 'Diversificar clientes'],
    scoreGeral: 65,
  }

  const impactos: ResultadoAgente4[] = [
    {
      descricao: 'Reduzir ciclo de recebimento',
      impactoMoedas: { 'r$': 43000, dias: 45, semanas: 6.4, anos: 0.12 },
      alteracaoPorcentual: 0.15,
      investimentoNecessario: 0,
      tempoImplementacao: 30,
      risco: 'baixo',
    },
  ]

  it('should create 5-phase plan', async () => {
    const plano = await criarPlano90Dias(diagnostico, impactos)

    expect(plano.fases).toHaveLength(5)
    expect(plano.fases[0].numero).toBe(0)
    expect(plano.fases[4].numero).toBe(4)
  })

  it('should have correct phase names', async () => {
    const plano = await criarPlano90Dias(diagnostico, impactos)

    expect(plano.fases[0].nome).toBe('Sprint Emergencial')
    expect(plano.fases[1].nome).toBe('Estabilização')
    expect(plano.fases[2].nome).toBe('Reorganização')
    expect(plano.fases[3].nome).toBe('Preparação Inflow')
    expect(plano.fases[4].nome).toBe('Operação Contínua')
  })

  it('should have correct day ranges for each phase', async () => {
    const plano = await criarPlano90Dias(diagnostico, impactos)

    expect(plano.fases[0].diasInicio).toBe(1)
    expect(plano.fases[0].diasFim).toBe(7)
    expect(plano.fases[1].diasInicio).toBe(8)
    expect(plano.fases[1].diasFim).toBe(30)
    expect(plano.fases[2].diasInicio).toBe(31)
    expect(plano.fases[2].diasFim).toBe(60)
    expect(plano.fases[3].diasInicio).toBe(61)
    expect(plano.fases[3].diasFim).toBe(75)
    expect(plano.fases[4].diasInicio).toBe(76)
    expect(plano.fases[4].diasFim).toBe(90)
  })

  it('should include cards in each phase', async () => {
    const plano = await criarPlano90Dias(diagnostico, impactos)

    for (const fase of plano.fases) {
      expect(fase.cards).toBeDefined()
      expect(Array.isArray(fase.cards)).toBe(true)
      if (fase.cards.length > 0) {
        const card = fase.cards[0]
        expect(card.titulo).toBeDefined()
        expect(card.descricao).toBeDefined()
        expect(card.prioridade).toMatch(/^(alta|media|baixa)$/)
      }
    }
  })

  it('should calculate overall score improvement', async () => {
    const plano = await criarPlano90Dias(diagnostico, impactos)

    expect(plano.scoreOriginal).toBe(65)
    expect(plano.kpisGlobais).toBeDefined()
    expect(plano.kpisGlobais.saldoMinimoInicial).toBeGreaterThan(0)
    expect(plano.kpisGlobais.saldoMinimoFinal).toBeGreaterThan(plano.kpisGlobais.saldoMinimoInicial)
  })

  it('should have intensity level', async () => {
    const plano = await criarPlano90Dias(diagnostico, impactos)

    expect(['leve', 'moderada', 'intensa']).toContain(plano.intensidade)
  })
})
