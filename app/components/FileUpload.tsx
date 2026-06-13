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

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.currentTarget.files || [])
    setFiles(prev => [...prev, ...selectedFiles])
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: isDragging ? '2px solid #2563eb' : '2px dashed #d1d5db',
          backgroundColor: isDragging ? '#eff6ff' : '#f9fafb',
          padding: '40px 20px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
            Arraste documentos aqui
          </p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            ou clique para selecionar
          </p>
        </div>

        <input
          type="file"
          id="file-input"
          multiple
          accept=".csv,.xlsx,.pdf"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        <button
          onClick={() => document.getElementById('file-input')?.click()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Selecionar Arquivos
        </button>
      </div>

      {files.length > 0 && (
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '12px' }}>Arquivos ({files.length})</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {files.map((f, i) => (
              <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                {f.name} - {(f.size / 1024).toFixed(2)} KB
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
