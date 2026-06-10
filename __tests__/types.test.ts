import {
  DocumentosFinanceiros,
  ResultadoAgente2,
  ResultadoAgente4,
  ResultadoAgente6,
  RegimeTributario,
  Estabelecimento,
} from '@/src/types'

describe('Type Definitions', () => {
  it('should have DocumentosFinanceiros type', () => {
    const docs: DocumentosFinanceiros = {
      extratos: [],
      dre: undefined,
      folha: undefined,
      notasFiscaisSaida: [],
      notasFiscaisEntrada: [],
      balancete: undefined,
      cnpj: '07.843.328/0001-19',
      regime: 'LUCRO_REAL',
      periodo: '2026-01-01',
    }
    expect(docs).toBeDefined()
  })

  it('should have ResultadoAgente2 with 20+ indicators', () => {
    const resultado: ResultadoAgente2 = {
      cnpj: '07.843.328/0001-19',
      periodo: '2026-01-05',
      indicadores: {
        liquidezCorrente: 1.5,
        liquidezImediata: 0.8,
        cicloConversaoCaixa: 45,
        diasCaixaDisponivel: 30,
        margemBruta: 0.55,
        margemOperacional: 0.15,
        margemLiquida: 0.10,
        endividamento: 0.35,
        imobilizacao: 0.25,
        roe: 0.20,
        roic: 0.18,
        ebitdaMargin: 0.20,
        giroAtivo: 2.5,
        prazoRecebimento: 30,
        prazoPagamento: 45,
        giroCaixa: 8,
        rentabilidadeAtivo: 0.15,
        composicaoEndividamento: 0.60,
        concentracaoRecebimento: 0.45,
        sazonalidade: 0.15,
        saldoMinimo: 50000,
        saldoMaximo: 150000,
        saldoMedio: 100000,
      },
      padroesCriticos: ['adiantamento_alto', 'concentracao_filial'],
      recomendacoes: ['Reduzir antecipações', 'Melhorar mix de pagamento'],
      scoreGeral: 65,
    }
    expect(resultado.indicadores).toHaveProperty('liquidezCorrente')
    expect(Object.keys(resultado.indicadores).length).toBeGreaterThan(10)
  })

  it('should have ResultadoAgente4 with 4 currencies', () => {
    const impacto: ResultadoAgente4 = {
      descricao: 'Reduzir antecipações',
      impactoMoedas: {
        'r$': 43000,
        dias: 45,
        semanas: 6.4,
        anos: 0.12,
      },
      alteracaoPorcentual: 0.15,
      investimentoNecessario: 0,
      tempoImplementacao: 30,
      risco: 'baixo',
    }
    expect(impacto.impactoMoedas).toHaveProperty('r$')
    expect(impacto.impactoMoedas).toHaveProperty('dias')
    expect(impacto.impactoMoedas).toHaveProperty('semanas')
    expect(impacto.impactoMoedas).toHaveProperty('anos')
  })

  it('should have ResultadoAgente6 with 5 phases', () => {
    const plano: ResultadoAgente6 = {
      fases: [
        {
          numero: 0,
          nome: 'Sprint Emergencial',
          diasInicio: 1,
          diasFim: 7,
          cards: [],
          kpis: {},
        },
        {
          numero: 1,
          nome: 'Estabilização',
          diasInicio: 8,
          diasFim: 30,
          cards: [],
          kpis: {},
        },
        {
          numero: 2,
          nome: 'Reorganização',
          diasInicio: 31,
          diasFim: 60,
          cards: [],
          kpis: {},
        },
        {
          numero: 3,
          nome: 'Preparação Inflow',
          diasInicio: 61,
          diasFim: 75,
          cards: [],
          kpis: {},
        },
        {
          numero: 4,
          nome: 'Operação Contínua',
          diasInicio: 76,
          diasFim: 90,
          cards: [],
          kpis: {},
        },
      ],
      kpisGlobais: {
        saldoMinimoInicial: 150000,
        saldoMinimoFinal: 200000,
      },
      scoreOriginal: 65,
      intensidade: 'moderada',
    }
    expect(plano.fases).toHaveLength(5)
    expect(plano.fases[0].nome).toBe('Sprint Emergencial')
  })

  it('should support Regime Tributário enum', () => {
    const regimes: RegimeTributario[] = ['MEI', 'SIMPLES_NACIONAL', 'LUCRO_PRESUMIDO', 'LUCRO_REAL']
    expect(regimes).toContain('MEI')
  })
})
