import { describe, expect, it } from 'vitest';
import { runSimulation } from '@/lib/simulation';
import { buildOperationsSnapshot } from '@/lib/operations';
import { generateAlerts } from '@/lib/alerts/risk-engine';

describe('dashboard and simulator performance smoke', () => {
  it('completa una carga repetida sin degradarse de forma evidente', () => {
    const start = performance.now();

    for (let index = 0; index < 60; index += 1) {
      const simulation = runSimulation({
        initialInvestment: 800000 + index * 5000,
        costPerOrder: 20,
        dailyOrders: 50 + (index % 5),
        averageTicket: 10000,
      });

      const operations = buildOperationsSnapshot();
      const alerts = generateAlerts(
        {
          date: '2026-05-05',
          totalOrders: 120,
          totalRevenue: 1000000,
          averageTicket: 12000,
          digitalSales: 15,
          totalCost: 420000,
          operationalCost: 180000,
          margin: 68,
          occupancyRate: 72,
          categories: {},
        },
        operations
      );

      expect(simulation.normal.van).toBeGreaterThan(0);
      expect(alerts.length).toBeGreaterThan(0);
    }

    expect(performance.now() - start).toBeLessThan(3000);
  });
});
