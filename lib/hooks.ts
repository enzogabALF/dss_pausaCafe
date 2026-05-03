import { useState, useCallback } from 'react';
import { SimulationInput, SimulationResult } from '@/lib/simulation';

interface UseSimulationReturn {
  loading: boolean;
  error: string | null;
  result: SimulationResult | null;
  runSimulation: (input: SimulationInput) => Promise<void>;
}

/**
 * Hook para ejecutar simulaciones desde el frontend
 */
export function useSimulation(): UseSimulationReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const runSimulation = useCallback(async (input: SimulationInput) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/simulations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const { data } = await response.json();
      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      console.error('Error en simulación:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, result, runSimulation };
}

interface UseKpiReturn {
  loading: boolean;
  error: string | null;
  kpi: any | null;
  fetchKpi: () => Promise<void>;
}

/**
 * Hook para obtener KPIs desde el frontend
 */
export function useKpi(): UseKpiReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kpi, setKpi] = useState<any | null>(null);

  const fetchKpi = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/kpi');

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const { data } = await response.json();
      setKpi(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      setError(message);
      console.error('Error obteniendo KPI:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, kpi, fetchKpi };
}
