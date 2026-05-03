export default function TrendsChart() {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const trendsData = [2400, 2810, 2290, 2900, 3200, 3500];
  const maxTrend = Math.max(...trendsData);

  return (
    <div className="trends-chart-container">
      <h3>Tendencia de Ventas - Últimos 6 Meses</h3>
      <div className="trends-chart">
        <svg viewBox="0 0 600 300" className="line-chart">
          {/* Línea de tendencia */}
          <polyline
            points={trendsData
              .map((val, idx) => {
                const x = (idx / (trendsData.length - 1)) * 550 + 25;
                const y = 250 - (val / maxTrend) * 200;
                return `${x},${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Puntos de datos */}
          {trendsData.map((val, idx) => {
            const x = (idx / (trendsData.length - 1)) * 550 + 25;
            const y = 250 - (val / maxTrend) * 200;
            return (
              <circle key={idx} cx={x} cy={y} r="5" fill="#f5a24c" opacity="0.8" />
            );
          })}

          {/* Gradiente */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f5a24c" />
              <stop offset="100%" stopColor="#d06b21" />
            </linearGradient>
          </defs>

          {/* Grid horizontal */}
          {[0, 1, 2, 3, 4].map((idx) => (
            <line
              key={`grid-${idx}`}
              x1="25"
              y1={250 - (idx / 4) * 200}
              x2="575"
              y2={250 - (idx / 4) * 200}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeDasharray="5,5"
            />
          ))}
        </svg>

        {/* Leyenda de meses */}
        <div className="trends-legend">
          {months.map((month, idx) => (
            <div key={month} className="legend-item">
              <span>{month}</span>
              <span className="legend-value">${trendsData[idx]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
