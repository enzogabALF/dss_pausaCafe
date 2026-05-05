'use client';

import type { SimulationInput, SimulationResult } from '@/lib/simulation';
import { useMemo } from 'react';

export interface SavedScenarioItem {
  id: string;
  name: string;
  savedAt: string;
  input: SimulationInput;
  result: SimulationResult;
}

interface SavedScenariosPanelProps {
  currentInput?: SimulationInput;
  currentResult?: SimulationResult;
  savedScenarios: SavedScenarioItem[];
  onSaveCurrent: () => void;
  onLoadScenario: (scenario: SavedScenarioItem) => void;
  onRenameScenario: (id: string, name: string) => void;
  onDeleteScenario: (id: string) => void;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function SavedScenariosPanel({
  currentInput,
  currentResult,
  savedScenarios,
  onSaveCurrent,
  onLoadScenario,
  onRenameScenario,
  onDeleteScenario,
}: SavedScenariosPanelProps) {
  const summary = useMemo(() => {
    if (!currentInput || !currentResult) {
      return null;
    }

    return `Normal • VAN $${Math.round(currentResult.normal.van).toLocaleString('es-CO')} · TIR ${currentResult.normal.tir.toFixed(2)}%`;
  }, [currentInput, currentResult]);

  return (
    <article className="panel simulator-panel">
      <div className="panel-title-row">
        <h2>Escenarios guardados</h2>
        <span>Reutiliza simulaciones previas sin volver a configurar todo</span>
      </div>

      <div className="saved-scenarios-toolbar">
        <button onClick={onSaveCurrent} className="saved-scenario-button saved-scenario-button--primary" type="button">
          Guardar escenario actual
        </button>

        {summary && <span className="saved-scenarios-summary">{summary}</span>}
      </div>

      <div className="saved-scenarios-list">
        {savedScenarios.length === 0 ? (
          <p className="saved-scenarios-empty">
            Aún no hay escenarios guardados. Ejecuta una simulación y usa el botón de guardado para reutilizarla después.
          </p>
        ) : (
          savedScenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onLoadScenario={onLoadScenario}
              onRenameScenario={onRenameScenario}
              onDeleteScenario={onDeleteScenario}
            />
          ))
        )}
      </div>
    </article>
  );
}

function ScenarioCard({
  scenario,
  onLoadScenario,
  onRenameScenario,
  onDeleteScenario,
}: {
  scenario: SavedScenarioItem;
  onLoadScenario: (scenario: SavedScenarioItem) => void;
  onRenameScenario: (id: string, name: string) => void;
  onDeleteScenario: (id: string) => void;
}) {
  return (
    <div className="saved-scenario-card">
      <div className="saved-scenario-header">
        <div>
          <input
            className="saved-scenario-name-input"
            defaultValue={scenario.name}
            placeholder="Nombre del escenario"
            title="Editar nombre del escenario"
            onBlur={(event) => onRenameScenario(scenario.id, event.currentTarget.value)}
          />
          <p className="saved-scenario-date">Guardado el {formatDateTime(scenario.savedAt)}</p>
        </div>
        <span className="saved-scenario-van">VAN normal: ${Math.round(scenario.result.normal.van).toLocaleString('es-CO')}</span>
      </div>

      <div className="saved-scenario-tags">
        <span>Inversión: ${scenario.input.initialInvestment.toLocaleString('es-CO')}</span>
        <span>Pedidos: {scenario.input.dailyOrders}</span>
        <span>Ticket: ${scenario.input.averageTicket.toLocaleString('es-CO')}</span>
        <span>Costo: {scenario.input.costPerOrder}%</span>
      </div>

      <div className="saved-scenario-button-group">
        <button type="button" onClick={() => onLoadScenario(scenario)} className="saved-scenario-button saved-scenario-button--ghost">
          Reutilizar
        </button>
        <button type="button" onClick={() => onDeleteScenario(scenario.id)} className="saved-scenario-button saved-scenario-button--danger">
          Eliminar
        </button>
      </div>
    </div>
  );
}
