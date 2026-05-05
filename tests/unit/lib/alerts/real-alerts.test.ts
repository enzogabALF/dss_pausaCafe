import { describe, expect, it } from 'vitest';
import { generateAlerts, summarizeAlerts } from '@/lib/alerts/risk-engine';
import { buildOperationsSnapshot } from '@/lib/operations';

describe('real alerts engine', () => {
  it('genera alertas desde KPI y estado operativo', () => {
    const alerts = generateAlerts(
      {
        date: '2026-05-05',
        totalOrders: 120,
        totalRevenue: 1000000,
        averageTicket: 12000,
        digitalSales: 8,
        totalCost: 420000,
        operationalCost: 180000,
        margin: 58,
        occupancyRate: 92,
        categories: {},
      },
      buildOperationsSnapshot({
        criticalItems: 2,
        capacityUtilization: 94,
      })
    );

    const summary = summarizeAlerts(alerts);

    expect(summary.critical).toBeGreaterThan(0);
    expect(summary.warning).toBeGreaterThan(0);
    expect(alerts.some((alert) => alert.title.includes('Margen'))).toBe(true);
    expect(alerts.some((alert) => alert.title.includes('Stock'))).toBe(true);
  });
});
