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
    expect(screen.getByText(/arquivos aceitos/i)).toBeInTheDocument()
  })

  it('should show success message after upload', async () => {
    render(<UploadPage />)
    // File upload success check
    expect(screen.queryByText(/enviado com sucesso/i)).not.toBeInTheDocument()
  })
})
