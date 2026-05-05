import { describe, expect, it } from 'vitest';
import { buildOperationsSnapshot } from '@/lib/operations';

describe('operations snapshot', () => {
  it('calcula cobertura, personal activo y stock critico', () => {
    const snapshot = buildOperationsSnapshot({
      inventory: [
        { id: 'coffee', name: 'Cafe', category: 'Bebidas', stock: 10, minimum: 15, target: 40, unit: 'kg', critical: true },
        { id: 'milk', name: 'Leche', category: 'Bebidas', stock: 30, minimum: 20, target: 60, unit: 'l', critical: false },
      ],
      staff: [
        { id: '1', name: 'Laura', role: 'Barista', shift: 'Mañana', active: true, workload: 80 },
        { id: '2', name: 'Mateo', role: 'Caja', shift: 'Tarde', active: false, workload: 0 },
      ],
    });

    expect(snapshot.inventory).toHaveLength(2);
    expect(snapshot.criticalItems).toBe(1);
    expect(snapshot.activeStaff).toBe(1);
    expect(snapshot.stockCoverage).toBeGreaterThan(0);
    expect(snapshot.capacityUtilization).toBeGreaterThan(0);
  });
});
