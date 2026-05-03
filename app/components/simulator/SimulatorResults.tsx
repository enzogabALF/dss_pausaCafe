'use client';

import { SimulationResult } from '@/lib/simulation';

export interface SimulatorResultsProps {
  result?: SimulationResult;
  isLoading?: boolean;
}

export function SimulatorResults({ result, isLoading }: SimulatorResultsProps) {
  if (isLoading) {
    return (
      <div className="simulator-results-stack">
        <article className="panel simulator-panel" style={{ textAlign: 'center', padding: '40px' }}>
          <p>Calculando simulación...</p>
        </article>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="simulator-results-stack">
        <article className="panel simulator-panel">
          <div className="panel-title-row">
            <h2>Análisis de Escenarios</h2>
            <span>Ejecuta la simulación para ver resultados</span>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--foreground)', marginTop: '20px' }}>
            Ingresa los parámetros y haz clic en "Ejecutar Simulación"
          </p>
        </article>
      </div>
    );
  }

  // Formatear números
  const formatCurrency = (num: number) => {
    return `$${Math.round(num).toLocaleString('es-CO')}`;
  };

  const formatPercent = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  // Determinar viabilidad basada en VAN
  const isViable = result.normal.van > 0;

  const results = [
    { label: 'VAN Normal', value: formatCurrency(result.normal.van), tone: isViable ? 'positive' : 'negative' },
    { label: 'TIR Normal', value: formatPercent(result.normal.tir), tone: result.normal.tir > 0 ? 'positive' : 'negative' },
    { label: 'Payback', value: `${result.normal.payback.toFixed(1)} meses`, tone: result.normal.payback < 24 ? 'positive' : 'neutral' },
    { label: 'Viabilidad', value: isViable ? 'Viable' : 'No viable', tone: isViable ? 'positive' : 'negative' },
  ];

  return (
    <div className="simulator-results-stack">
      <article className="panel simulator-panel simulator-results-grid">
        {results.map((r) => (
          <div className="result-card" key={r.label} data-tone={r.tone}>
            <p>{r.label}</p>
            <strong>{r.value}</strong>
          </div>
        ))}
      </article>

      <article className="panel simulator-panel">
        <div className="panel-title-row">
          <h2>Análisis de Escenarios</h2>
          <span>Resultados comparados (VAN a 24 meses)</span>
        </div>

        <div className="scenario-grid">
          <div className="scenario-card">
            <p>Favorable (+38%)</p>
            <strong>{formatCurrency(result.favorable.van)}</strong>
            <span>Payback: {result.favorable.payback.toFixed(1)} meses</span>
            <span style={{ fontSize: '0.85em', marginTop: '8px', color: 'var(--accent)' }}>
              TIR: {result.favorable.tir.toFixed(2)}%
            </span>
          </div>

          <div className="scenario-card">
            <p>Normal (+13.5%)</p>
            <strong>{formatCurrency(result.normal.van)}</strong>
            <span>Payback: {result.normal.payback.toFixed(1)} meses</span>
            <span style={{ fontSize: '0.85em', marginTop: '8px', color: 'var(--accent)' }}>
              TIR: {result.normal.tir.toFixed(2)}%
            </span>
          </div>

          <div className="scenario-card">
            <p>Desfavorable (-28%)</p>
            <strong>{formatCurrency(result.unfavorable.van)}</strong>
            <span>Payback: {result.unfavorable.payback < 100 ? result.unfavorable.payback.toFixed(1) + ' meses' : 'No recupera'}</span>
            <span style={{ fontSize: '0.85em', marginTop: '8px', color: 'var(--accent)' }}>
              TIR: {result.unfavorable.tir.toFixed(2)}%
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
