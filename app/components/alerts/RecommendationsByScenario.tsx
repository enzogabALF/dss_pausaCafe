export default function RecommendationsByScenario() {
  const scenarios = [
    {
      name: 'Favorable',
      color: '#57a661',
      emoji: '📈',
      recommendations: [
        'Expandir horarios de atención en peak hours',
        'Implementar programa de loyalty para retención',
        'Aumentar capacidad de producción',
      ],
    },
    {
      name: 'Normal',
      color: '#f5a24c',
      emoji: '➡️',
      recommendations: [
        'Mantener operaciones actuales sin cambios mayores',
        'Monitorear márgenes semanalmente',
        'Preparar contingencias para escenario desfavorable',
      ],
    },
    {
      name: 'Desfavorable',
      color: '#d97f6f',
      emoji: '📉',
      recommendations: [
        'Revisar estructura de costos operacionales',
        'Ajustar precios de manera estratégica',
        'Eliminar productos de bajo margen del menú',
      ],
    },
  ];

  return (
    <div className="recommendations-container">
      <h3>Recomendaciones por Escenario</h3>
      <div className="scenarios-grid">
        {scenarios.map((scenario) => (
          <div
            key={scenario.name}
            className="scenario-recommendation-card"
            style={{ '--card-accent': scenario.color } as React.CSSProperties}
          >
            <div className="scenario-header">
              <span className="scenario-emoji">{scenario.emoji}</span>
              <h4>{scenario.name}</h4>
            </div>

            <ul className="recommendations-list">
              {scenario.recommendations.map((rec, idx) => (
                <li key={idx}>
                  <span className="checkmark">✓</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
