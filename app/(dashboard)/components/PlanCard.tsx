'use client'

export default function PlanCard({ phases }: { phases: number }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">Plano 90 Dias</h3>
      <div className="text-4xl font-bold text-purple-600">{phases}</div>
      <p className="text-gray-600 mt-2">Fases de transformação</p>
    </div>
  )
}
