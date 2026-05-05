import type { OperationsSnapshot } from './types';

const DEFAULT_INVENTORY = [
  { id: 'coffee', name: 'Café molido', category: 'Bebidas', stock: 72, minimum: 35, target: 120, unit: 'kg' },
  { id: 'milk', name: 'Leche', category: 'Bebidas', stock: 48, minimum: 30, target: 100, unit: 'l' },
  { id: 'bakery', name: 'Pastelería', category: 'Snacks', stock: 24, minimum: 20, target: 80, unit: 'unid' },
  { id: 'cups', name: 'Vasos desechables', category: 'Operación', stock: 160, minimum: 90, target: 240, unit: 'unid' },
];

const DEFAULT_STAFF = [
  { id: 'barista-1', name: 'Laura', role: 'Barista', shift: 'Mañana', active: true, workload: 78 },
  { id: 'barista-2', name: 'Sofía', role: 'Barista', shift: 'Tarde', active: true, workload: 64 },
  { id: 'cashier-1', name: 'Mateo', role: 'Caja', shift: 'Mañana', active: true, workload: 58 },
  { id: 'support-1', name: 'Camila', role: 'Apoyo', shift: 'Tarde', active: false, workload: 0 },
];

function calculateStockCoverage(inventory: typeof DEFAULT_INVENTORY): number {
  const ratios = inventory.map((item) => Math.min(item.stock / item.target, 1));
  const average = ratios.reduce((sum, value) => sum + value, 0) / ratios.length;
  return Math.round(average * 1000) / 10;
}

function calculateCapacityUtilization(staff: typeof DEFAULT_STAFF): number {
  const activeStaff = staff.filter((item) => item.active).length;
  const workloadAverage = staff.reduce((sum, item) => sum + item.workload, 0) / staff.length;
  const utilization = (activeStaff / staff.length) * 70 + (workloadAverage / 100) * 30;
  return Math.min(100, Math.round(utilization * 10) / 10);
}

export function buildOperationsSnapshot(overrides?: Partial<OperationsSnapshot>): OperationsSnapshot {
  const inventory = overrides?.inventory ?? DEFAULT_INVENTORY.map((item) => ({
    ...item,
    critical: item.stock <= item.minimum,
  }));

  const staff = overrides?.staff ?? DEFAULT_STAFF;
  const criticalItems = inventory.filter((item) => item.critical || item.stock <= item.minimum).length;
  const activeStaff = staff.filter((member) => member.active).length;

  return {
    inventory,
    staff,
    stockCoverage: overrides?.stockCoverage ?? calculateStockCoverage(DEFAULT_INVENTORY),
    capacityUtilization: overrides?.capacityUtilization ?? calculateCapacityUtilization(DEFAULT_STAFF),
    activeStaff: overrides?.activeStaff ?? activeStaff,
    criticalItems: overrides?.criticalItems ?? criticalItems,
    updatedAt: overrides?.updatedAt ?? new Date().toISOString(),
  };
}

export function buildDemoOperationsSnapshot(): OperationsSnapshot {
  return buildOperationsSnapshot();
}