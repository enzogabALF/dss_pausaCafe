'use client';

import { useState } from 'react';
import { SimulationInput, SimulationResult } from '@/lib/simulation';
import { Sidebar } from '../components/navigation/Sidebar';
import { InvestmentControls } from '../components/simulator/InvestmentControls';
import { RiskPanel } from '../components/simulator/RiskPanel';
import { SimulatorResults } from '../components/simulator/SimulatorResults';
import type { SavedScenario } from '../components/simulator/SimulatorResults';

export default function SimulatorPage() {
  const [result, setResult] = useState<SimulationResult | undefined>();
  const [lastInput, setLastInput] = useState<SimulationInput | undefined>();
  const [presetInput, setPresetInput] = useState<SimulationInput | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSimulate = async (input: SimulationInput) => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await fetch('/api/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        // Si hay errores de validación
        if (data.errors && typeof data.errors === 'object') {
          setFieldErrors(data.errors);
          setError(data.error || 'Validación fallida');
        } else {
          setError(data.error || 'Error en la simulación');
        }
        return;
      }

      setResult(data.data);
      setLastInput(input);
      setPresetInput(input);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadScenario = (scenario: SavedScenario) => {
    setResult(scenario.result);
    setLastInput(scenario.input);
    setPresetInput(scenario.input);
    setError(null);
    setFieldErrors({});
  };

  return (
    <main className="app-shell">
      <Sidebar />

      <section className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-kicker">CafeDecide • Pausa Cafe</p>
            <h1>Simulador de Inversión</h1>
            <p className="dashboard-subtitle">
              Evalúa VAN, TIR, payback y riesgos antes de tomar una decisión.
            </p>
          </div>

          <div className="dashboard-header-actions">
            <span className="status-pill">Última actualización: Hoy, 14:30</span>
            {error && <span className="simulator-error-pill">{error}</span>}
          </div>
        </header>

        <section className="simulator-layout">
          <InvestmentControls
            onSimulate={handleSimulate}
            isLoading={isLoading}
            fieldErrors={fieldErrors}
            initialValues={presetInput}
          />
          <SimulatorResults
            result={result}
            isLoading={isLoading}
            input={lastInput}
            risks={result?.risks}
            onLoadScenario={handleLoadScenario}
          />
          <RiskPanel risks={result?.risks} />
        </section>
      </section>
    </main>
  );
}
