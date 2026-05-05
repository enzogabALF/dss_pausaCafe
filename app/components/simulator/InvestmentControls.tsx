'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { SimulationInput } from '@/lib/simulation';
import { SimulationInputSchema } from '@/lib/validations';

export interface InvestmentControlsProps {
  onSimulate: (input: SimulationInput) => void;
  isLoading?: boolean;
  fieldErrors?: Record<string, string>;
  initialValues?: SimulationInput;
}

const DEFAULT_VALUES: SimulationInput = {
  initialInvestment: 800000,
  costPerOrder: 20,
  dailyOrders: 50,
  averageTicket: 10000,
};

export function InvestmentControls({
  onSimulate,
  isLoading = false,
  fieldErrors = {},
  initialValues,
}: InvestmentControlsProps) {
  const [investment, setInvestment] = useState(initialValues?.initialInvestment ?? DEFAULT_VALUES.initialInvestment);
  const [costPercent, setCostPercent] = useState(initialValues?.costPerOrder ?? DEFAULT_VALUES.costPerOrder);
  const [dailyOrders, setDailyOrders] = useState(initialValues?.dailyOrders ?? DEFAULT_VALUES.dailyOrders);
  const [averageTicket, setAverageTicket] = useState(initialValues?.averageTicket ?? DEFAULT_VALUES.averageTicket);
  const [hasChanged, setHasChanged] = useState(false);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!initialValues) {
      return;
    }

    setInvestment(initialValues.initialInvestment);
    setCostPercent(initialValues.costPerOrder);
    setDailyOrders(initialValues.dailyOrders);
    setAverageTicket(initialValues.averageTicket);
    setHasChanged(false);
    setLocalErrors({});
  }, [initialValues]);

  const handleChange = (setter: Dispatch<SetStateAction<number>>, value: number) => {
    setter(value);
    setHasChanged(true);
    setLocalErrors({});
  };

  const handleSimulate = () => {
    const input = {
      initialInvestment: investment,
      costPerOrder: costPercent,
      dailyOrders: dailyOrders,
      averageTicket: averageTicket,
    };

    const validation = SimulationInputSchema.safeParse(input);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
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
        {controls.map((control) => {
          const hasError = !!mergedErrors[control.field];
          return (
            <label className={`simulator-control ${hasError ? 'is-error' : ''}`} key={control.label}>
              <div className="simulator-control-header">
                <strong>
                  {control.label}
                  {hasError && <span className="simulator-control-required">*</span>}
                </strong>
                <span
                  className={`simulator-control-value ${hasError ? 'has-error' : hasChanged ? 'is-dirty' : ''}`}
                >
                  {control.value}
                </span>
              </div>
              <input
                type="range"
                min={control.min_val}
                max={control.max_val}
                className={`simulator-control-input ${hasError ? 'has-error' : ''}`}
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
              {hasError && (
                <div className="simulator-control-error">
                  ⚠️ {mergedErrors[control.field]}
                </div>
              )}
            </label>
          );
        })}
      </div>

      <div className="simulator-controls-actions">
        <button
          onClick={handleSimulate}
          disabled={isLoading || hasErrors}
          className={`simulator-action-button primary ${isLoading || hasErrors ? 'is-disabled' : ''}`}
          title={hasErrors ? 'Corrige los errores de validación' : ''}
        >
          {isLoading ? '⏳ Simulando...' : '▶ Ejecutar Simulación'}
        </button>
        <button
          onClick={handleReset}
          disabled={isLoading}
          className={`simulator-action-button secondary ${isLoading ? 'is-disabled' : ''}`}
        >
          ↻ Reset
        </button>
      </div>

      {hasErrors && (
        <div className="simulator-validation-message">
          ⚠️ Por favor, corrige los errores antes de continuar
        </div>
      )}

      {hasChanged && !hasErrors && (
        <div className="simulator-change-message">
          ⚡ Los parámetros cambiaron - haz clic en "Ejecutar Simulación" para actualizar
        </div>
      )}

      <div className="simulator-note">
        La simulación muestra VAN, TIR, payback y viabilidad con tres escenarios.
      </div>
    </article>
  );
}
