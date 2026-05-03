export default function PerformanceMetrics() {
  const metrics = [
    {
      label: 'Ticket Promedio',
      value: '$45.50',
      change: '+12.3%',
      trend: 'up',
    },
    {
      label: 'Margen Operativo',
      value: '31.2%',
      change: '+2.1%',
      trend: 'up',
    },
    {
      label: 'Tasa de Ocupación',
      value: '72%',
      change: '-5.4%',
      trend: 'down',
    },
    {
      label: 'Clientes Nuevos',
      value: '234',
      change: '+18.7%',
      trend: 'up',
    },
  ];

  return (
    <div className="performance-metrics-container">
      <h3>Métricas de Rendimiento</h3>
      <div className="metrics-grid">
        {metrics.map((metric, idx) => (
          <div key={idx} className="metric-card">
            <div className="metric-header">
              <p className="metric-label">{metric.label}</p>
              <span
                className={`metric-trend ${metric.trend}`}
              >
                {metric.trend === 'up' ? '📈' : '📉'} {metric.change}
              </span>
            </div>
            <div className="metric-value">{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
