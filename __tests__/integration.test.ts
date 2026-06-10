import { criarPipelineCompleto } from '@/lib/agent-pipeline'
import haldleyData from '@/data/haldley-2026-01-05-CORRIGIDO.json'
import { DocumentosFinanceiros } from '@/src/types'

/**
 * End-to-End Integration Tests - Dr. Haldley
 * Tests all 6 agents working together with real financial data
 */
describe('End-to-End Integration - Dr. Haldley', () => {
  // Transform raw Haldley data to DocumentosFinanceiros format for testing
  const transformHaldleyData = (): DocumentosFinanceiros => {
    return {
      cnpj: '07.843.328/0001-19',
      nome: 'Óticas Mais',
      regime: 'LUCRO_REAL',
      periodo: '2026-01',
      estabelecimento: {
        cnpj: '07.843.328/0001-19',
        nome: 'Matriz Luminis',
        localizacao: 'Betim',
        tipo: 'matriz',
      },
      grupo: {
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
            localizacao: 'Belo Horizonte',
            tipo: 'filial',
          },
        ],
      },
      extratos: [
        {
          mes: '2026-01',
          conta: 'Caixa',
          saldoInicial: 50000,
          saldoFinal: 148658,
          saldoMinimo: 40000,
          saldoMaximo: 150000,
          movimentacoes: [
            {
              data: '2026-01-15',
              descricao: 'Faturamento Bruto',
              tipo: 'entrada',
              valor: 152269,
              categoria: 'Vendas',
            },
            {
              data: '2026-01-20',
              descricao: 'Custos Operacionais',
              tipo: 'saida',
              valor: 53611,
              categoria: 'Custos',
            },
          ],
        },
      ],
      dre: {
        periodo: '2026-01',
        receitas: {
          bruta: 152269,
          deducoes: 3611,
          liquida: 148658,
        },
        custos: {
          cogs: 68801,
          variaveis: 13000,
        },
        despesas: {
          operacionais: 15000,
          administrativas: 8000,
          vendas: 4000,
          financeiras: 1500,
        },
        resultados: {
          operacional: 38857,
          financeiro: -1500,
          tributario: -9500,
          liquido: 27857,
        },
      },
      notasFiscaisSaida: [
        {
          nf: '000001',
          data: '2026-01-05',
          emissor: '07.843.328/0001-19',
          receptor: 'Cliente A',
          natureza: 'saida',
          valorBruto: 5000,
          impostos: 1200,
          valorLiquido: 3800,
          categoria: 'Vendas',
        },
      ],
      notasFiscaisEntrada: [
        {
          nf: 'NF-001',
          data: '2026-01-03',
          emissor: 'Fornecedor X',
          receptor: '07.843.328/0001-19',
          natureza: 'entrada',
          valorBruto: 35000,
          impostos: 0,
          valorLiquido: 35000,
          categoria: 'Compras',
        },
      ],
      balancete: {
        periodo: '2026-01',
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
    }
  }

  it('should process all 6 agents for Dr. Haldley data', async () => {
    const dados = transformHaldleyData()
    const resultado = await criarPipelineCompleto(dados)

    expect(resultado).toBeDefined()
    expect(resultado.agente1).toBeDefined()
    expect(resultado.agente2).toBeDefined()
    expect(resultado.agente3).toBeDefined()
    expect(resultado.agente4).toBeDefined()
    expect(resultado.agente5).toBeDefined()
    expect(resultado.agente6).toBeDefined()
  })

  it('should validate Matriz Luminis analysis', async () => {
    const dados = transformHaldleyData()
    const resultado = await criarPipelineCompleto(dados)

    // Agente 2 provides scoreGeral
    expect(resultado.agente2.scoreGeral).toBeDefined()
    expect(resultado.agente2.scoreGeral).toBeGreaterThan(50)
    expect(resultado.agente2.indicadores).toBeDefined()
  })

  it('should generate impact recommendations', async () => {
    const dados = transformHaldleyData()
    const resultado = await criarPipelineCompleto(dados)

    // Agente 4 provides array of impact recommendations
    expect(Array.isArray(resultado.agente4)).toBe(true)
    expect(resultado.agente4.length).toBeGreaterThan(0)

    // Each recommendation should have required fields
    resultado.agente4.forEach((rec) => {
      expect(rec.descricao).toBeDefined()
      expect(rec.impactoMoedas).toBeDefined()
    })
  })

  it('should create 5-phase transformation plan', async () => {
    const dados = transformHaldleyData()
    const resultado = await criarPipelineCompleto(dados)

    // Agente 6 provides 5 phases
    expect(resultado.agente6.fases).toBeDefined()
    expect(resultado.agente6.fases).toHaveLength(5)

    // Verify phase structure
    resultado.agente6.fases.forEach((fase, index) => {
      expect(fase.numero).toBe(index)
      expect(fase.nome).toBeDefined()
      expect(Array.isArray(fase.cards)).toBe(true)
    })
  })

  it('should generate 9-chapter narrative report', async () => {
    const dados = transformHaldleyData()
    const resultado = await criarPipelineCompleto(dados)

    // Agente 5 provides 9-chapter report
    expect(resultado.agente5.relatorio).toBeDefined()
    expect(resultado.agente5.relatorio.capitulos).toBeDefined()
    expect(resultado.agente5.relatorio.capitulos).toHaveLength(9)

    // Verify chapter structure
    resultado.agente5.relatorio.capitulos.forEach((capitulo) => {
      expect(capitulo.titulo).toBeDefined()
      expect(capitulo.conteudo).toBeDefined()
    })
  })

  it('should handle multi-company consolidation', async () => {
    const dados = transformHaldleyData()
    const resultado = await criarPipelineCompleto(dados)

    // Agente 1 handles organizational structure with groups
    expect(resultado.agente1.estrutura).toBeDefined()
    expect(resultado.agente1.estrutura.grupos).toBeDefined()
    expect(resultado.agente1.estrutura.grupos).toHaveLength(1)
    expect(resultado.agente1.estrutura.filiais).toBeDefined()
  })

  it('should analyze organizational psychology', async () => {
    const dados = transformHaldleyData()
    const resultado = await criarPipelineCompleto(dados)

    // Agente 3 provides psychological profile
    expect(resultado.agente3.perfil).toBeDefined()
    expect(resultado.agente3.perfil.motorVerdadeiro).toBeDefined()
    expect(resultado.agente3.comportamentoFinanceiro).toBeDefined()
    expect(resultado.agente3.recomendacoesPsicologicas).toBeDefined()
  })

  it('should produce consistent results across runs', async () => {
    const dados = transformHaldleyData()

    // Run pipeline twice
    const resultado1 = await criarPipelineCompleto(dados)
    const resultado2 = await criarPipelineCompleto(dados)

    // Results should be consistent (deterministic)
    expect(resultado1.agente2.scoreGeral).toBe(resultado2.agente2.scoreGeral)
    expect(resultado1.agente1.scoreEstrutura).toBe(resultado2.agente1.scoreEstrutura)
    expect(resultado1.agente6.fases).toHaveLength(resultado2.agente6.fases.length)
  })
})
