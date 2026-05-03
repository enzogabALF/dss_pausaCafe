export default function DemandAnalysis() {
  const categories = [
    { name: 'Café Premium', demand: 92, capacity: 100 },
    { name: 'Desayunos', demand: 78, capacity: 100 },
    { name: 'Almuerzos', demand: 65, capacity: 100 },
    { name: 'Postres', demand: 54, capacity: 100 },
    { name: 'Bebidas Especiales', demand: 88, capacity: 100 },
  ];

  return (
    <div className="demand-analysis-container">
      <h3>Análisis de Demanda por Categoría</h3>
      <div className="demand-list">
        {categories.map((cat) => (
          <div key={cat.name} className="demand-item">
            <div className="demand-header">
              <span className="demand-label">{cat.name}</span>
              <span className="demand-percentage">{cat.demand}%</span>
            </div>
            <div className="demand-bar-wrapper">
              <div className="demand-bar-bg" />
              <div
                className="demand-bar-fill"
                style={{ width: `${cat.demand}%` }}
              />
            </div>
            <div className="demand-footer">
              <span className="demand-status">
                {cat.demand >= 85 ? '🔴 Alto' : cat.demand >= 70 ? '🟡 Normal' : '🟢 Bajo'}
              </span>
              <span className="demand-capacity">{cat.demand}/{cat.capacity}% Cap</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
