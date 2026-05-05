import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runSimulation, type SimulationInput } from '../lib/simulation';
import { SimulatorResults } from '../app/components/simulator/SimulatorResults';

const STORAGE_KEY = 'dss-pausa-cafe.saved-scenarios';

describe('SimulatorResults Component', () => {
  const input: SimulationInput = {
    initialInvestment: 800000,
    costPerOrder: 20,
    dailyOrders: 50,
    averageTicket: 10000,
  };

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should save the current scenario and allow it to be reused', async () => {
    const result = runSimulation(input);
    const onLoadScenario = vi.fn();

    render(
      <SimulatorResults
        result={result}
        input={input}
        risks={result.risks}
        onLoadScenario={onLoadScenario}
      />
    );

    fireEvent.click(screen.getByText('Guardar escenario actual'));

    await waitFor(() => {
      const rawScenarios = window.localStorage.getItem(STORAGE_KEY);
      expect(rawScenarios).not.toBeNull();
      expect(rawScenarios).toContain('Escenario 1');
    });

    fireEvent.click(screen.getByText('Reutilizar'));

    expect(onLoadScenario).toHaveBeenCalledTimes(1);
    expect(onLoadScenario).toHaveBeenCalledWith(
      expect.objectContaining({
        input,
        result,
      })
    );
  });
});
