'use client'

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
