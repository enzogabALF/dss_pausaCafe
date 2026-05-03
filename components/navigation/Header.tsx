export function Header() {
  return (
    <header className="dashboard-header">
      <div>
        <p className="dashboard-kicker">CafeDecide • Pausa Cafe</p>
        <h1>Dashboard Ejecutivo</h1>
        <p className="dashboard-subtitle">
          Indicadores clave, ventas semanales y análisis de riesgos.
        </p>
      </div>

      <div className="dashboard-header-actions">
        <span className="status-pill">Última actualización: Hoy, 14:30</span>
        <button className="accent-button" type="button">
          Actualizar
        </button>
      </div>
    </header>
  );
}
