'use client';

import { SimulationResult, SimulationInput } from '@/lib/simulation';
import { RiskAnalysis } from '@/lib/types';
import { exportResultsAsPDF, exportResultsAsCSV, buildReportMetadata, recordReportHistory } from '@/lib/export-utils';
import { useEffect, useState } from 'react';
import { SavedScenariosPanel, type SavedScenarioItem } from './SavedScenariosPanel';
import { ReportHistoryPanel } from '../reports/ReportHistoryPanel';

export interface SimulatorResultsProps {
  result?: SimulationResult;
  isLoading?: boolean;
  input?: SimulationInput;
  risks?: RiskAnalysis;
  onLoadScenario?: (scenario: SavedScenarioItem) => void;
}

const SAVED_SCENARIOS_KEY = 'dss-pausa-cafe.saved-scenarios';

function buildScenarioName(index: number, input: SimulationInput) {
  return `Escenario ${index + 1} • $${input.initialInvestment.toLocaleString('es-CO')}`;
}

function buildScenarioNameFromInput(input: SimulationInput) {
  return `Escenario $${input.initialInvestment.toLocaleString('es-CO')}`;
}

function isSameInput(a: SimulationInput, b: SimulationInput) {
  return (
    a.initialInvestment === b.initialInvestment &&
    a.costPerOrder === b.costPerOrder &&
    a.dailyOrders === b.dailyOrders &&
    a.averageTicket === b.averageTicket
  );
}

export function SimulatorResults({ result, isLoading, input, risks, onLoadScenario }: SimulatorResultsProps) {
  const [exportingPDF, setExportingPDF] = useState(false);
  const [exportingCSV, setExportingCSV] = useState(false);
  const [savedScenarios, setSavedScenarios] = useState<SavedScenarioItem[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    try {
      const rawScenarios = window.localStorage.getItem(SAVED_SCENARIOS_KEY);
      if (rawScenarios) {
        const parsed = JSON.parse(rawScenarios) as SavedScenarioItem[];
        if (Array.isArray(parsed)) {
          setSavedScenarios(parsed);
        }
      }
    } catch (error) {
      console.error('No se pudieron cargar los escenarios guardados:', error);
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }

    window.localStorage.setItem(SAVED_SCENARIOS_KEY, JSON.stringify(savedScenarios));
  }, [savedScenarios, storageReady]);

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
      await recordReportHistory(
        buildReportMetadata('pdf', {
          input,
          title: `Reporte PDF de simulación ${input.initialInvestment.toLocaleString('es-CO')}`,
          persisted: true,
          source: 'demo',
        })
      );
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setExportingPDF(false);
    }
  };

  const handleExportCSV = async () => {
    if (!result || !input || !risks) return;
    setExportingCSV(true);
    try {
      exportResultsAsCSV(result, risks, {
        investment: input.initialInvestment,
        costPercent: input.costPerOrder,
        dailyOrders: input.dailyOrders,
        averageTicket: input.averageTicket,
      });
      await recordReportHistory(
        buildReportMetadata('csv', {
          input,
          title: `Reporte CSV de simulación ${input.initialInvestment.toLocaleString('es-CO')}`,
          persisted: true,
          source: 'demo',
        })
      );
    } catch (error) {
      console.error('Error exporting CSV:', error);
    } finally {
      setExportingCSV(false);
    }
  };

  const handleSaveScenario = () => {
    if (!result || !input) {
      return;
    }

    const savedAt = new Date().toISOString();
    const scenarioId = `${input.initialInvestment}-${input.costPerOrder}-${input.dailyOrders}-${input.averageTicket}`;

    setSavedScenarios((current) => {
      const nextScenario: SavedScenarioItem = {
        id: scenarioId,
        name: buildScenarioName(current.length, input),
        savedAt,
        input,
        result,
      };

      const withoutDuplicate = current.filter((scenario) => !isSameInput(scenario.input, input));
      return [nextScenario, ...withoutDuplicate].slice(0, 6);
    });
  };

  const handleRenameScenario = (scenarioId: string, name: string) => {
    setSavedScenarios((current) =>
      current.map((scenario) =>
        scenario.id === scenarioId
          ? { ...scenario, name: name.trim() || buildScenarioNameFromInput(scenario.input) }
          : scenario
      )
    );
  };

  const handleDeleteScenario = (scenarioId: string) => {
    setSavedScenarios((current) => current.filter((scenario) => scenario.id !== scenarioId));
  };

  if (isLoading) {
    return (
      <div className="simulator-results-stack">
        <article className="panel simulator-panel simulator-loading-panel">
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
          <p className="simulator-empty-state">
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
            <span className="scenario-card-note">
              TIR: {result.favorable.tir.toFixed(2)}%
            </span>
          </div>

          <div className="scenario-card">
            <p>Normal (+13.5%)</p>
            <strong>{formatCurrency(result.normal.van)}</strong>
            <span>Payback: {result.normal.payback.toFixed(1)} meses</span>
            <span className="scenario-card-note">
              TIR: {result.normal.tir.toFixed(2)}%
            </span>
          </div>

          <div className="scenario-card">
            <p>Desfavorable (-28%)</p>
            <strong>{formatCurrency(result.unfavorable.van)}</strong>
            <span>Payback: {result.unfavorable.payback < 100 ? result.unfavorable.payback.toFixed(1) + ' meses' : 'No recupera'}</span>
            <span className="scenario-card-note">
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
          
          <div className="simulator-export-actions">
            <button
              onClick={handleExportPDF}
              disabled={exportingPDF}
              className={`simulator-export-button simulator-export-button--pdf ${exportingPDF ? 'is-disabled' : ''}`}
            >
              {exportingPDF ? '⏳ Generando PDF...' : '📄 Descargar PDF'}
            </button>
            
            <button
              onClick={handleExportCSV}
              disabled={exportingCSV}
              className={`simulator-export-button simulator-export-button--csv ${exportingCSV ? 'is-disabled' : ''}`}
            >
              {exportingCSV ? '⏳ Generando CSV...' : '📊 Descargar CSV'}
            </button>
          </div>
        </article>
      )}

      {result && input && (
        <SavedScenariosPanel
          currentInput={input}
          currentResult={result}
          savedScenarios={savedScenarios}
          onSaveCurrent={handleSaveScenario}
          onLoadScenario={(scenario) => onLoadScenario?.(scenario)}
          onRenameScenario={handleRenameScenario}
          onDeleteScenario={handleDeleteScenario}
        />
      )}

      <ReportHistoryPanel />
    </div>
  );
}
