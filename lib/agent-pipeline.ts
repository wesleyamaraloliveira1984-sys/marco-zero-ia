/**
 * Complete 6-Agent Pipeline Orchestrator
 * Coordinates execution of all agents in sequence with proper data flow
 * Order: Agente 1 → Agente 2 → Agente 3 → Agente 4 → Agente 5 → Agente 6
 */

import { analisarEstrutura } from '@/src/agents/agente-estrutura'
import { analisarPadroes } from '@/src/agents/agente-padroes'
import { analisarPerfil } from '@/src/agents/agente-psicologia'
import { analisarImpacto } from '@/src/agents/agente-impacto'
import { gerarRelatorio } from '@/src/agents/agente-narrativa'
import { criarPlano90Dias } from '@/src/agents/agente-transformacao'
import {
  DocumentosFinanceiros,
  ResultadoAgente1,
  ResultadoAgente2,
  ResultadoAgente3,
  ResultadoAgente4,
  ResultadoAgente5,
  ResultadoAgente6,
} from '@/src/types'

/**
 * Complete pipeline that orchestrates all 6 agents
 * @param documentos - Financial documents for analysis
 * @returns Complete analysis results from all 6 agents
 */
export async function criarPipelineCompleto(documentos: DocumentosFinanceiros) {
  // ============================================================================
  // AGENTE 1: Estrutura Organizacional
  // Analyzes organizational structure, identifies legal entities, validates tax regime
  // ============================================================================
  const agente1: ResultadoAgente1 = await analisarEstrutura(documentos)

  // ============================================================================
  // AGENTE 2: Padrões e Críticas (Matriz Luminis)
  // Analyzes financial patterns, calculates indicators, identifies critical issues
  // Depends on: Documentos (original input)
  // ============================================================================
  const agente2: ResultadoAgente2 = await analisarPadroes(documentos)

  // ============================================================================
  // AGENTE 3: Psicologia Organizacional
  // Analyzes organizational psychology, decision-making patterns, financial behavior
  // Depends on: Documentos (original input)
  // ============================================================================
  const agente3: ResultadoAgente3 = await analisarPerfil(documentos)

  // ============================================================================
  // AGENTE 4: Impacto (Recomendações de Ação)
  // Generates impact recommendations based on patterns identified by Agente 2
  // Depends on: Agente 2 results (patterns and score)
  // ============================================================================
  const agente4: ResultadoAgente4[] = await analisarImpacto(agente2)

  // ============================================================================
  // AGENTE 6: Transformação (Plano 5 Fases)
  // Creates 5-phase transformation plan based on patterns and recommendations
  // Depends on: Agente 2 (score) and Agente 4 (recommendations)
  // Note: Must be executed before Agente 5 since Agente 5 needs Agente 6 data
  // ============================================================================
  const agente6: ResultadoAgente6 = await criarPlano90Dias(agente2, agente4)

  // ============================================================================
  // AGENTE 5: Narrativa (Relatório 9 Capítulos)
  // Generates comprehensive narrative report synthesizing all previous analyses
  // Depends on: Agente 1, 2, 3, 4, 6 results
  // ============================================================================
  const agente5: ResultadoAgente5 = await gerarRelatorio(agente1, agente2, agente3, agente4, agente6)

  // ============================================================================
  // RETURN: Complete Pipeline Results
  // ============================================================================
  return {
    agente1,
    agente2,
    agente3,
    agente4,
    agente5,
    agente6,

    // Pipeline metadata
    metadata: {
      executedAt: new Date().toISOString(),
      cnpj: documentos.cnpj,
      periodo: documentos.periodo,
      successfulAgents: 6,
    },
  }
}
