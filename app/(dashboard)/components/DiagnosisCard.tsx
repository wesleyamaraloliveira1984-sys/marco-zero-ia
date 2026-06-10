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
