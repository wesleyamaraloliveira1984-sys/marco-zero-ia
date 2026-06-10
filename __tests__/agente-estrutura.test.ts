import { analisarEstrutura } from '@/src/agents/agente-estrutura'
import { DocumentosFinanceiros, ResultadoAgente1 } from '@/src/types'

describe('Agente 1: Estrutura Organizacional', () => {
  const haldleyData: DocumentosFinanceiros = {
    cnpj: '07.843.328/0001-19',
    nome: 'Óticas Mais',
    regime: 'LUCRO_REAL',
    periodo: '2026-01-05',
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
        { cnpj: '07.843.328/0001-19', nome: 'Matriz Luminis', localizacao: 'Betim', tipo: 'matriz' },
        { cnpj: '07.843.328/0002-08', nome: 'Filial Proview', localizacao: 'BH', tipo: 'filial' },
      ],
    },
    extratos: [],
    dre: { periodo: '2026-05', receitas: { bruta: 238876, deducoes: 5700, liquida: 233176 }, custos: { cogs: 105000, variaveis: 25000 }, despesas: { operacionais: 35000, administrativas: 15000, vendas: 8000, financeiras: 3000 }, resultados: { operacional: 45176, financeiro: -3000, tributario: -11000, liquido: 31176 } },
    notasFiscaisSaida: [],
    notasFiscaisEntrada: [],
    balancete: { periodo: '2026-05', contas: { ativo: { circulante: 250000, naoCirculante: 150000, total: 400000 }, passivo: { circulante: 80000, naoCirculante: 40000, total: 120000 }, patrimonio: 280000 } },
  }

  it('should analyze organizational structure', async () => {
    const resultado = await analisarEstrutura(haldleyData)
    expect(resultado).toBeDefined()
    expect(resultado.scoreEstrutura).toBeGreaterThan(0)
  })

  it('should identify matriz and filiais', async () => {
    const resultado = await analisarEstrutura(haldleyData)
    expect(resultado.estrutura.matriz).toBeDefined()
    expect(resultado.estrutura.filiais).toHaveLength(1)
  })

  it('should validate tax regime', async () => {
    const resultado = await analisarEstrutura(haldleyData)
    expect(resultado.analiseJuridica?.regimeAtual).toBe('LUCRO_REAL')
  })

  it('should provide structural recommendations', async () => {
    const resultado = await analisarEstrutura(haldleyData)
    expect(resultado.analiseJuridica?.recomendacoes).toBeDefined()
    expect(Array.isArray(resultado.analiseJuridica?.recomendacoes)).toBe(true)
  })

  it('should handle multi-company groups', async () => {
    const resultado = await analisarEstrutura(haldleyData)
    expect(resultado.estrutura.grupos).toBeDefined()
    expect(resultado.estrutura.grupos?.length).toBeGreaterThan(0)
  })

  it('should score structure quality 0-100', async () => {
    const resultado = await analisarEstrutura(haldleyData)
    expect(resultado.scoreEstrutura).toBeGreaterThanOrEqual(0)
    expect(resultado.scoreEstrutura).toBeLessThanOrEqual(100)
  })
})
