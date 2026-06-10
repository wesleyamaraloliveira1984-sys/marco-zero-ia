'use client'

import FileUpload from '@/app/components/FileUpload'

export default function UploadPage() {
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Carregar Documentos Financeiros
        </h1>
        <p className="text-lg text-gray-600">
          Envie extratos, DRE, folha, notas fiscais e balanço para análise completa
          da saúde financeira da sua empresa.
        </p>
      </div>

      <FileUpload />

      <div className="mt-12 bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Arquivos Aceitos
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700">
              <strong>Extratos Bancários:</strong> CSV, XLSX
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700">
              <strong>Demonstração de Resultado (DRE):</strong> PDF, XLSX
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700">
              <strong>Folha de Pagamento:</strong> PDF
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700">
              <strong>Notas Fiscais:</strong> PDF, XML
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700">
              <strong>Balancete:</strong> PDF, XLSX
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
