export interface Alert {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'warning' | 'info';
  category: string;
  scenario: 'Favorable' | 'Normal' | 'Desfavorable';
  timestamp: string;
  actionable: boolean;
}

const MOCK_ALERTS: Alert[] = [
  {
    id: '1',
    title: 'Margen crítico detectado',
    description: 'Los márgenes en bebidas frías cayeron 8% en la última semana.',
    priority: 'critical',
    category: 'Rentabilidad',
    scenario: 'Desfavorable',
    timestamp: 'Hace 2 horas',
    actionable: true,
  },
  {
    id: '2',
    title: 'Oportunidad de upsell',
    description: 'Incrementar ticket promedio con combos de desayuno + bebida premium.',
    priority: 'warning',
    category: 'Ventas',
    scenario: 'Favorable',
    timestamp: 'Hace 4 horas',
    actionable: true,
  },
  {
    id: '3',
    title: 'Stock bajo en Croissant Clásico',
    description: 'Inventario por debajo del 30%. Reorden recomendada.',
    priority: 'warning',
    category: 'Inventario',
    scenario: 'Normal',
    timestamp: 'Hace 6 horas',
    actionable: true,
  },
  {
    id: '4',
    title: 'Ocupación óptima en horario peak',
    description: 'Entre 12:00 y 14:00 alcanzamos 92% de ocupación. Excelente.',
    priority: 'info',
    category: 'Operaciones',
    scenario: 'Favorable',
    timestamp: 'Hace 8 horas',
    actionable: false,
  },
  {
    id: '5',
    title: 'Demanda de bebidas especiales en alza',
    description: 'Aumento 24% en solicitudes. Considerar expansión de carta.',
    priority: 'warning',
    category: 'Producto',
    scenario: 'Favorable',
    timestamp: 'Hace 12 horas',
    actionable: true,
  },
  {
    id: '6',
    title: 'Meta de ventas alcanzada',
    description: 'Hemos superado la meta del mes en 15%. Excelente desempeño.',
    priority: 'info',
    category: 'Ventas',
    scenario: 'Favorable',
    timestamp: 'Ayer',
    actionable: false,
  },
];

export default function AlertsList() {
  const criticalAlerts = MOCK_ALERTS.filter((a) => a.priority === 'critical');
  const warningAlerts = MOCK_ALERTS.filter((a) => a.priority === 'warning');
  const infoAlerts = MOCK_ALERTS.filter((a) => a.priority === 'info');

  const renderAlert = (alert: Alert) => (
    <div key={alert.id} className={`alert-card alert-${alert.priority}`}>
      <div className="alert-header">
        <div className="alert-title-group">
          <span className={`alert-icon alert-icon-${alert.priority}`}>
            {alert.priority === 'critical' && '🚨'}
            {alert.priority === 'warning' && '⚠️'}
            {alert.priority === 'info' && 'ℹ️'}
          </span>
          <div>
            <h4>{alert.title}</h4>
            <span className="alert-category">{alert.category}</span>
          </div>
        </div>
        <span className={`alert-scenario alert-scenario-${alert.scenario.toLowerCase()}`}>
          {alert.scenario}
        </span>
      </div>

      <p className="alert-description">{alert.description}</p>

      <div className="alert-footer">
        <span className="alert-timestamp">{alert.timestamp}</span>
        {alert.actionable && (
          <div className="alert-actions">
            <button className="alert-action-btn dismiss" type="button">
              Descartar
            </button>
            <button className="alert-action-btn implement" type="button">
              Implementar
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="alerts-list-container">
      {/* Alertas Críticas */}
      {criticalAlerts.length > 0 && (
        <section className="alerts-section">
          <h3>🚨 Alertas Críticas ({criticalAlerts.length})</h3>
          <div className="alerts-group">
            {criticalAlerts.map(renderAlert)}
          </div>
        </section>
      )}

      {/* Advertencias */}
      {warningAlerts.length > 0 && (
        <section className="alerts-section">
          <h3>⚠️ Advertencias ({warningAlerts.length})</h3>
          <div className="alerts-group">
            {warningAlerts.map(renderAlert)}
          </div>
        </section>
      )}

      {/* Información */}
      {infoAlerts.length > 0 && (
        <section className="alerts-section">
          <h3>ℹ️ Información ({infoAlerts.length})</h3>
          <div className="alerts-group">
            {infoAlerts.map(renderAlert)}
          </div>
        </section>
      )}
    </div>
  );
}
