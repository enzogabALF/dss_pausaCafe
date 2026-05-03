'use client';

import { useState } from 'react';
import { SimulationInput } from '@/lib/simulation';

export interface InvestmentControlsProps {
  onSimulate: (input: SimulationInput) => void;
  isLoading?: boolean;
}

export function InvestmentControls({ onSimulate, isLoading = false }: InvestmentControlsProps) {
  const [investment, setInvestment] = useState(800000);
  const [costPercent, setCostPercent] = useState(20);
  const [dailyOrders, setDailyOrders] = useState(50);
  const [averageTicket, setAverageTicket] = useState(10000);

  const handleSimulate = () => {
    onSimulate({
      initialInvestment: investment,
      costPerOrder: costPercent,
      dailyOrders: dailyOrders,
      averageTicket: averageTicket,
    });
  };

  const controls = [
    {
      label: 'Inversión inicial',
      value: `$${investment.toLocaleString('es-CO')}`,
      min: '$400.000',
      max: '$1.500.000',
      percent: ((investment - 400000) / (1500000 - 400000)) * 100,
      onChange: setInvestment,
      min_val: 400000,
      max_val: 1500000,
    },
    {
      label: 'Costo por pedido',
      value: `${costPercent}%`,
      min: '10%',
      max: '30%',
      percent: ((costPercent - 10) / (30 - 10)) * 100,
      onChange: setCostPercent,
      min_val: 10,
      max_val: 30,
    },
    {
      label: 'Pedidos diarios',
      value: `${dailyOrders} pedidos`,
      min: '30',
      max: '80',
      percent: ((dailyOrders - 30) / (80 - 30)) * 100,
      onChange: setDailyOrders,
      min_val: 30,
      max_val: 80,
    },
    {
      label: 'Ticket promedio',
      value: `$${averageTicket.toLocaleString('es-CO')}`,
      min: '$8.000',
      max: '$12.000',
      percent: ((averageTicket - 8000) / (12000 - 8000)) * 100,
      onChange: setAverageTicket,
      min_val: 8000,
      max_val: 12000,
    },
  ];

  return (
    <article className="panel simulator-panel">
      <div className="panel-title-row">
        <h2>Simulador de Inversión</h2>
        <span>Parámetros de entrada</span>
      </div>

      <div className="simulator-controls">
        {controls.map((control: any) => (
          <label className="simulator-control" key={control.label}>
            <div className="simulator-control-header">
              <strong>{control.label}</strong>
              <span>{control.value}</span>
            </div>
            <input
              type="range"
              min={control.min_val}
              max={control.max_val}
              value={
                control.label === 'Inversión inicial'
                  ? investment
                  : control.label === 'Costo por pedido'
                    ? costPercent
                    : control.label === 'Pedidos diarios'
                      ? dailyOrders
                      : averageTicket
              }
              onChange={(e) => control.onChange(Number(e.target.value))}
              aria-label={control.label}
            />
            <div className="simulator-control-meta">
              <span>{control.min}</span>
              <span>{control.max}</span>
            </div>
          </label>
        ))}
      </div>

      <button
        onClick={handleSimulate}
        disabled={isLoading}
        className="simulator-button"
        style={{
          padding: '12px 24px',
          backgroundColor: isLoading ? '#999' : 'var(--accent)',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          marginTop: '16px',
          width: '100%',
        }}
      >
        {isLoading ? 'Simulando...' : 'Ejecutar Simulación'}
      </button>

      <div className="simulator-note">
        La simulación muestra VAN, TIR, payback y viabilidad con tres escenarios.
      </div>
    </article>
  );
}
