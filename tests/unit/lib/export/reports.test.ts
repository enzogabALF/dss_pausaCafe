import { beforeEach, describe, expect, it } from 'vitest';
import { buildReportMetadata, readReportHistory, saveReportHistory } from '@/lib/export-utils';

describe('report metadata history', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('crea metadatos consistentes para exportaciones', () => {
    const metadata = buildReportMetadata('pdf', {
      input: {
        initialInvestment: 800000,
        costPerOrder: 20,
        dailyOrders: 50,
        averageTicket: 10000,
      },
      title: 'Reporte demo',
      persisted: true,
      source: 'demo',
    });

    expect(metadata.format).toBe('pdf');
    expect(metadata.title).toBe('Reporte demo');
    expect(metadata.persisted).toBe(true);
    expect(metadata.source).toBe('demo');
  });

  it('persiste y lee historial de reportes en localStorage', () => {
    const metadata = buildReportMetadata('csv', {
      input: {
        initialInvestment: 500000,
        costPerOrder: 25,
        dailyOrders: 30,
        averageTicket: 8500,
      },
      title: 'Reporte CSV',
      persisted: true,
      source: 'demo',
    });

    saveReportHistory(metadata);

    const history = readReportHistory();
    expect(history).toHaveLength(1);
    expect(history[0]).toMatchObject({
      id: metadata.id,
      format: 'csv',
      title: 'Reporte CSV',
    });
  });
});
