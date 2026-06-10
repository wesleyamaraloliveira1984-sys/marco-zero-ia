'use client'

import { useState } from 'react'

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...droppedFiles])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.currentTarget.files || [])
    setFiles(prev => [...prev, ...selectedFiles])
  }

  return (
    <div className="space-y-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed p-8 rounded-lg text-center transition ${
          isDragging
            ? 'border-blue-600 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:border-blue-400'
        }`}
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Arraste ou clique para enviar documentos financeiros
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Formatos aceitos: CSV, XLSX, PDF
        </p>
        <label className="inline-block">
          <span className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-700">
            Selecionar Arquivos
          </span>
          <input
            type="file"
            multiple
            accept=".csv,.xlsx,.pdf"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Arquivos Selecionados ({files.length})
          </h3>
          <ul className="space-y-2">
            {files.map((file, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <span className="text-sm text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
