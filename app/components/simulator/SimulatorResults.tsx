'use client';

import { SimulationResult, SimulationInput } from '@/lib/simulation';
import { RiskAnalysis } from '@/lib/types';
import { exportResultsAsPDF, exportResultsAsCSV } from '@/lib/export-utils';
import { useState } from 'react';

export interface SimulatorResultsProps {
  result?: SimulationResult;
  isLoading?: boolean;
  input?: SimulationInput;
  risks?: RiskAnalysis;
}

export function SimulatorResults({ result, isLoading, input, risks }: SimulatorResultsProps) {
  const [exportingPDF, setExportingPDF] = useState(false);
  const [exportingCSV, setExportingCSV] = useState(false);

  const handleExportPDF = async () => {
    if (!result || !input || !risks) return;
    setExportingPDF(true);
    try {
      await exportResultsAsPDF(result, risks, {
        investment: input.initialInvestment,
        costPercent: input.costPerOrder,
        dailyOrders: input.dailyOrders,
        averageTicket: input.averageTicket,
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setExportingPDF(false);
    }
  };

  const handleExportCSV = () => {
    if (!result || !input || !risks) return;
    setExportingCSV(true);
    try {
      exportResultsAsCSV(result, risks, {
        investment: input.initialInvestment,
        costPercent: input.costPerOrder,
        dailyOrders: input.dailyOrders,
        averageTicket: input.averageTicket,
      });
    } catch (error) {
      console.error('Error exporting CSV:', error);
    } finally {
      setExportingCSV(false);
    }
  };

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

      {result && input && risks && (
        <article className="panel simulator-panel">
          <div className="panel-title-row">
            <h2>Exportar Resultados</h2>
            <span>Descarga tu análisis en PDF o CSV</span>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              onClick={handleExportPDF}
              disabled={exportingPDF}
              className="export-button export-button-pdf"
              style={{
                padding: '10px 16px',
                backgroundColor: exportingPDF ? '#888' : 'hsl(var(--accent))',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: exportingPDF ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '0.9em',
                transition: 'all 0.3s ease',
              }}
            >
              {exportingPDF ? '⏳ Generando PDF...' : '📄 Descargar PDF'}
            </button>
            
            <button
              onClick={handleExportCSV}
              disabled={exportingCSV}
              className="export-button export-button-csv"
              style={{
                padding: '10px 16px',
                backgroundColor: exportingCSV ? '#888' : '#22c55e',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: exportingCSV ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '0.9em',
                transition: 'all 0.3s ease',
              }}
            >
              {exportingCSV ? '⏳ Generando CSV...' : '📊 Descargar CSV'}
            </button>
          </div>
        </article>
      )}
    </div>
  );
}
