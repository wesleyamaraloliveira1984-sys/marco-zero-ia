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
