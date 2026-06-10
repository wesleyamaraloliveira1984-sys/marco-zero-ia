/**
 * Agente 1: Estrutura Organizacional
 * Analyzes organizational structure, identifies legal entities, validates tax regimes, and provides legal recommendations
 * Returns: Structure analysis, legal compliance status, and organizational health score (0-100)
 */

import { DocumentosFinanceiros, ResultadoAgente1, AnaliseJuridica, EstruturaOrganizacional } from '@/src/types'

/**
 * Main function: Analyze organizational structure
 * @param documentos - Financial documents containing organizational and tax regime information
 * @returns ResultadoAgente1 with structure analysis, legal recommendations, and organizational score
 */
export async function analisarEstrutura(documentos: DocumentosFinanceiros): Promise<ResultadoAgente1> {
  // Validate input data
  if (!documentos.cnpj || !documentos.regime) {
    throw new Error('Missing required fields: CNPJ or Regime')
  }

  // Analyze organizational structure
  const estrutura = construirEstrutura(documentos)

  // Generate legal analysis and recommendations
  const analiseJuridica = gerarAnaliseJuridica(documentos, estrutura)

  // Calculate organizational health score
  const scoreEstrutura = calcularScoreEstrutura(documentos, estrutura)

  return {
    estrutura,
    analiseJuridica,
    scoreEstrutura,
  }
}

/**
 * Build organizational structure from financial documents
 * Identifies matrix, filials, and corporate groups
 */
function construirEstrutura(documentos: DocumentosFinanceiros): EstruturaOrganizacional {
  const tipo = documentos.grupo ? 'grupo_empresarial' : 'empresa_individual'

  // Extract matriz
  const matriz = documentos.estabelecimento

  // Extract filiais from grupo
  const filiais = documentos.grupo
    ? documentos.grupo.estabelecimentos.filter((e) => e.tipo === 'filial')
    : undefined

  // Build groups array
  const grupos = documentos.grupo ? [documentos.grupo] : undefined

  return {
    tipo,
    matriz,
    filiais: filiais && filiais.length > 0 ? filiais : undefined,
    grupos,
  }
}

/**
 * Generate legal analysis and recommendations based on tax regime and structure
 */
function gerarAnaliseJuridica(documentos: DocumentosFinanceiros, estrutura: EstruturaOrganizacional): AnaliseJuridica {
  const recomendacoes = gerarRecomendacoesJuridicas(documentos, estrutura)

  return {
    regimeAtual: documentos.regime,
    recomendacoes,
  }
}

/**
 * Generate legal recommendations based on regime and structure complexity
 */
function gerarRecomendacoesJuridicas(documentos: DocumentosFinanceiros, estrutura: EstruturaOrganizacional): string[] {
  const recomendacoes: string[] = []

  // Recommendation for Lucro Real regime with group structure
  if (documentos.regime === 'LUCRO_REAL' && estrutura.grupos && estrutura.grupos.length > 0) {
    recomendacoes.push('Considerar consolidação de balanços para grupo empresarial')
  }

  // Recommendation for multi-unit structures
  const filialCount = estrutura.filiais?.length ?? 0
  if (filialCount > 1) {
    recomendacoes.push('Estrutura multi-filial: revisar governança corporativa e segregação de resultados')
  } else if (filialCount === 1) {
    recomendacoes.push('Estrutura multi-filial: revisar governança corporativa')
  }

  // Recommendation for tax regime optimization
  if (documentos.regime === 'LUCRO_REAL' && documentos.dre) {
    const lucroLiquido = documentos.dre.resultados.liquido
    if (lucroLiquido > 500000) {
      recomendacoes.push('Avaliar viabilidade de planejamento tributário avançado dado o volume de lucros')
    }
  }

  // Recommendation for growth trajectory
  if (estrutura.grupos && estrutura.grupos.length > 0 && documentos.dre) {
    recomendacoes.push('Formalizar políticas de retenção de lucros e distribuição de dividendos')
  }

  // Default recommendation if no specific issues
  if (recomendacoes.length === 0) {
    recomendacoes.push('Estrutura organizacional adequada ao regime tributário vigente')
  }

  return recomendacoes
}

/**
 * Calculate organizational structure quality score (0-100)
 * Based on: tax compliance, structural clarity, growth stage, and complexity management
 */
function calcularScoreEstrutura(documentos: DocumentosFinanceiros, estrutura: EstruturaOrganizacional): number {
  let score = 50 // Base score

  // Points for group structure (organized business growth)
  if (estrutura.grupos && estrutura.grupos.length > 0) {
    score += 20
  }

  // Points for matrix identification
  if (estrutura.matriz && estrutura.matriz.tipo === 'matriz') {
    score += 15
  }

  // Points for appropriate tax regime (Lucro Real = more sophisticated)
  if (documentos.regime === 'LUCRO_REAL') {
    score += 10
  }

  // Points for balanced asset/liability structure
  if (documentos.balancete) {
    const { ativo, passivo, patrimonio } = documentos.balancete.contas
    const endividamento = passivo.total / (passivo.total + patrimonio)
    // Better score for healthier capital structure (not overleveraged)
    if (endividamento < 0.5) {
      score += 5
    }
  }

  // Ensure score stays within 0-100 bounds
  return Math.min(Math.max(score, 0), 100)
}
