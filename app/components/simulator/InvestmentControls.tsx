'use client';

import { useState } from 'react';
import { SimulationInput } from '@/lib/simulation';
import { SimulationInputSchema } from '@/lib/validations';

export interface InvestmentControlsProps {
  onSimulate: (input: SimulationInput) => void;
  isLoading?: boolean;
  fieldErrors?: Record<string, string>;
}

export function InvestmentControls({ onSimulate, isLoading = false, fieldErrors = {} }: InvestmentControlsProps) {
  const [investment, setInvestment] = useState(800000);
  const [costPercent, setCostPercent] = useState(20);
  const [dailyOrders, setDailyOrders] = useState(50);
  const [averageTicket, setAverageTicket] = useState(10000);
  const [hasChanged, setHasChanged] = useState(false);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const handleChange = (setter: any, value: number) => {
    setter(value);
    setHasChanged(true);
    // Limpiar errores locales al cambiar
    setLocalErrors({});
  };

  const handleSimulate = () => {
    const input = {
      initialInvestment: investment,
      costPerOrder: costPercent,
      dailyOrders: dailyOrders,
      averageTicket: averageTicket,
    };

    // Validar localmente antes de enviar
    const validation = SimulationInputSchema.safeParse(input);
    
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((err: any) => {
        const field = String(err.path[0]);
        errors[field] = err.message;
      });
      setLocalErrors(errors);
      return;
    }

    setLocalErrors({});
    onSimulate(input);
    setHasChanged(false);
  };

  const handleReset = () => {
    setInvestment(800000);
    setCostPercent(20);
    setDailyOrders(50);
    setAverageTicket(10000);
    setHasChanged(false);
  };

  const controls = [
    {
      label: 'Inversión inicial',
      field: 'initialInvestment',
      value: `$${investment.toLocaleString('es-CO')}`,
      min: '$100.000',
      max: '$10.000.000',
      onChange: (val: number) => handleChange(setInvestment, val),
      min_val: 100000,
      max_val: 10000000,
    },
    {
      label: 'Costo por pedido',
      field: 'costPerOrder',
      value: `${costPercent}%`,
      min: '1%',
      max: '100%',
      onChange: (val: number) => handleChange(setCostPercent, val),
      min_val: 1,
      max_val: 100,
    },
    {
      label: 'Pedidos diarios',
      field: 'dailyOrders',
      value: `${dailyOrders} pedidos`,
      min: '1',
      max: '500',
      onChange: (val: number) => handleChange(setDailyOrders, val),
      min_val: 1,
      max_val: 500,
    },
    {
      label: 'Ticket promedio',
      field: 'averageTicket',
      value: `$${averageTicket.toLocaleString('es-CO')}`,
      min: '$1.000',
      max: '$100.000',
      onChange: (val: number) => handleChange(setAverageTicket, val),
      min_val: 1000,
      max_val: 100000,
    },
  ];

  const mergedErrors = { ...fieldErrors, ...localErrors };
  const hasErrors = Object.keys(mergedErrors).length > 0;

  return (
    <article className="panel simulator-panel">
      <div className="panel-title-row">
        <h2>Simulador de Inversión</h2>
        <span>Parámetros de entrada</span>
      </div>

      <div className="simulator-controls">
        {controls.map((control: any) => {
          const hasError = !!mergedErrors[control.field];
          return (
            <label 
              className="simulator-control" 
              key={control.label}
              style={{
                borderColor: hasError ? '#ef4444' : undefined,
                backgroundColor: hasError ? 'rgba(239, 68, 68, 0.05)' : undefined,
              }}
            >
              <div className="simulator-control-header">
                <strong>
                  {control.label}
                  {hasError && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
                </strong>
                <span style={{ color: hasError ? '#ef4444' : (hasChanged ? 'var(--accent)' : 'var(--foreground)') }}>
                  {control.value}
                </span>
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
                style={{
                  borderColor: hasError ? '#ef4444' : undefined,
                }}
              />
              <div className="simulator-control-meta">
                <span>{control.min}</span>
                <span>{control.max}</span>
              </div>
              {hasError && (
                <div style={{
                  marginTop: '6px',
                  fontSize: '0.75em',
                  color: '#ef4444',
                  fontWeight: '500',
                }}>
                  ⚠️ {mergedErrors[control.field]}
                </div>
              )}
            </label>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button
          onClick={handleSimulate}
          disabled={isLoading || hasErrors}
          className="simulator-button"
          style={{
            padding: '12px 24px',
            backgroundColor: (isLoading || hasErrors) ? '#999' : 'var(--accent)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: (isLoading || hasErrors) ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            flex: 1,
            transition: 'all 0.3s ease',
            opacity: (isLoading || hasErrors) ? 0.6 : 1,
          }}
          title={hasErrors ? 'Corrige los errores de validación' : ''}
        >
          {isLoading ? '⏳ Simulando...' : '▶ Ejecutar Simulación'}
        </button>
        <button
          onClick={handleReset}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: 'var(--accent)',
            border: '2px solid var(--accent)',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          ↻ Reset
        </button>
      </div>

      {hasErrors && (
        <div
          style={{
            marginTop: '12px',
            padding: '8px 12px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderLeft: '3px solid #ef4444',
            fontSize: '0.85em',
            color: '#ef4444',
          }}
        >
          ⚠️ Por favor, corrige los errores antes de continuar
        </div>
      )}

      {hasChanged && !hasErrors && (
        <div
          style={{
            marginTop: '12px',
            padding: '8px 12px',
            backgroundColor: 'rgba(245, 162, 76, 0.1)',
            borderLeft: '3px solid var(--accent)',
            fontSize: '0.85em',
            color: 'var(--accent)',
          }}
        >
          ⚡ Los parámetros cambiaron - haz clic en "Ejecutar Simulación" para actualizar
        </div>
      )}

      <div className="simulator-note">
        La simulación muestra VAN, TIR, payback y viabilidad con tres escenarios.
      </div>
    </article>
  );
}
