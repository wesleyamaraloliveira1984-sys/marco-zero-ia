import { DocumentosFinanceiros, ResultadoAgente3 } from '@/src/types'

/**
 * Agente 3: Perfil Psicológico
 * Analyzes psychological and behavioral profile from financial data
 * Infers risk profile, generates psychological recommendations
 * Returns psychological profile with core values, motivation, and decision patterns
 */
export async function analisarPerfil(documentos: DocumentosFinanceiros): Promise<ResultadoAgente3> {
  // Validate input
  if (!documentos || !documentos.cnpj) {
    throw new Error('Missing required data: cnpj')
  }

  return {
    perfil: {
      nome: documentos.nome || 'Empreendedor',
      trajetoria: inferirTrajetoria(documentos),
      motorVerdadeiro: inferirMotor(documentos),
      pressoes: inferirPressoes(documentos),
      valores: ['Sustentabilidade', 'Crescimento', 'Autonomia'],
    },
    comportamentoFinanceiro: {
      risco: inferirPerfilRisco(documentos),
      padroesTomadaDecisao: ['Baseada em dados', 'Consultiva', 'Intuitiva'],
    },
    recomendacoesPsicologicas: gerarRecomendacoesPsicologicas(documentos),
  }
}

/**
 * Infer the business maturity trajectory from financial data
 */
function inferirTrajetoria(documentos: DocumentosFinanceiros): string {
  // Analyze business maturity from financial data
  if (documentos.dre && documentos.dre.receitas.bruta > 500000) {
    return 'Empresário consolidado em crescimento'
  }
  return 'Empreendedor em desenvolvimento'
}

/**
 * Identify the primary motivation/driver of the business
 */
function inferirMotor(documentos: DocumentosFinanceiros): string {
  // Identify primary motivation
  if (documentos.grupo) {
    return 'Expansão e diversificação'
  }
  return 'Consolidação e profissionalização'
}

/**
 * Identify psychological pressures affecting the business
 */
function inferirPressoes(documentos: DocumentosFinanceiros): string[] {
  const pressoes: string[] = []

  if (documentos.dre && documentos.dre.resultados.liquido < 30000) {
    pressoes.push('Rentabilidade limitada')
  }

  if (documentos.grupo) {
    pressoes.push('Complexidade multi-filial')
  }

  return pressoes.length > 0 ? pressoes : ['Crescimento controlado']
}

/**
 * Infer risk profile based on financial structure and behavior
 */
function inferirPerfilRisco(
  documentos: DocumentosFinanceiros
): 'conservador' | 'moderado' | 'agressivo' {
  // Based on financial structure
  if (
    documentos.balancete &&
    documentos.balancete.contas.passivo.total > documentos.balancete.contas.patrimonio
  ) {
    return 'agressivo'
  }

  if (documentos.grupo) {
    return 'moderado'
  }

  return 'conservador'
}

/**
 * Generate psychological recommendations based on profile
 */
function gerarRecomendacoesPsicologicas(documentos: DocumentosFinanceiros): string[] {
  return [
    'Estabelecer rotina mensal de análise financeira',
    'Delegar operações para focar estratégia',
    'Documentar decisões-chave para consistência',
  ]
}
