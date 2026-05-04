import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InvestmentControls } from '../app/components/simulator/InvestmentControls';

describe('InvestmentControls Component', () => {
  it('should render all input sliders', () => {
    const mockOnSimulate = vi.fn();
    render(<InvestmentControls onSimulate={mockOnSimulate} />);
    
    expect(screen.getByText('Inversión inicial')).toBeInTheDocument();
    expect(screen.getByText('Costo por pedido')).toBeInTheDocument();
    expect(screen.getByText('Pedidos diarios')).toBeInTheDocument();
    expect(screen.getByText('Ticket promedio')).toBeInTheDocument();
  });

  it('should display loading state when isLoading is true', () => {
    const mockOnSimulate = vi.fn();
    render(<InvestmentControls onSimulate={mockOnSimulate} isLoading={true} />);
    
    const simulateButton = screen.getByText('⏳ Simulando...');
    expect(simulateButton).toBeDisabled();
  });

  it('should trigger onSimulate with correct parameters when clicked', () => {
    const mockOnSimulate = vi.fn();
    render(<InvestmentControls onSimulate={mockOnSimulate} />);
    
    const simulateButton = screen.getByText('▶ Ejecutar Simulación');
    fireEvent.click(simulateButton);
    
    expect(mockOnSimulate).toHaveBeenCalledWith({
      initialInvestment: 800000,
      costPerOrder: 20,
      dailyOrders: 50,
      averageTicket: 10000,
    });
  });

  it('should show validation error message if user enters invalid range locally', () => {
    const mockOnSimulate = vi.fn();
    render(<InvestmentControls onSimulate={mockOnSimulate} fieldErrors={{ initialInvestment: 'Error de inversión' }} />);
    
    // Test that external errors block submission or show message
    expect(screen.getByText('⚠️ Error de inversión')).toBeInTheDocument();
    expect(screen.getByText('⚠️ Por favor, corrige los errores antes de continuar')).toBeInTheDocument();
    
    const simulateButton = screen.getByText('▶ Ejecutar Simulación');
    expect(simulateButton).toBeDisabled();
  });
});
