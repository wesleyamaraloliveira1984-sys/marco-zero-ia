'use client'

import FileUpload from '@/app/components/FileUpload'

export default function UploadPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
          Carregar Documentos Financeiros
        </h1>
        <p style={{ fontSize: '18px', color: '#666' }}>
          Envie extratos, DRE, folha, notas fiscais e balanço para análise completa da saúde financeira da sua empresa.
        </p>
      </div>

      <FileUpload />

      <div style={{ marginTop: '48px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
          Arquivos Aceitos
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ color: 'green', fontWeight: 'bold', marginRight: '12px' }}>✓</span>
            <span style={{ color: '#374151' }}>
              <strong>Extratos Bancários:</strong> CSV, XLSX
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ color: 'green', fontWeight: 'bold', marginRight: '12px' }}>✓</span>
            <span style={{ color: '#374151' }}>
              <strong>Demonstração de Resultado (DRE):</strong> PDF, XLSX
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ color: 'green', fontWeight: 'bold', marginRight: '12px' }}>✓</span>
            <span style={{ color: '#374151' }}>
              <strong>Folha de Pagamento:</strong> PDF
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ color: 'green', fontWeight: 'bold', marginRight: '12px' }}>✓</span>
            <span style={{ color: '#374151' }}>
              <strong>Notas Fiscais:</strong> PDF, XML
            </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ color: 'green', fontWeight: 'bold', marginRight: '12px' }}>✓</span>
            <span style={{ color: '#374151' }}>
              <strong>Balancete:</strong> PDF, XLSX
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
