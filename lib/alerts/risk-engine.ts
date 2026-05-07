import type { Alert, KpiData, OperationsSnapshot, AlertPriority } from '../types';

function createAlert(
  title: string,
  description: string,
  priority: AlertPriority,
  category: string,
  scenario: Alert['scenario'],
  actionable: boolean,
  idSuffix: string,
): Alert {
  return {
    id: `${priority}-${idSuffix}`,
    title,
    description,
    priority,
    category,
    scenario,
    timestamp: new Date().toISOString(),
    actionable,
  };
}

export function generateAlerts(kpi: KpiData, operations: OperationsSnapshot): Alert[] {
  const alerts: Alert[] = [];

  if (kpi.margin < 65) {
    alerts.push(
      createAlert(
        'Margen bajo detectado',
        `El margen actual es ${kpi.margin.toFixed(1)}%, por debajo del umbral recomendado.`,
        'critical',
        'Rentabilidad',
        'unfavorable',
        true,
        'margin',
      )
    );
  }

  if (kpi.occupancyRate > 85) {
    alerts.push(
      createAlert(
        'Capacidad cercana al límite',
        `La ocupación actual es ${kpi.occupancyRate.toFixed(1)}% y puede generar cuellos de botella.`,
        'warning',
        'Operaciones',
        'normal',
        true,
        'occupancy',
      )
    );
  }

  if (operations.criticalItems > 0) {
    alerts.push(
      createAlert(
        'Stock crítico en inventario',
        `Hay ${operations.criticalItems} insumos por debajo del mínimo de reposición.`,
        'critical',
        'Inventario',
        'unfavorable',
        true,
        'inventory',
      )
    );
  }

  if (operations.capacityUtilization > 90) {
    alerts.push(
      createAlert(
        'Capacidad operativa alta',
        `La utilización operativa está en ${operations.capacityUtilization.toFixed(1)}% y conviene reforzar turnos.`,
        'warning',
        'Personal',
        'normal',
        true,
        'capacity',
      )
    );
  }

  if (kpi.digitalSales < 15) {
    alerts.push(
      createAlert(
        'Oportunidad digital',
        `Las ventas digitales están en ${kpi.digitalSales.toFixed(1)}%. Hay espacio para mejorar el canal.`,
        'info',
        'Ventas',
        'favorable',
        false,
        'digital-sales',
      )
    );
  }

  if (alerts.length === 0) {
    alerts.push(
      createAlert(
        'Operación estable',
        'Los KPIs actuales no muestran alertas críticas.',
        'info',
        'Estado general',
        'favorable',
        false,
        'stable',
      )
    );
  }

  return alerts.sort((left, right) => {
    const priorityWeight: Record<AlertPriority, number> = { critical: 0, warning: 1, info: 2 };
    return priorityWeight[left.priority] - priorityWeight[right.priority];
  });
}

export function summarizeAlerts(alerts: Alert[]) {
  return {
    total: alerts.length,
    critical: alerts.filter((alert) => alert.priority === 'critical').length,
    warning: alerts.filter((alert) => alert.priority === 'warning').length,
    info: alerts.filter((alert) => alert.priority === 'info').length,
  };
}