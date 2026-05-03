export default function ForecastPanel() {
  const forecasts = [
    {
      period: 'Próxima Semana',
      prediction: '$3,250',
      confidence: 87,
      status: 'Optimista',
    },
    {
      period: 'Próximo Mes',
      prediction: '$14,200',
      confidence: 74,
      status: 'Normal',
    },
    {
      period: 'Próximo Trimestre',
      prediction: '$42,800',
      confidence: 61,
      status: 'Moderado',
    },
  ];

  return (
    <div className="forecast-panel-container">
      <h3>Pronóstico de Ventas (IA)</h3>
      <div className="forecast-list">
        {forecasts.map((forecast, idx) => {
          const confidenceColor =
            forecast.confidence >= 80
              ? '#57a661'
              : forecast.confidence >= 70
                ? '#f5a24c'
                : '#d06b21';

          return (
            <div key={idx} className="forecast-card">
              <div className="forecast-header">
                <h4>{forecast.period}</h4>
                <span className="forecast-prediction">{forecast.prediction}</span>
              </div>

              <div className="forecast-confidence">
                <div className="confidence-label">
                  <span>Confianza</span>
                  <span>{forecast.confidence}%</span>
                </div>
                <div className="confidence-bar-wrapper">
                  <div
                    className="confidence-bar"
                    style={{
                      width: `${forecast.confidence}%`,
                      backgroundColor: confidenceColor,
                    }}
                  />
                </div>
              </div>

              <div className="forecast-status">
                <span className="status-badge">{forecast.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
