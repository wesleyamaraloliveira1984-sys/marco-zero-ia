import { Indicadores } from '@/src/types'

/**
 * Calculates current ratio (current liquidity)
 * Formula: Current Assets / Current Liabilities
 * Unit: ratio (>1.0 is healthy)
 * Range: 0 to infinity
 */
export function calcularLiquidezCorrente(ativoCirculante: number, passivoCirculante: number): number | null {
  if (passivoCirculante === 0) return null
  return ativoCirculante / passivoCirculante
}

/**
 * Calculates immediate ratio (quick liquidity)
 * Formula: Cash / Current Liabilities
 * Unit: ratio (>0.5 is good)
 * Range: 0 to infinity
 */
export function calcularLiquidezImediata(caixa: number, passivoCirculante: number): number | null {
  if (passivoCirculante === 0) return null
  return caixa / passivoCirculante
}

/**
 * Calculates dry liquidity ratio
 * Formula: (Current Assets - Inventory) / Current Liabilities
 * Unit: ratio (>0.7 is good)
 * Range: 0 to infinity
 */
export function calcularLiquidezSeca(
  ativoCirculante: number,
  estoque: number,
  passivoCirculante: number
): number | null {
  if (passivoCirculante === 0) return null
  return (ativoCirculante - estoque) / passivoCirculante
}

/**
 * Calculates gross profit margin
 * Formula: (Revenue - COGS) / Revenue
 * Unit: 0-1 (0% to 100%)
 */
export function calcularMargemBruta(receita: number, custos: number): number | null {
  if (receita === 0) return null
  return (receita - custos) / receita
}

/**
 * Calculates operating profit margin
 * Formula: (Revenue - COGS - Operating Expenses) / Revenue
 * Unit: 0-1 (0% to 100%)
 */
export function calcularMargemOperacional(
  receita: number,
  custos: number,
  despesasOperacionais: number
): number | null {
  if (receita === 0) return null
  return (receita - custos - despesasOperacionais) / receita
}

/**
 * Calculates net profit margin
 * Formula: (Revenue - COGS - Expenses - Taxes) / Revenue
 * Unit: 0-1 (0% to 100%)
 */
export function calcularMargemLiquida(
  receita: number,
  custos: number,
  despesasOperacionais: number,
  impostos: number
): number | null {
  if (receita === 0) return null
  return (receita - custos - despesasOperacionais - impostos) / receita
}

/**
 * Calculates EBITDA margin
 * Formula: EBITDA / Revenue
 * Unit: 0-1 (0% to 100%)
 */
export function calcularMargemEBITDA(ebitda: number, receita: number): number | null {
  if (receita === 0) return null
  return ebitda / receita
}

/**
 * Calculates debt-to-equity ratio
 * Formula: Total Liabilities / Equity
 * Unit: ratio (healthy <1.0)
 */
export function calcularEndividamento(passivoTotal: number, patrimonioLiquido: number): number | null {
  if (patrimonioLiquido === 0) return null
  return passivoTotal / patrimonioLiquido
}

/**
 * Calculates fixed assets to equity ratio
 * Formula: Fixed Assets / Equity
 * Unit: ratio (healthy <1.0)
 */
export function calcularImobilizacao(ativoImobilizado: number, patrimonioLiquido: number): number | null {
  if (patrimonioLiquido === 0) return null
  return ativoImobilizado / patrimonioLiquido
}

/**
 * Calculates debt composition ratio
 * Formula: Short-term Debt / Total Debt
 * Unit: 0-1 (lower short-term debt is better)
 */
export function calcularComposicaoEndividamento(passivoCirculante: number, passivoTotal: number): number | null {
  if (passivoTotal === 0) return null
  return passivoCirculante / passivoTotal
}

/**
 * Calculates debt coverage ratio
 * Formula: Operating Cash Flow / Total Debt
 * Unit: 0-1 (higher is better)
 */
export function calcularCoberturaDividaOperacional(fluxoCaixa: number, passivoTotal: number): number | null {
  if (passivoTotal === 0) return null
  return fluxoCaixa / passivoTotal
}

/**
 * Calculates cash conversion cycle
 * Formula: Days to Collect - Days to Pay
 * Unit: days (lower is better)
 */
export function calcularCicloConversaoCaixa(diasReceber: number, diasPagar: number): number {
  return diasReceber - diasPagar
}

/**
 * Calculates available cash runway
 * Formula: Cash Balance / (Annual Expenses / 365)
 * Unit: days (how many days the company can operate with current cash)
 */
export function calcularDiasCaixaDisponivel(saldoCaixa: number, despesasDia: number): number | null {
  if (despesasDia === 0) return null
  return saldoCaixa / despesasDia
}

/**
 * Calculates average collection period
 * Formula: (Accounts Receivable / Daily Sales) * 365
 * Unit: days (how long to collect receivables)
 */
export function calcularPrazoRecebimento(duplicatasReceber: number, vendiasDia: number): number | null {
  if (vendiasDia === 0) return null
  return (duplicatasReceber / vendiasDia) * 365
}

/**
 * Calculates average payment period
 * Formula: (Accounts Payable / Daily COGS) * 365
 * Unit: days (how long to pay suppliers)
 */
export function calcularPrazoPagamento(duplicatasPagar: number, custosDia: number): number | null {
  if (custosDia === 0) return null
  return (duplicatasPagar / custosDia) * 365
}

/**
 * Calculates inventory turnover
 * Formula: COGS / Average Inventory
 * Unit: times per year (higher is better)
 */
export function calcularGiroEstoque(custos: number, estoque: number): number | null {
  if (estoque === 0) return null
  return custos / estoque
}

/**
 * Calculates days inventory outstanding
 * Formula: 365 / Inventory Turnover
 * Unit: days (lower is better)
 */
export function calcularDiasEstoque(giroEstoque: number): number | null {
  if (giroEstoque === 0) return null
  return 365 / giroEstoque
}

/**
 * Calculates return on equity
 * Formula: Net Income / Equity
 * Unit: 0-1 (annualized, healthy >0.15)
 */
export function calcularROE(lucroLiquido: number, patrimonioLiquido: number): number | null {
  if (patrimonioLiquido === 0) return null
  return lucroLiquido / patrimonioLiquido
}

/**
 * Calculates return on invested capital
 * Formula: Operating Income / (Equity + Debt)
 * Unit: 0-1 (healthy >0.15)
 */
export function calcularROIC(lucroOperacional: number, capitalEmpregado: number): number | null {
  if (capitalEmpregado === 0) return null
  return lucroOperacional / capitalEmpregado
}

/**
 * Calculates return on assets
 * Formula: Net Income / Total Assets
 * Unit: 0-1 (healthy >0.10)
 */
export function calcularRentabilidadeAtivo(lucroLiquido: number, ativoTotal: number): number | null {
  if (ativoTotal === 0) return null
  return lucroLiquido / ativoTotal
}

/**
 * Calculates asset turnover
 * Formula: Revenue / Total Assets
 * Unit: ratio (times per year, higher is better)
 */
export function calcularGiroAtivo(receita: number, ativoTotal: number): number | null {
  if (ativoTotal === 0) return null
  return receita / ativoTotal
}

/**
 * Calculates cash turnover
 * Formula: Annual Expenses / Cash Balance
 * Unit: times per year (lower is better, indicates better cash position)
 */
export function calcularGiroCaixa(despesasAno: number, saldoCaixa: number): number | null {
  if (saldoCaixa === 0) return null
  return despesasAno / saldoCaixa
}

/**
 * Calculates customer concentration ratio
 * Formula: Largest Customer Revenue / Total Revenue
 * Unit: 0-1 (lower is less risky)
 */
export function calcularConcentracaoRecebimento(recebimentoMaior: number, recebimentoTotal: number): number | null {
  if (recebimentoTotal === 0) return null
  return recebimentoMaior / recebimentoTotal
}

/**
 * Calculates seasonality factor
 * Formula: (Max Monthly Revenue - Min Monthly Revenue) / Average Monthly Revenue
 * Unit: 0-1 (higher indicates more seasonality)
 */
export function calcularSazonalidade(maxMensal: number, minMensal: number, mediaMensal: number): number | null {
  if (mediaMensal === 0) return null
  return (maxMensal - minMensal) / mediaMensal
}

/**
 * Calculates overall financial health score
 * Weights:
 * - Liquidity (liquidezCorrente): 20% (target: > 1.0)
 * - Margin (margemLiquida): 25% (target: > 0.15)
 * - Debt (endividamento): 20% (target: < 1.0)
 * - Cycle (cicloConversaoCaixa): 20% (target: < 60 days)
 * - ROE: 15% (target: > 0.15)
 *
 * Returns a score from 0 to 100, where:
 * - 80-100: Excellent financial health
 * - 60-79: Good financial health
 * - 40-59: Fair financial health
 * - 20-39: Poor financial health
 * - 0-19: Critical financial health
 */
export function calcularScoreGeral(indicadores: Indicadores): number {
  let score = 0

  // Liquidity score (20%)
  // Target: liquidity > 1.0 is perfect, < 0.5 is critical
  const liquidezTarget = 1.0
  const liquidezFraction = Math.min((indicadores.liquidezCorrente || 0) / liquidezTarget, 1.5)
  const liquidezScore = Math.max(0, Math.min(liquidezFraction * 20, 20))
  score += liquidezScore

  // Margin score (25%)
  // Target: margin > 0.2 (20%) is perfect
  const margemTarget = 0.2
  const margemFraction = Math.min((indicadores.margemLiquida || 0) / margemTarget, 1.5)
  const margemScore = Math.max(0, Math.min(margemFraction * 25, 25))
  score += margemScore

  // Debt score (20%)
  // Target: debt < 1.0 is healthy, > 2.0 is critical
  const debtTarget = 1.0
  const debtFraction = Math.max(0, 1 - (indicadores.endividamento || 0) / debtTarget)
  const debtScore = Math.max(0, Math.min(debtFraction * 20, 20))
  score += debtScore

  // Cycle score (20%)
  // Target: cycle < 30 days is excellent, > 120 days is poor
  const cycleTarget = 30
  const cycleMaxBad = 120
  const cycle = indicadores.cicloConversaoCaixa || 0
  let cycleScore = 0
  if (cycle <= cycleTarget) {
    cycleScore = 20
  } else if (cycle >= cycleMaxBad) {
    cycleScore = 0
  } else {
    cycleScore = 20 * (1 - (cycle - cycleTarget) / (cycleMaxBad - cycleTarget))
  }
  score += Math.max(0, cycleScore)

  // ROE score (15%)
  // Target: ROE > 0.2 (20%) is excellent
  const roeTarget = 0.2
  const roeFraction = Math.min((indicadores.roe || 0) / roeTarget, 1.5)
  const roeScore = Math.max(0, Math.min(roeFraction * 15, 15))
  score += roeScore

  return Math.min(Math.round(score), 100)
}

/**
 * Calculates dupont analysis (ROE breakdown)
 * Formula: ROE = Net Margin × Asset Turnover × Equity Multiplier
 * Helps understand what drives ROE
 */
export function calcularDupontROE(
  margemLiquida: number,
  giroAtivo: number,
  multiplicadorPatrimonial: number
): number {
  return margemLiquida * giroAtivo * multiplicadorPatrimonial
}

/**
 * Calculates equity multiplier
 * Formula: Total Assets / Equity
 * Unit: ratio (higher means more leverage)
 */
export function calcularMultiplicadorPatrimonial(ativoTotal: number, patrimonioLiquido: number): number | null {
  if (patrimonioLiquido === 0) return null
  return ativoTotal / patrimonioLiquido
}

/**
 * Calculates working capital
 * Formula: Current Assets - Current Liabilities
 * Unit: currency (positive is good)
 */
export function calcularCapitalCirculante(ativoCirculante: number, passivoCirculante: number): number {
  return ativoCirculante - passivoCirculante
}

/**
 * Calculates working capital ratio
 * Formula: (Current Assets - Current Liabilities) / Revenue
 * Unit: ratio (percentage of revenue)
 */
export function calcularRazaoCapitalCirculante(ativoCirculante: number, passivoCirculante: number, receita: number): number | null {
  if (receita === 0) return null
  return (ativoCirculante - passivoCirculante) / receita
}

/**
 * Calculates price to earnings ratio (requires market data)
 * Formula: Stock Price / Earnings Per Share
 * Unit: ratio (lower is cheaper)
 */
export function calcularP2L(precoAcao: number, lucroAcao: number): number | null {
  if (lucroAcao === 0) return null
  return precoAcao / lucroAcao
}

/**
 * Calculates book value per share
 * Formula: Equity / Number of Shares
 * Unit: currency per share
 */
export function calcularValorPatrimonialAcao(patrimonioLiquido: number, numeroAcoes: number): number | null {
  if (numeroAcoes === 0) return null
  return patrimonioLiquido / numeroAcoes
}

/**
 * Calculates sales per employee
 * Formula: Total Revenue / Number of Employees
 * Unit: currency per employee
 */
export function calcularReceitaPorFuncionario(receita: number, funcionarios: number): number | null {
  if (funcionarios === 0) return null
  return receita / funcionarios
}

/**
 * Calculates profit per employee
 * Formula: Net Income / Number of Employees
 * Unit: currency per employee
 */
export function calcularLucroPorFuncionario(lucroLiquido: number, funcionarios: number): number | null {
  if (funcionarios === 0) return null
  return lucroLiquido / funcionarios
}
