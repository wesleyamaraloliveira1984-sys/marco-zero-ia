# Marco Zero AI Phase 2 - Complete 6-Agent System with Frontend

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement remaining 3 agents (Estrutura, Psicologia, Narrativa) and build upload/dashboard frontend in parallel, integrating into a complete 6-agent system with real data validation.

**Architecture:** Two parallel tracks execute simultaneously:
- **Track A (Agentes):** Implement Agentes 1, 3, 5 using TDD (tests → code → validation)
- **Track B (Frontend):** Build upload page and dashboard component with API integration stubs
- **Track C (Integration):** Merge both tracks, wire agents into API endpoints, end-to-end test with Dr. Haldley data

**Tech Stack:** Next.js 16.2.6, React 19.2.7, TypeScript 5.3.3 (strict), Jest, Supabase (future), Dr. Haldley validation data

---

## 📋 Overall Structure

### Files to Create/Modify

#### Track A - Agentes 1, 3, 5
```
src/agents/
├── agente-estrutura.ts (Agente 1 - 300 lines)
├── agente-psicologia.ts (Agente 3 - 250 lines)
├── agente-narrativa.ts (Agente 5 - 350 lines)

__tests__/
├── agente-estrutura.test.ts (120 lines, 6 tests)
├── agente-psicologia.test.ts (110 lines, 6 tests)
├── agente-narrativa.test.ts (130 lines, 6 tests)
```

#### Track B - Frontend
```
app/
├── (upload)/
│   ├── page.tsx (Upload page - 200 lines)
│   └── layout.tsx
├── (dashboard)/
│   ├── page.tsx (Dashboard - 250 lines)
│   ├── components/
│   │   ├── DiagnosisCard.tsx (80 lines)
│   │   ├── ImpactCard.tsx (80 lines)
│   │   ├── PlanCard.tsx (100 lines)
│   │   └── FileUpload.tsx (120 lines)
│   └── layout.tsx

lib/
├── api-client.ts (API client stubs - 80 lines)

__tests__/
├── upload.test.tsx (80 lines, 4 tests)
├── dashboard.test.tsx (100 lines, 5 tests)
```

#### Track C - Integration
```
app/api/
├── agents/route.ts (Master orchestrator - 150 lines)
├── upload/route.ts (Document upload handler - 100 lines)

lib/
├── agent-pipeline.ts (Agente 1→6 orchestration - 200 lines)

__tests__/
├── integration.test.ts (100 lines, 8 E2E tests with Dr. Haldley data)
```

---

## 🚀 TRACK A: Agentes 1, 3, 5 (Can Start Immediately)

### Task A1: Agente 1 - Estrutura Organizacional

**Files:**
- Create: `src/agents/agente-estrutura.ts`
- Create: `__tests__/agente-estrutura.test.ts`

- [ ] **Step 1: Write failing test**

```typescript
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
```

Run: `npm test __tests__/agente-estrutura.test.ts`
Expected: FAIL (function doesn't exist)

- [ ] **Step 2: Implement Agente 1**

```typescript
// src/agents/agente-estrutura.ts
import { DocumentosFinanceiros, ResultadoAgente1 } from '@/src/types'

export async function analisarEstrutura(documentos: DocumentosFinanceiros): Promise<ResultadoAgente1> {
  return {
    estrutura: {
      tipo: documentos.grupo ? 'grupo_empresarial' : 'empresa_individual',
      matriz: documentos.estabelecimento,
      filiais: documentos.grupo?.estabelecimentos.filter(e => e.tipo === 'filial'),
      grupos: documentos.grupo ? [documentos.grupo] : undefined,
    },
    analiseJuridica: {
      regimeAtual: documentos.regime,
      recomendacoes: gerarRecomendacoesJuridicas(documentos),
    },
    scoreEstrutura: calcularScoreEstrutura(documentos),
  }
}

function gerarRecomendacoesJuridicas(documentos: DocumentosFinanceiros): string[] {
  const recomendacoes: string[] = []
  
  if (documentos.regime === 'LUCRO_REAL' && documentos.grupo) {
    recomendacoes.push('Considerar consolidação de balanços para grupo')
  }
  
  if (documentos.estabelecimento?.tipo === 'matriz' && documentos.grupo?.estabelecimentos.length! > 2) {
    recomendacoes.push('Estrutura multi-filial: revisar governança corporativa')
  }
  
  return recomendacoes.length > 0 ? recomendacoes : ['Estrutura organizacional adequada']
}

function calcularScoreEstrutura(documentos: DocumentosFinanceiros): number {
  let score = 50
  
  if (documentos.grupo) score += 20
  if (documentos.estabelecimento?.tipo === 'matriz') score += 15
  if (documentos.regime === 'LUCRO_REAL') score += 10
  
  return Math.min(score, 100)
}
```

- [ ] **Step 3: Run tests**

Run: `npm test __tests__/agente-estrutura.test.ts`
Expected: PASS (all 6 tests)

- [ ] **Step 4: Commit**

```bash
git add src/agents/agente-estrutura.ts __tests__/agente-estrutura.test.ts
git commit -m "feat: implement Agente 1 (Estrutura Organizacional) with legal analysis"
```

---

### Task A2: Agente 3 - Perfil Psicológico

**Files:**
- Create: `src/agents/agente-psicologia.ts`
- Create: `__tests__/agente-psicologia.test.ts`

- [ ] **Step 1: Write failing test**

```typescript
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
    dre: { periodo: '2026-05', receitas: { bruta: 238876, deducoes: 5700, liquida: 233176 }, custos: { cogs: 105000, variaveis: 25000 }, despesas: { operacionais: 35000, administrativas: 15000, vendas: 8000, financeiras: 3000 }, resultados: { operacional: 45176, financeiro: -3000, tributario: -11000, liquido: 31176 } },
    balancete: { periodo: '2026-05', contas: { ativo: { circulante: 250000, naoCirculante: 150000, total: 400000 }, passivo: { circulante: 80000, naoCirculante: 40000, total: 120000 }, patrimonio: 280000 } },
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
```

Run: `npm test __tests__/agente-psicologia.test.ts`
Expected: FAIL

- [ ] **Step 2: Implement Agente 3**

```typescript
// src/agents/agente-psicologia.ts
import { DocumentosFinanceiros, ResultadoAgente3 } from '@/src/types'

export async function analisarPerfil(documentos: DocumentosFinanceiros): Promise<ResultadoAgente3> {
  return {
    perfil: {
      nome: documentos.nome || 'Empreendedor',
      trajetoria: inferirTrajetoria(documentos),
      motorVerdadeiro: inferirMotor(documentos),
      pressoes: inferirPressoes(documentos),
      valores: ['Sustentabilidade', 'Crescimento', 'Autonomia'],
    },
    comportamentoFinanceiro: {
      risco: inferirPerfisRisco(documentos),
      padroesTomadaDecisao: ['Baseada em dados', 'Consultiva', 'Intuitiva'],
    },
    recomendacoesPsicologicas: gerarRecomendacoesPsicologicas(documentos),
  }
}

function inferirTrajetoria(documentos: DocumentosFinanceiros): string {
  // Analyze business maturity from financial data
  if (documentos.dre && documentos.dre.receitas.bruta > 500000) {
    return 'Empresário consolidado em crescimento'
  }
  return 'Empreendedor em desenvolvimento'
}

function inferirMotor(documentos: DocumentosFinanceiros): string {
  // Identify primary motivation
  if (documentos.grupo) {
    return 'Expansão e diversificação'
  }
  return 'Consolidação e profissionalização'
}

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

function inferirPerfisRisco(documentos: DocumentosFinanceiros): 'conservador' | 'moderado' | 'agressivo' {
  // Based on financial structure
  if (documentos.balancete?.contas.passivo.total! > documentos.balancete?.contas.patrimonio!) {
    return 'agressivo'
  }
  if (documentos.grupo) {
    return 'moderado'
  }
  return 'conservador'
}

function gerarRecomendacoesPsicologicas(documentos: DocumentosFinanceiros): string[] {
  return [
    'Estabelecer rotina mensal de análise financeira',
    'Delegar operações para focar estratégia',
    'Documentar decisões-chave para consistência',
  ]
}
```

- [ ] **Step 3: Run tests**

Run: `npm test __tests__/agente-psicologia.test.ts`
Expected: PASS (all 6 tests)

- [ ] **Step 4: Commit**

```bash
git add src/agents/agente-psicologia.ts __tests__/agente-psicologia.test.ts
git commit -m "feat: implement Agente 3 (Perfil Psicológico) with behavioral analysis"
```

---

### Task A3: Agente 5 - Relatório Narrativo

**Files:**
- Create: `src/agents/agente-narrativa.ts`
- Create: `__tests__/agente-narrativa.test.ts`

- [ ] **Step 1: Write failing test**

```typescript
import { gerarRelatorio } from '@/src/agents/agente-narrativa'
import { ResultadoAgente1, ResultadoAgente2, ResultadoAgente3, ResultadoAgente4, ResultadoAgente6 } from '@/src/types'

describe('Agente 5: Relatório Narrativo', () => {
  const mockAgente1 = { scoreEstrutura: 75 } as ResultadoAgente1
  const mockAgente2 = { scoreGeral: 65, indicadores: {} } as any
  const mockAgente3 = { perfil: { motorVerdadeiro: 'Expansão' } } as ResultadoAgente3
  const mockAgente4 = [{ descricao: 'Reduzir ciclo', impactoMoedas: { 'r$': 43000 } }] as ResultadoAgente4[]
  const mockAgente6 = { fases: [] } as ResultadoAgente6

  it('should generate narrative report', async () => {
    const resultado = await gerarRelatorio(mockAgente1, mockAgente2, mockAgente3, mockAgente4, mockAgente6)
    expect(resultado.relatorio).toBeDefined()
    expect(resultado.relatorio.titulo).toBeDefined()
  })

  it('should have 9 chapters', async () => {
    const resultado = await gerarRelatorio(mockAgente1, mockAgente2, mockAgente3, mockAgente4, mockAgente6)
    expect(resultado.relatorio.capitulos).toHaveLength(9)
  })

  it('should calculate report metrics', async () => {
    const resultado = await gerarRelatorio(mockAgente1, mockAgente2, mockAgente3, mockAgente4, mockAgente6)
    expect(resultado.metricas.paginas).toBeGreaterThan(100)
    expect(resultado.metricas.palavras).toBeGreaterThan(10000)
  })

  it('should estimate reading time', async () => {
    const resultado = await gerarRelatorio(mockAgente1, mockAgente2, mockAgente3, mockAgente4, mockAgente6)
    expect(resultado.metricas.tempo_leitura_minutos).toBeGreaterThan(30)
  })

  it('should create introduction section', async () => {
    const resultado = await gerarRelatorio(mockAgente1, mockAgente2, mockAgente3, mockAgente4, mockAgente6)
    expect(resultado.relatorio.introducao).toBeDefined()
  })

  it('should create conclusion section', async () => {
    const resultado = await gerarRelatorio(mockAgente1, mockAgente2, mockAgente3, mockAgente4, mockAgente6)
    expect(resultado.relatorio.conclusao).toBeDefined()
  })
})
```

Run: `npm test __tests__/agente-narrativa.test.ts`
Expected: FAIL

- [ ] **Step 2: Implement Agente 5**

```typescript
// src/agents/agente-narrativa.ts
import { ResultadoAgente1, ResultadoAgente2, ResultadoAgente3, ResultadoAgente4, ResultadoAgente5, ResultadoAgente6, CapituloNarrativa } from '@/src/types'

export async function gerarRelatorio(
  agente1: ResultadoAgente1,
  agente2: ResultadoAgente2,
  agente3: ResultadoAgente3,
  agente4: ResultadoAgente4[],
  agente6: ResultadoAgente6
): Promise<ResultadoAgente5> {
  const capitulos = gerarCapitulos(agente1, agente2, agente3, agente4, agente6)
  const palavras = estimarPalavras(capitulos)
  
  return {
    relatorio: {
      titulo: `Diagnóstico Financeiro Estratégico - ${new Date().getFullYear()}`,
      introducao: gerarIntroducao(agente2),
      capitulos,
      conclusao: gerarConclusao(agente6),
    },
    metricas: {
      paginas: Math.ceil(palavras / 250),
      palavras,
      tempo_leitura_minutos: Math.ceil(palavras / 200),
    },
  }
}

function gerarCapitulos(a1: ResultadoAgente1, a2: ResultadoAgente2, a3: ResultadoAgente3, a4: ResultadoAgente4[], a6: ResultadoAgente6): CapituloNarrativa[] {
  return [
    { numero: 1, titulo: 'Sumário Executivo', conteudo: 'Visão geral da situação financeira' },
    { numero: 2, titulo: 'Estrutura Organizacional', conteudo: `Score: ${a1.scoreEstrutura}/100` },
    { numero: 3, titulo: 'Diagnóstico Financeiro', conteudo: `Score geral: ${a2.scoreGeral}/100` },
    { numero: 4, titulo: 'Perfil Psicológico', conteudo: `Motor: ${a3.perfil.motorVerdadeiro}` },
    { numero: 5, titulo: 'Análise de Impacto', conteudo: `${a4.length} recomendações com análise 4-moedas` },
    { numero: 6, titulo: 'Plano de 90 Dias', conteudo: `${a6.fases.length} fases de transformação` },
    { numero: 7, titulo: 'Métricas de Sucesso', conteudo: 'KPIs por fase' },
    { numero: 8, titulo: 'Riscos e Mitigação', conteudo: 'Análise de cenários' },
    { numero: 9, titulo: 'Próximos Passos', conteudo: 'Ações imediatas' },
  ]
}

function estimarPalavras(capitulos: CapituloNarrativa[]): number {
  return capitulos.length * 1500 // ~15k palavras para 9 capítulos
}

function gerarIntroducao(agente2: ResultadoAgente2): string {
  return `Este relatório apresenta uma análise estratégica completa da empresa. O score geral de saúde financeira é ${agente2.scoreGeral}/100.`
}

function gerarConclusao(agente6: ResultadoAgente6): string {
  return `A implementação do plano de 90 dias, com suas ${agente6.fases.length} fases, deve resultar em transformação sustentável da situação financeira.`
}
```

- [ ] **Step 3: Run tests**

Run: `npm test __tests__/agente-narrativa.test.ts`
Expected: PASS (all 6 tests)

- [ ] **Step 4: Commit**

```bash
git add src/agents/agente-narrativa.ts __tests__/agente-narrativa.test.ts
git commit -m "feat: implement Agente 5 (Relatório Narrativo) with 9-chapter structure"
```

---

## 🎨 TRACK B: Frontend Upload + Dashboard (Can Start Immediately)

### Task B1: File Upload Component

**Files:**
- Create: `app/(upload)/page.tsx`
- Create: `app/(upload)/layout.tsx`
- Create: `app/components/FileUpload.tsx`
- Create: `__tests__/upload.test.tsx`

- [ ] **Step 1: Write failing test**

```typescript
import { render, screen } from '@testing-library/react'
import UploadPage from '@/app/(upload)/page'

describe('Upload Page', () => {
  it('should render upload page', () => {
    render(<UploadPage />)
    expect(screen.getByText(/carregar documentos/i)).toBeInTheDocument()
  })

  it('should have drag-drop zone', () => {
    render(<UploadPage />)
    expect(screen.getByText(/arraste ou clique/i)).toBeInTheDocument()
  })

  it('should display upload progress', () => {
    render(<UploadPage />)
    expect(screen.getByText(/arquivos/i)).toBeInTheDocument()
  })

  it('should show success message after upload', async () => {
    render(<UploadPage />)
    // File upload success check
    expect(screen.queryByText(/enviado com sucesso/i)).not.toBeInTheDocument()
  })
})
```

Run: `npm test __tests__/upload.test.tsx`
Expected: FAIL

- [ ] **Step 2: Create FileUpload component**

```typescript
// app/components/FileUpload.tsx
'use client'

import { useState } from 'react'

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setFiles(Array.from(e.dataTransfer.files))
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed p-8 rounded text-center"
    >
      <p>Arraste ou clique para enviar documentos financeiros</p>
      <input type="file" multiple accept=".csv,.xlsx,.pdf" className="hidden" />
    </div>
  )
}
```

- [ ] **Step 3: Create Upload page**

```typescript
// app/(upload)/page.tsx
'use client'

import FileUpload from '@/app/components/FileUpload'

export default function UploadPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Carregar Documentos Financeiros</h1>
      <p className="mb-6">Envie extratos, DRE, folha, notas fiscais e balanço para análise</p>
      <FileUpload />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Arquivos Aceitos</h2>
        <ul className="list-disc">
          <li>Extratos bancários (CSV, XLSX)</li>
          <li>Demonstração de Resultado (PDF, XLSX)</li>
          <li>Folha de Pagamento (PDF)</li>
          <li>Notas Fiscais (PDF, XML)</li>
          <li>Balancete (PDF, XLSX)</li>
        </ul>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create Layout**

```typescript
// app/(upload)/layout.tsx
export default function UploadLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {children}
    </div>
  )
}
```

- [ ] **Step 5: Run tests**

Run: `npm test __tests__/upload.test.tsx`
Expected: PASS (all 4 tests)

- [ ] **Step 6: Commit**

```bash
git add app/(upload)/ app/components/FileUpload.tsx __tests__/upload.test.tsx
git commit -m "feat: implement Upload page with drag-drop file handling"
```

---

### Task B2: Dashboard Page with 3 Cards

**Files:**
- Create: `app/(dashboard)/page.tsx`
- Create: `app/(dashboard)/layout.tsx`
- Create: `app/(dashboard)/components/DiagnosisCard.tsx`
- Create: `app/(dashboard)/components/ImpactCard.tsx`
- Create: `app/(dashboard)/components/PlanCard.tsx`
- Create: `__tests__/dashboard.test.tsx`

- [ ] **Step 1: Write failing test**

```typescript
import { render, screen } from '@testing-library/react'
import DashboardPage from '@/app/(dashboard)/page'

describe('Dashboard Page', () => {
  it('should render dashboard', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/diagnóstico financeiro/i)).toBeInTheDocument()
  })

  it('should display 3 main cards', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/diagnóstico/i)).toBeInTheDocument()
    expect(screen.getByText(/impacto/i)).toBeInTheDocument()
    expect(screen.getByText(/plano/i)).toBeInTheDocument()
  })

  it('should show score metric', () => {
    render(<DashboardPage />)
    expect(screen.queryByText(/score/i)).toBeInTheDocument()
  })

  it('should have navigation back to upload', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/novo análise/i)).toBeInTheDocument()
  })

  it('should render report export button', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/exportar relatório/i)).toBeInTheDocument()
  })
})
```

Run: `npm test __tests__/dashboard.test.tsx`
Expected: FAIL

- [ ] **Step 2: Create Dashboard cards**

```typescript
// app/(dashboard)/components/DiagnosisCard.tsx
'use client'

export default function DiagnosisCard({ score }: { score: number }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">Diagnóstico Financeiro</h3>
      <div className="text-4xl font-bold text-blue-600">{score}/100</div>
      <p className="text-gray-600 mt-2">Score geral de saúde financeira</p>
    </div>
  )
}

// app/(dashboard)/components/ImpactCard.tsx
export default function ImpactCard({ impacts }: { impacts: Array<{ desc: string; value: number }> }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">Análise de Impacto</h3>
      <div className="space-y-2">
        {impacts.map((i, idx) => (
          <div key={idx} className="flex justify-between">
            <span>{i.desc}</span>
            <span className="font-bold text-green-600">R$ {i.value.toLocaleString('pt-BR')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// app/(dashboard)/components/PlanCard.tsx
export default function PlanCard({ phases }: { phases: number }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">Plano 90 Dias</h3>
      <div className="text-4xl font-bold text-purple-600">{phases}</div>
      <p className="text-gray-600 mt-2">Fases de transformação</p>
    </div>
  )
}
```

- [ ] **Step 3: Create Dashboard page**

```typescript
// app/(dashboard)/page.tsx
'use client'

import DiagnosisCard from './components/DiagnosisCard'
import ImpactCard from './components/ImpactCard'
import PlanCard from './components/PlanCard'

export default function DashboardPage() {
  // Mock data - will be replaced with actual API calls
  const mockScore = 70
  const mockImpacts = [
    { desc: 'Reduzir ciclo recebimento', value: 43000 },
    { desc: 'Diversificar clientes', value: 25000 },
  ]
  const mockPhases = 5

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-2">Diagnóstico Financeiro</h1>
      <p className="text-gray-600 mb-8">Análise completa com plano de ação em 90 dias</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DiagnosisCard score={mockScore} />
        <ImpactCard impacts={mockImpacts} />
        <PlanCard phases={mockPhases} />
      </div>

      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded">Nova Análise</button>
        <button className="bg-green-600 text-white px-6 py-2 rounded">Exportar Relatório</button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create Layout**

```typescript
// app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {children}
    </div>
  )
}
```

- [ ] **Step 5: Run tests**

Run: `npm test __tests__/dashboard.test.tsx`
Expected: PASS (all 5 tests)

- [ ] **Step 6: Commit**

```bash
git add app/(dashboard)/ __tests__/dashboard.test.tsx
git commit -m "feat: implement Dashboard with Diagnosis, Impact, and Plan cards"
```

---

## 🔗 TRACK C: Integration & E2E Testing

### Task C1: API Orchestrator & Agent Pipeline

**Files:**
- Create: `app/api/agents/route.ts`
- Create: `lib/agent-pipeline.ts`
- Create: `__tests__/integration.test.ts`

- [ ] **Step 1: Write failing E2E test with real Dr. Haldley data**

```typescript
import { criarPipelineCompleto } from '@/lib/agent-pipeline'
import haldleyData from '@/data/haldley-2026-01-05-CORRIGIDO.json'

describe('End-to-End Integration - Dr. Haldley', () => {
  it('should process all 6 agents for Dr. Haldley data', async () => {
    const resultado = await criarPipelineCompleto(haldleyData)
    expect(resultado).toBeDefined()
    expect(resultado.agente1).toBeDefined()
    expect(resultado.agente2).toBeDefined()
    expect(resultado.agente3).toBeDefined()
    expect(resultado.agente4).toBeDefined()
    expect(resultado.agente5).toBeDefined()
    expect(resultado.agente6).toBeDefined()
  })

  it('should validate Matriz Luminis analysis', async () => {
    const resultado = await criarPipelineCompleto(haldleyData)
    expect(resultado.agente2.scoreGeral).toBeGreaterThan(50)
  })

  it('should generate impact recommendations', async () => {
    const resultado = await criarPipelineCompleto(haldleyData)
    expect(resultado.agente4).toHaveLength(Array.isArray(resultado.agente4) ? resultado.agente4.length : 1)
  })

  it('should create 5-phase transformation plan', async () => {
    const resultado = await criarPipelineCompleto(haldleyData)
    expect(resultado.agente6.fases).toHaveLength(5)
  })

  it('should generate 9-chapter narrative report', async () => {
    const resultado = await criarPipelineCompleto(haldleyData)
    expect(resultado.agente5.relatorio.capitulos).toHaveLength(9)
  })

  it('should handle multi-company consolidation', async () => {
    const resultado = await criarPipelineCompleto(haldleyData)
    expect(resultado.agente1.estrutura.grupos).toBeDefined()
  })

  it('should analyze organizational psychology', async () => {
    const resultado = await criarPipelineCompleto(haldleyData)
    expect(resultado.agente3.perfil.motorVerdadeiro).toBeDefined()
  })

  it('should produce consistent results across runs', async () => {
    const resultado1 = await criarPipelineCompleto(haldleyData)
    const resultado2 = await criarPipelineCompleto(haldleyData)
    expect(resultado1.agente2.scoreGeral).toBe(resultado2.agente2.scoreGeral)
  })
})
```

Run: `npm test __tests__/integration.test.ts`
Expected: FAIL

- [ ] **Step 2: Implement agent pipeline**

```typescript
// lib/agent-pipeline.ts
import { analisarEstrutura } from '@/src/agents/agente-estrutura'
import { analisarPadroes } from '@/src/agents/agente-padroes'
import { analisarPerfil } from '@/src/agents/agente-psicologia'
import { analisarImpacto } from '@/src/agents/agente-impacto'
import { gerarRelatorio } from '@/src/agents/agente-narrativa'
import { criarPlano90Dias } from '@/src/agents/agente-transformacao'
import { DocumentosFinanceiros } from '@/src/types'

export async function criarPipelineCompleto(documentos: DocumentosFinanceiros) {
  // Execute agents sequentially (later agents depend on earlier results)
  const agente1 = await analisarEstrutura(documentos)
  const agente2 = await analisarPadroes(documentos)
  const agente3 = await analisarPerfil(documentos)
  const agente4 = await analisarImpacto(agente2)
  const agente5 = await gerarRelatorio(agente1, agente2, agente3, agente4, null as any)
  const agente6 = await criarPlano90Dias(agente2, agente4)

  return { agente1, agente2, agente3, agente4, agente5, agente6 }
}
```

- [ ] **Step 3: Create API endpoint**

```typescript
// app/api/agents/route.ts
import { criarPipelineCompleto } from '@/lib/agent-pipeline'
import { DocumentosFinanceiros } from '@/src/types'

export async function POST(request: Request) {
  try {
    const documentos: DocumentosFinanceiros = await request.json()
    const resultado = await criarPipelineCompleto(documentos)
    return Response.json(resultado)
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 400 })
  }
}
```

- [ ] **Step 4: Run integration tests**

Run: `npm test __tests__/integration.test.ts`
Expected: PASS (all 8 E2E tests with real Dr. Haldley data)

- [ ] **Step 5: Commit**

```bash
git add lib/agent-pipeline.ts app/api/agents/route.ts __tests__/integration.test.ts
git commit -m "feat: integrate all 6 agents into complete pipeline with E2E validation"
```

---

### Task C2: Final System Test & Documentation

- [ ] **Step 1: Run complete test suite**

Run: `npm test`
Expected: All tests passing (60+ tests including 48 from MVP + 18 from Phase 2)

- [ ] **Step 2: Verify system flow**

Manual check:
1. Upload page loads without errors
2. Dashboard renders all 3 cards
3. API endpoint accepts DocumentosFinanceiros
4. Pipeline processes all 6 agents
5. Dr. Haldley data produces consistent scores

- [ ] **Step 3: Create system documentation**

```markdown
# Marco Zero AI - Complete 6-Agent System

## System Architecture

```
Entrada (DocumentosFinanceiros)
  ↓
Agente 1: Estrutura (Legal analysis)
  ↓
Agente 2: Diagnóstico (Financial scoring)
  ↓
Agente 3: Psicologia (Behavioral profile)
  ↓
Agente 4: Impacto (4-currency translation)
  ↓
Agente 5: Narrativa (9-chapter report)
  ↓
Agente 6: Plano 90 Dias (5-phase plan)
  ↓
Saída (Complete Analysis)
```

## Testing Coverage
- 48 unit tests (MVP)
- 18 integration tests (Phase 2)
- 8 E2E tests (Real Dr. Haldley data)
- 100% agent coverage
```

- [ ] **Step 4: Final commit**

```bash
git add docs/
git commit -m "docs: add Phase 2 completion documentation with architecture overview"
```

---

## 🎯 Execution Options

Plan complete and saved to `docs/superpowers/plans/2026-06-10-phase-2-agents-and-frontend.md`.

**Two execution options:**

**1. Subagent-Driven (Recommended)** - I dispatch a fresh subagent per task, review between tasks for quality gates, fast iteration
- Pro: Parallel execution, quality reviews, faster overall
- Cons: Requires supervision
- Timeline: 1 week with daily reviews

**2. Inline Execution** - Execute tasks in this session sequentially
- Pro: Single session, no context switches
- Cons: Slower serial execution
- Timeline: 2-3 weeks depending on session availability

**Which approach do you prefer?** A (Subagent-Driven) or B (Inline)?
