const risks = [
  { label: 'Subida del dólar', percentClass: 'risk-fill-20' },
  { label: 'Demanda verano', percentClass: 'risk-fill-45' },
  { label: 'Nueva competencia', percentClass: 'risk-fill-25' },
  { label: 'Costos energía', percentClass: 'risk-fill-35' },
];

export function RiskPanel() {
  return (
    <article className="panel simulator-panel">
      <div className="panel-title-row">
        <h2>Análisis de Riesgos</h2>
        <span>Impacto estimado</span>
      </div>

      <div className="risk-list">
        {risks.map((risk) => (
          <div className="risk-item" key={risk.label}>
            <strong>{risk.label}</strong>
            <div className="risk-bar"><span className={risk.percentClass} /></div>
          </div>
        ))}
      </div>

      <div className="impact-card">
        <p>Impacto total estimado</p>
        <strong>+1.3%</strong>
      </div>
    </article>
  );
}
