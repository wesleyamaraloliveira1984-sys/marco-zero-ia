/**
 * Master Orchestrator API Endpoint
 * POST /api/agents
 *
 * Accepts financial documents and returns complete 6-agent analysis
 * Uses: criarPipelineCompleto() to run all agents in sequence
 */

import { criarPipelineCompleto } from '@/lib/agent-pipeline'
import { DocumentosFinanceiros } from '@/src/types'

/**
 * POST /api/agents
 * Orchestrates all 6 agents for complete financial analysis
 */
export async function POST(request: Request) {
  try {
    // Parse incoming financial documents
    const documentos: DocumentosFinanceiros = await request.json()

    // Validate required fields
    if (!documentos.cnpj || !documentos.regime) {
      return Response.json(
        {
          error: 'Invalid input',
          message: 'Missing required fields: cnpj, regime',
        },
        { status: 400 }
      )
    }

    // Execute complete 6-agent pipeline
    const resultado = await criarPipelineCompleto(documentos)

    // Return complete analysis results
    return Response.json(resultado, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    // Handle errors gracefully
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return Response.json(
      {
        error: 'Pipeline execution failed',
        message: errorMessage,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/agents
 * Health check and documentation endpoint
 */
export async function GET() {
  return Response.json({
    name: 'Marco Zero - 6-Agent Pipeline API',
    version: '1.0.0',
    description: 'Master orchestrator for complete financial analysis',
    agents: [
      {
        numero: 1,
        nome: 'Estrutura Organizacional',
        descricao: 'Analyzes organizational structure and tax compliance',
      },
      {
        numero: 2,
        nome: 'Padrões e Críticas (Matriz Luminis)',
        descricao: 'Identifies financial patterns and critical issues',
      },
      {
        numero: 3,
        nome: 'Psicologia Organizacional',
        descricao: 'Analyzes organizational behavior and decision-making',
      },
      {
        numero: 4,
        nome: 'Impacto e Recomendações',
        descricao: 'Generates impact recommendations for improvements',
      },
      {
        numero: 5,
        nome: 'Narrativa (9 Capítulos)',
        descricao: 'Creates comprehensive narrative report',
      },
      {
        numero: 6,
        nome: 'Transformação (5 Fases)',
        descricao: 'Creates 5-phase transformation plan',
      },
    ],
    endpoint: {
      method: 'POST',
      path: '/api/agents',
      contentType: 'application/json',
      description: 'Submit financial documents for complete analysis',
    },
  })
}
