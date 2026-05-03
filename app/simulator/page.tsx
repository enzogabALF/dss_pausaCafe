'use client';

import { useState } from 'react';
import { SimulationInput, SimulationResult } from '@/lib/simulation';
import { Sidebar } from '../components/navigation/Sidebar';
import { InvestmentControls } from '../components/simulator/InvestmentControls';
import { RiskPanel } from '../components/simulator/RiskPanel';
import { SimulatorResults } from '../components/simulator/SimulatorResults';

export default function SimulatorPage() {
  const [result, setResult] = useState<SimulationResult | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSimulate = async (input: SimulationInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Error en la simulación');
      }

      const { data } = await response.json();
      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
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
            {error && <span style={{ color: 'red' }}>{error}</span>}
          </div>
        </header>

        <section className="simulator-layout">
          <InvestmentControls onSimulate={handleSimulate} isLoading={isLoading} />
          <SimulatorResults result={result} isLoading={isLoading} />
          <RiskPanel risks={result?.risks} />
        </section>
      </section>
    </main>
  );
}
