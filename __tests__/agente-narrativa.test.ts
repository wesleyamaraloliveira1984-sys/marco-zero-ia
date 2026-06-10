import { gerarRelatorio } from '@/src/agents/agente-narrativa'
import { ResultadoAgente1, ResultadoAgente2, ResultadoAgente3, ResultadoAgente4, ResultadoAgente6 } from '@/src/types'

describe('Agente 5: Relatório Narrativo', () => {
  const mockAgente1: ResultadoAgente1 = {
    estrutura: {
      tipo: 'grupo_empresarial',
      matriz: {
        cnpj: '07.843.328/0001-19',
        nome: 'Matriz Luminis',
        localizacao: 'Betim',
        tipo: 'matriz',
      },
      filiais: [
        {
          cnpj: '07.843.328/0002-08',
          nome: 'Filial Proview',
          localizacao: 'BH',
          tipo: 'filial',
        },
      ],
      grupos: [
        {
          nome: 'Óticas Mais',
          cnpjRaiz: '07.843.328/0000-00',
          estabelecimentos: [
            {
              cnpj: '07.843.328/0001-19',
              nome: 'Matriz Luminis',
              localizacao: 'Betim',
              tipo: 'matriz',
            },
            {
              cnpj: '07.843.328/0002-08',
              nome: 'Filial Proview',
              localizacao: 'BH',
              tipo: 'filial',
            },
          ],
        },
      ],
    },
    analiseJuridica: {
      regimeAtual: 'LUCRO_REAL',
      recomendacoes: ['Considerar consolidação de balanços para grupo', 'Estrutura multi-filial: revisar governança corporativa'],
    },
    scoreEstrutura: 75,
  }

  const mockAgente2: ResultadoAgente2 = {
    cnpj: '07.843.328/0001-19',
    nome: 'Óticas Mais',
    periodo: '2026-05',
    indicadores: {
      liquidezCorrente: 3.125,
      liquidezImediata: 1.5625,
      margemBruta: 0.5344,
      margemOperacional: 0.1944,
      margemLiquida: 0.1343,
      endividamento: 0.3,
      imobilizacao: 0.375,
      composicaoEndividamento: 0.6667,
      cicloConversaoCaixa: 45,
      prazoRecebimento: 30,
      prazoPagamento: 15,
      giroCaixa: 8.1222,
      diasCaixaDisponivel: 45,
      saldoMinimo: 50000,
      saldoMaximo: 150000,
      saldoMedio: 100000,
      roe: 0.1113,
      roic: 0.1119,
      rentabilidadeAtivo: 0.0780,
      ebitdaMargin: 0.3119,
      giroAtivo: 0.5829,
      concentracaoRecebimento: 0.35,
      sazonalidade: 0.12,
    },
    padroesCriticos: ['Ciclo de caixa elevado', 'Concentração de clientes moderada'],
    recomendacoes: [
      'Reduzir prazo de recebimento',
      'Diversificar base de clientes',
      'Otimizar estoque',
    ],
    scoreGeral: 65,
  }

  const mockAgente3: ResultadoAgente3 = {
    perfil: {
      nome: 'Empresário de Óticas Mais',
      trajetoria: 'Empresário consolidado em crescimento',
      motorVerdadeiro: 'Expansão e diversificação',
      pressoes: ['Complexidade multi-filial', 'Crescimento controlado'],
      valores: ['Sustentabilidade', 'Crescimento', 'Autonomia'],
    },
    comportamentoFinanceiro: {
      risco: 'moderado',
      padroesTomadaDecisao: ['Baseada em dados', 'Consultiva'],
    },
    recomendacoesPsicologicas: [
      'Estabelecer rotina mensal de análise financeira',
      'Delegar operações para focar estratégia',
      'Documentar decisões-chave para consistência',
    ],
  }

  const mockAgente4: ResultadoAgente4[] = [
    {
      descricao: 'Reduzir ciclo de recebimento de 30 para 20 dias',
      impactoMoedas: {
        'r$': 43000,
        dias: 10,
        semanas: 1.4,
        anos: 0.027,
      },
      alteracaoPorcentual: 18.4,
      investimentoNecessario: 5000,
      tempoImplementacao: 45,
      risco: 'baixo',
      dependencias: ['Sistemas de cobrança'],
    },
    {
      descricao: 'Diversificar base de clientes para reduzir concentração',
      impactoMoedas: {
        'r$': 25000,
        dias: 0,
        semanas: 0,
        anos: 1,
      },
      alteracaoPorcentual: 10.7,
      investimentoNecessario: 8000,
      tempoImplementacao: 90,
      risco: 'medio',
      dependencias: ['Estratégia comercial'],
    },
  ]

  const mockAgente6: ResultadoAgente6 = {
    fases: [
      {
        numero: 0,
        nome: 'Sprint Emergencial',
        diasInicio: 0,
        diasFim: 15,
        descricao: 'Ações imediatas para estabilizar caixa',
        cards: [],
        kpis: { saldoMinimo: 60000 },
      },
      {
        numero: 1,
        nome: 'Estabilização',
        diasInicio: 16,
        diasFim: 30,
        descricao: 'Normalizar operações',
        cards: [],
        kpis: { saldoMinimo: 70000 },
      },
      {
        numero: 2,
        nome: 'Reorganização',
        diasInicio: 31,
        diasFim: 60,
        descricao: 'Otimizar processos',
        cards: [],
        kpis: { cicloConversao: 40 },
      },
      {
        numero: 3,
        nome: 'Preparação Inflow',
        diasInicio: 61,
        diasFim: 80,
        descricao: 'Preparar para crescimento',
        cards: [],
        kpis: { cicloConversao: 35 },
      },
      {
        numero: 4,
        nome: 'Operação Contínua',
        diasInicio: 81,
        diasFim: 90,
        descricao: 'Operação em novo patamar',
        cards: [],
        kpis: { cicloConversao: 30 },
      },
    ],
    kpisGlobais: {
      saldoMinimoInicial: 50000,
      saldoMinimoFinal: 100000,
    },
    scoreOriginal: 65,
    intensidade: 'moderada',
  }

  it('should generate narrative report', async () => {
    const resultado = await gerarRelatorio(mockAgente1, mockAgente2, mockAgente3, mockAgente4, mockAgente6)
    expect(resultado).toBeDefined()
    expect(resultado.relatorio).toBeDefined()
    expect(resultado.relatorio.titulo).toBeDefined()
  })

  it('should have 9 chapters', async () => {
    const resultado = await gerarRelatorio(mockAgente1, mockAgente2, mockAgente3, mockAgente4, mockAgente6)
    expect(resultado.relatorio.capitulos).toHaveLength(9)
  })

  it('should calculate report metrics', async () => {
    const resultado = await gerarRelatorio(mockAgente1, mockAgente2, mockAgente3, mockAgente4, mockAgente6)
    expect(resultado.metricas.paginas).toBeGreaterThan(50)
    expect(resultado.metricas.palavras).toBeGreaterThan(10000)
  })

  it('should estimate reading time', async () => {
    const resultado = await gerarRelatorio(mockAgente1, mockAgente2, mockAgente3, mockAgente4, mockAgente6)
    expect(resultado.metricas.tempo_leitura_minutos).toBeGreaterThan(30)
  })

  it('should create introduction section', async () => {
    const resultado = await gerarRelatorio(mockAgente1, mockAgente2, mockAgente3, mockAgente4, mockAgente6)
    expect(resultado.relatorio.introducao).toBeDefined()
    expect(resultado.relatorio.introducao.length).toBeGreaterThan(0)
  })

  it('should create conclusion section', async () => {
    const resultado = await gerarRelatorio(mockAgente1, mockAgente2, mockAgente3, mockAgente4, mockAgente6)
    expect(resultado.relatorio.conclusao).toBeDefined()
    expect(resultado.relatorio.conclusao.length).toBeGreaterThan(0)
  })
})
