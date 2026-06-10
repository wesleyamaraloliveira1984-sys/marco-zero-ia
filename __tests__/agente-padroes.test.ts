import { analisarPadroes } from '@/src/agents/agente-padroes'
import { DocumentosFinanceiros } from '@/src/types'

describe('Agente 2: Diagnóstico Financeiro', () => {
  // Real Dr. Haldley data structure - Matriz Luminis
  const haldleyData: DocumentosFinanceiros = {
    cnpj: '07.843.328/0001-19',
    nome: 'Óticas Mais - Matriz Luminis',
    regime: 'LUCRO_REAL',
    periodo: '2026-01-05',
    estabelecimento: {
      cnpj: '07.843.328/0001-19',
      nome: 'Matriz Luminis',
      localizacao: 'Betim',
      tipo: 'matriz',
    },
    extratos: [
      {
        mes: '2026-01',
        conta: 'CEF Matriz',
        saldoInicial: 150000,
        saldoFinal: 165000,
        saldoMinimo: 140000,
        saldoMaximo: 170000,
        movimentacoes: [],
      },
      {
        mes: '2026-02',
        conta: 'CEF Matriz',
        saldoInicial: 165000,
        saldoFinal: 180000,
        saldoMinimo: 155000,
        saldoMaximo: 185000,
        movimentacoes: [],
      },
      {
        mes: '2026-03',
        conta: 'CEF Matriz',
        saldoInicial: 180000,
        saldoFinal: 200000,
        saldoMinimo: 175000,
        saldoMaximo: 205000,
        movimentacoes: [],
      },
      {
        mes: '2026-04',
        conta: 'CEF Matriz',
        saldoInicial: 200000,
        saldoFinal: 185000,
        saldoMinimo: 180000,
        saldoMaximo: 210000,
        movimentacoes: [],
      },
      {
        mes: '2026-05',
        conta: 'CEF Matriz',
        saldoInicial: 185000,
        saldoFinal: 175000,
        saldoMinimo: 170000,
        saldoMaximo: 190000,
        movimentacoes: [],
      },
    ],
    dre: {
      periodo: '2026-05',
      receitas: {
        bruta: 238876,
        deducoes: 5700,
        liquida: 233176,
      },
      custos: {
        cogs: 105000,
        variaveis: 25000,
      },
      despesas: {
        operacionais: 35000,
        administrativas: 15000,
        vendas: 8000,
        financeiras: 3000,
      },
      resultados: {
        operacional: 45176,
        financeiro: -3000,
        tributario: -11000,
        liquido: 31176,
      },
    },
    folha: {
      mes: '2026-05',
      funcionarios: 8,
      salarioBruto: 35000,
      inss: 4000,
      fgts: 2800,
      impostos: 2000,
      descontos: 500,
      liquido: 26000,
      encargosTotal: 8800,
    },
    notasFiscaisSaida: [],
    notasFiscaisEntrada: [],
    balancete: {
      periodo: '2026-05',
      contas: {
        ativo: {
          circulante: 250000,
          naoCirculante: 150000,
          total: 400000,
        },
        passivo: {
          circulante: 80000,
          naoCirculante: 40000,
          total: 120000,
        },
        patrimonio: 280000,
      },
    },
    metadadados: {
      dataColeta: '2026-06-10',
      origem: 'real_dr_haldley',
      validado: true,
    },
  }

  it('should analyze Matriz Luminis financial data', async () => {
    const resultado = await analisarPadroes(haldleyData)

    expect(resultado).toBeDefined()
    expect(resultado.cnpj).toBe('07.843.328/0001-19')
    expect(resultado.periodo).toBe('2026-01-05')
  })

  it('should calculate 20+ indicators', async () => {
    const resultado = await analisarPadroes(haldleyData)

    expect(resultado.indicadores).toBeDefined()
    expect(Object.keys(resultado.indicadores).length).toBeGreaterThanOrEqual(20)

    // Verify key indicators exist
    expect(resultado.indicadores.liquidezCorrente).toBeGreaterThan(0)
    expect(resultado.indicadores.margemBruta).toBeGreaterThan(0)
    expect(resultado.indicadores.margemLiquida).toBeGreaterThan(0)
    expect(resultado.indicadores.endividamento).toBeGreaterThanOrEqual(0)
    expect(resultado.indicadores.cicloConversaoCaixa).toBeDefined()
    expect(resultado.indicadores.diasCaixaDisponivel).toBeGreaterThan(0)
  })

  it('should detect critical patterns', async () => {
    const resultado = await analisarPadroes(haldleyData)

    expect(resultado.padroesCriticos).toBeDefined()
    expect(Array.isArray(resultado.padroesCriticos)).toBe(true)
  })

  it('should generate actionable recommendations', async () => {
    const resultado = await analisarPadroes(haldleyData)

    expect(resultado.recomendacoes).toBeDefined()
    expect(resultado.recomendacoes.length).toBeGreaterThan(0)
    expect(resultado.recomendacoes.every((r) => typeof r === 'string')).toBe(true)
  })

  it('should calculate overall score 0-100', async () => {
    const resultado = await analisarPadroes(haldleyData)

    expect(resultado.scoreGeral).toBeGreaterThanOrEqual(0)
    expect(resultado.scoreGeral).toBeLessThanOrEqual(100)
  })

  it('should handle all three Haldley establishments', async () => {
    // Filial Proview (Filial - CNPJ ending 0002-08)
    const filialData: DocumentosFinanceiros = {
      ...haldleyData,
      cnpj: '07.843.328/0002-08',
      nome: 'Óticas Mais - Filial Proview',
      estabelecimento: {
        ...haldleyData.estabelecimento!,
        cnpj: '07.843.328/0002-08',
        nome: 'Filial Proview',
        localizacao: 'Belo Horizonte',
        tipo: 'filial',
      },
      dre: {
        ...haldleyData.dre!,
        receitas: {
          bruta: 537003,
          deducoes: 12825,
          liquida: 524178,
        },
      },
      balancete: {
        ...haldleyData.balancete!,
        contas: {
          ativo: {
            circulante: 350000,
            naoCirculante: 200000,
            total: 550000,
          },
          passivo: {
            circulante: 100000,
            naoCirculante: 50000,
            total: 150000,
          },
          patrimonio: 400000,
        },
      },
    }

    const resultado = await analisarPadroes(filialData)

    expect(resultado).toBeDefined()
    expect(resultado.cnpj).toBe('07.843.328/0002-08')
    expect(resultado.indicadores.margemBruta).toBeGreaterThan(0)
    expect(resultado.scoreGeral).toBeGreaterThanOrEqual(0)
  })

  it('should analyze consolidated Haldley group (Matriz + Filial)', async () => {
    // Combined data
    const grupoData: DocumentosFinanceiros = {
      ...haldleyData,
      cnpj: '07.843.328/0001-19',
      nome: 'Óticas Mais - Grupo Consolidado',
      grupo: {
        nome: 'Óticas Mais',
        cnpjRaiz: '07.843.328/0000-00',
        estabelecimentos: [
          haldleyData.estabelecimento!,
          {
            cnpj: '07.843.328/0002-08',
            nome: 'Filial Proview',
            localizacao: 'Belo Horizonte',
            tipo: 'filial',
          },
        ],
      },
      dre: {
        ...haldleyData.dre!,
        receitas: {
          bruta: 775879, // Matriz 238k + Filial 537k
          deducoes: 18533,
          liquida: 757346,
        },
      },
      balancete: {
        ...haldleyData.balancete!,
        contas: {
          ativo: {
            circulante: 600000,
            naoCirculante: 350000,
            total: 950000,
          },
          passivo: {
            circulante: 180000,
            naoCirculante: 90000,
            total: 270000,
          },
          patrimonio: 680000,
        },
      },
    }

    const resultado = await analisarPadroes(grupoData)

    expect(resultado).toBeDefined()
    expect(resultado.indicadores.liquidezCorrente).toBeCloseTo(3.33, 1)
    expect(resultado.scoreGeral).toBeGreaterThanOrEqual(0)
  })
})
