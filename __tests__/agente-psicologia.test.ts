import { analisarPerfil } from '@/src/agents/agente-psicologia'
import { DocumentosFinanceiros, ResultadoAgente3 } from '@/src/types'

describe('Agente 3: Perfil Psicológico', () => {
  const basicData: DocumentosFinanceiros = {
    cnpj: '07.843.328/0001-19',
    nome: 'Óticas Mais',
    regime: 'LUCRO_REAL',
    periodo: '2026-01-05',
    extratos: [],
    notasFiscaisSaida: [],
    notasFiscaisEntrada: [],
    dre: {
      periodo: '2026-05',
      receitas: { bruta: 238876, deducoes: 5700, liquida: 233176 },
      custos: { cogs: 105000, variaveis: 25000 },
      despesas: { operacionais: 35000, administrativas: 15000, vendas: 8000, financeiras: 3000 },
      resultados: { operacional: 45176, financeiro: -3000, tributario: -11000, liquido: 31176 },
    },
    balancete: {
      periodo: '2026-05',
      contas: {
        ativo: { circulante: 250000, naoCirculante: 150000, total: 400000 },
        passivo: { circulante: 80000, naoCirculante: 40000, total: 120000 },
        patrimonio: 280000,
      },
    },
  }

  it('should create psychological profile', async () => {
    const resultado = await analisarPerfil(basicData)
    expect(resultado.perfil).toBeDefined()
  })

  it('should identify financial behavior pattern', async () => {
    const resultado = await analisarPerfil(basicData)
    expect(resultado.comportamentoFinanceiro?.risco).toMatch(/conservador|moderado|agressivo/)
  })

  it('should provide psychological recommendations', async () => {
    const resultado = await analisarPerfil(basicData)
    expect(resultado.recomendacoesPsicologicas).toBeDefined()
    expect(Array.isArray(resultado.recomendacoesPsicologicas)).toBe(true)
  })

  it('should detect entrepreneur trajectory', async () => {
    const resultado = await analisarPerfil(basicData)
    expect(resultado.perfil.trajetoria).toBeDefined()
  })

  it('should assess core values', async () => {
    const resultado = await analisarPerfil(basicData)
    expect(resultado.perfil.valores).toBeDefined()
    expect(Array.isArray(resultado.perfil.valores)).toBe(true)
  })

  it('should identify true motivation', async () => {
    const resultado = await analisarPerfil(basicData)
    expect(resultado.perfil.motorVerdadeiro).toBeDefined()
  })
})
