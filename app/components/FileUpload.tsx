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

  const dropZoneStyle: React.CSSProperties = {
    border: `2px dashed ${isDragging ? '#2563eb' : '#d1d5db'}`,
    backgroundColor: isDragging ? '#eff6ff' : '#f9fafb',
    padding: '32px',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '8px 24px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
  }

  const buttonHoverStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#1d4ed8',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={dropZoneStyle}
      >
        <svg
          style={{
            margin: '0 auto 16px',
            width: '48px',
            height: '48px',
            color: '#9ca3af',
          }}
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
        <p
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '8px',
          }}
        >
          Arraste ou clique para enviar documentos financeiros
        </p>
        <p
          style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px',
          }}
        >
          Formatos aceitos: CSV, XLSX, PDF
        </p>
        <label style={{ display: 'inline-block' }}>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb'
            }}
            onClick={(e) => {
              e.preventDefault()
              ;(e.currentTarget.nextElementSibling as HTMLInputElement)?.click()
            }}
          >
            Selecionar Arquivos
          </button>
          <input
            type="file"
            multiple
            accept=".csv,.xlsx,.pdf"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: '24px',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#111827',
              marginBottom: '16px',
            }}
          >
            Arquivos Selecionados ({files.length})
          </h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {files.map((file, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '4px',
                }}
              >
                <span style={{ fontSize: '14px', color: '#374151' }}>
                  {file.name}
                </span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
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
