const controls = [
  { label: 'Inversión inicial', value: '$800.000', min: '$400.000', max: '$1.500.000', percent: 36 },
  { label: 'Costo por pedido', value: '20%', min: '10%', max: '30%', percent: 20 },
  { label: 'Pedidos diarios', value: '50 pedidos', min: '30', max: '80', percent: 55 },
  { label: 'Ticket promedio', value: '$10.000', min: '$8.000', max: '$12.000', percent: 42 },
];

export function InvestmentControls() {
  return (
    <article className="panel simulator-panel">
      <div className="panel-title-row">
        <h2>Simulador de Inversión</h2>
        <span>Parámetros de entrada</span>
      </div>

      <div className="simulator-controls">
        {controls.map((control) => (
          <label className="simulator-control" key={control.label}>
            <div className="simulator-control-header">
              <strong>{control.label}</strong>
              <span>{control.value}</span>
            </div>
            <input type="range" min="0" max="100" defaultValue={control.percent} aria-label={control.label} />
            <div className="simulator-control-meta">
              <span>{control.min}</span>
              <span>{control.max}</span>
            </div>
          </label>
        ))}
      </div>

      <div className="simulator-note">
        La simulación muestra VAN, TIR, payback y viabilidad con tres escenarios.
      </div>
    </article>
  );
}
