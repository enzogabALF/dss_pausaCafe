export default function ProfitabilityVisualization() {
  const categories = [
    { name: 'Bebidas Calientes', margin: 72, revenue: 2840, profit: 2043 },
    { name: 'Bebidas Frías', margin: 75, revenue: 392, profit: 294 },
    { name: 'Pastelería', margin: 67.9, revenue: 873, profit: 592 },
    { name: 'Comida', margin: 62.4, revenue: 739, profit: 461 },
  ];

  const maxProfit = Math.max(...categories.map(c => c.profit));

  return (
    <div className="profitability-container">
      <h3>Análisis de Rentabilidad por Categoría</h3>
      <div className="profitability-grid">
        {categories.map((cat) => (
          <div key={cat.name} className="profitability-item">
            <div className="profitability-header">
              <h4>{cat.name}</h4>
              <span className="margin-value">{cat.margin}%</span>
            </div>
            <div className="profitability-bars">
              <div className="profit-bar-group">
                <label>Ingresos</label>
                <div className="profit-bar-wrapper">
                  <div
                    className="profit-bar revenue-bar"
                    style={{ width: `${(cat.revenue / 3000) * 100}%` }}
                  />
                </div>
                <span>${cat.revenue}</span>
              </div>
              <div className="profit-bar-group">
                <label>Ganancia</label>
                <div className="profit-bar-wrapper">
                  <div
                    className="profit-bar profit-bar-fill"
                    style={{ width: `${(cat.profit / maxProfit) * 100}%` }}
                  />
                </div>
                <span>${cat.profit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
