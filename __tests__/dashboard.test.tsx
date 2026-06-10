import { render, screen } from '@testing-library/react'
import DashboardPage from '@/app/(dashboard)/page'

describe('Dashboard Page', () => {
  it('should render dashboard', () => {
    render(<DashboardPage />)
    expect(screen.getAllByText(/diagnóstico financeiro/i).length).toBeGreaterThan(0)
  })

  it('should display 3 main cards', () => {
    render(<DashboardPage />)
    expect(screen.getAllByText(/diagnóstico/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/análise de impacto/i)).toBeInTheDocument()
    expect(screen.getByText(/plano 90 dias/i)).toBeInTheDocument()
  })

  it('should show score metric', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/score geral de saúde financeira/i)).toBeInTheDocument()
  })

  it('should have navigation back to upload', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/nova análise/i)).toBeInTheDocument()
  })

  it('should render report export button', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/exportar relatório/i)).toBeInTheDocument()
  })
})
