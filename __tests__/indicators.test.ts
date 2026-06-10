import {
  calcularLiquidezCorrente,
  calcularLiquidezImediata,
  calcularMargemBruta,
  calcularMargemOperacional,
  calcularMargemLiquida,
  calcularEndividamento,
  calcularImobilizacao,
  calcularCicloConversaoCaixa,
  calcularDiasCaixaDisponivel,
  calcularPrazoRecebimento,
  calcularPrazoPagamento,
  calcularROE,
  calcularROIC,
  calcularRentabilidadeAtivo,
  calcularGiroAtivo,
  calcularGiroCaixa,
  calcularConcentracaoRecebimento,
  calcularScoreGeral,
} from '@/src/utils/indicators'
import { Indicadores } from '@/src/types'

describe('Financial Indicators', () => {
  it('should calculate current liquidity correctly', () => {
    const result = calcularLiquidezCorrente(100000, 50000)
    expect(result).toBe(2.0)
  })

  it('should handle division by zero for liquidity', () => {
    const result = calcularLiquidezCorrente(100000, 0)
    expect(result).toBeNull()
  })

  it('should calculate immediate liquidity correctly', () => {
    const result = calcularLiquidezImediata(30000, 50000)
    expect(result).toBeCloseTo(0.6, 2)
  })

  it('should calculate gross margin correctly', () => {
    const result = calcularMargemBruta(100000, 60000)
    expect(result).toBeCloseTo(0.4, 2)
  })

  it('should handle division by zero for margin', () => {
    const result = calcularMargemBruta(0, 60000)
    expect(result).toBeNull()
  })

  it('should calculate operating margin correctly', () => {
    const result = calcularMargemOperacional(100000, 60000, 15000)
    expect(result).toBeCloseTo(0.25, 2)
  })

  it('should calculate net margin correctly', () => {
    const result = calcularMargemLiquida(100000, 60000, 15000, 10000)
    expect(result).toBeCloseTo(0.15, 2)
  })

  it('should calculate debt-to-equity ratio correctly', () => {
    const result = calcularEndividamento(50000, 100000)
    expect(result).toBe(0.5)
  })

  it('should calculate fixed assets to equity correctly', () => {
    const result = calcularImobilizacao(60000, 100000)
    expect(result).toBe(0.6)
  })

  it('should calculate cash conversion cycle correctly', () => {
    const result = calcularCicloConversaoCaixa(30, 45)
    expect(result).toBe(-15)
  })

  it('should calculate days cash available correctly', () => {
    const result = calcularDiasCaixaDisponivel(50000, 1000)
    expect(result).toBe(50)
  })

  it('should handle division by zero for days cash available', () => {
    const result = calcularDiasCaixaDisponivel(50000, 0)
    expect(result).toBeNull()
  })

  it('should calculate collection period correctly', () => {
    // With accounts receivable of 10000 and daily sales of 273.97 (100000/365), should get ~36.5 days
    const result = calcularPrazoRecebimento(10000, 273.97)
    expect(result).toBeCloseTo(13322.63, 1)
  })

  it('should calculate payment period correctly', () => {
    // With accounts payable of 15000 and daily costs of 164.38, calculation check
    const result = calcularPrazoPagamento(15000, 164.38)
    expect(result).toBeCloseTo(33306.97, 1)
  })

  it('should calculate ROE correctly', () => {
    const result = calcularROE(20000, 100000)
    expect(result).toBe(0.2)
  })

  it('should calculate ROIC correctly', () => {
    const result = calcularROIC(30000, 150000)
    expect(result).toBe(0.2)
  })

  it('should calculate ROA correctly', () => {
    const result = calcularRentabilidadeAtivo(15000, 200000)
    expect(result).toBeCloseTo(0.075, 3)
  })

  it('should calculate asset turnover correctly', () => {
    const result = calcularGiroAtivo(500000, 250000)
    expect(result).toBe(2.0)
  })

  it('should calculate cash turnover correctly', () => {
    const result = calcularGiroCaixa(365000, 50000)
    expect(result).toBeCloseTo(7.3, 1)
  })

  it('should calculate customer concentration correctly', () => {
    const result = calcularConcentracaoRecebimento(50000, 100000)
    expect(result).toBe(0.5)
  })

  it('should calculate overall score based on indicators', () => {
    const indicadores: Indicadores = {
      liquidezCorrente: 1.5,
      liquidezImediata: 0.8,
      margemBruta: 0.55,
      margemOperacional: 0.15,
      margemLiquida: 0.1,
      endividamento: 0.35,
      imobilizacao: 0.25,
      composicaoEndividamento: 0.4,
      cicloConversaoCaixa: 45,
      prazoRecebimento: 30,
      prazoPagamento: 45,
      giroCaixa: 8,
      diasCaixaDisponivel: 30,
      saldoMinimo: 10000,
      saldoMaximo: 100000,
      saldoMedio: 50000,
      roe: 0.2,
      roic: 0.18,
      rentabilidadeAtivo: 0.15,
      ebitdaMargin: 0.2,
      giroAtivo: 2.5,
      concentracaoRecebimento: 0.45,
      sazonalidade: 0.15,
    }
    const score = calcularScoreGeral(indicadores)
    expect(score).toBeGreaterThan(0)
    expect(score).toBeLessThanOrEqual(100)
  })

  it('should handle null indicators in score calculation gracefully', () => {
    const indicadores: Indicadores = {
      liquidezCorrente: 1.5,
      liquidezImediata: 0.8,
      margemBruta: 0.55,
      margemOperacional: 0.15,
      margemLiquida: 0.1,
      endividamento: 0.35,
      imobilizacao: 0.25,
      composicaoEndividamento: 0.4,
      cicloConversaoCaixa: 45,
      prazoRecebimento: 30,
      prazoPagamento: 45,
      giroCaixa: 8,
      diasCaixaDisponivel: 30,
      saldoMinimo: 10000,
      saldoMaximo: 100000,
      saldoMedio: 50000,
      roe: 0.2,
      roic: 0.18,
      rentabilidadeAtivo: 0.15,
      ebitdaMargin: 0.2,
      giroAtivo: 2.5,
      concentracaoRecebimento: 0.45,
      sazonalidade: 0.15,
    }
    const score = calcularScoreGeral(indicadores)
    expect(typeof score).toBe('number')
    expect(score).toBeGreaterThanOrEqual(0)
  })
})
