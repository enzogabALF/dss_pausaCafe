const results = [
  { label: 'VAN', value: '$91.677.877', tone: 'positive' },
  { label: 'TIR', value: '2080.0% mensual', tone: 'positive' },
  { label: 'Payback', value: '0.0 meses', tone: 'neutral' },
  { label: 'Viabilidad', value: 'Viable', tone: 'positive' },
];

const scenarios = [
  { label: 'Optimista', income: '$49.276.021', payback: '0.3 meses' },
  { label: 'Base', income: '$91.677.877', payback: '0.2 meses' },
  { label: 'Crítico', income: '$14.558.733', payback: '0.8 meses' },
];

export function SimulatorResults() {
  return (
    <div className="simulator-results-stack">
      <article className="panel simulator-panel simulator-results-grid">
        {results.map((result) => (
          <div className="result-card" key={result.label} data-tone={result.tone}>
            <p>{result.label}</p>
            <strong>{result.value}</strong>
          </div>
        ))}
      </article>

      <article className="panel simulator-panel">
        <div className="panel-title-row">
          <h2>Análisis de Escenarios</h2>
          <span>Resultados comparados</span>
        </div>

        <div className="scenario-grid">
          {scenarios.map((scenario) => (
            <div className="scenario-card" key={scenario.label}>
              <p>{scenario.label}</p>
              <strong>{scenario.income}</strong>
              <span>Payback: {scenario.payback}</span>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
