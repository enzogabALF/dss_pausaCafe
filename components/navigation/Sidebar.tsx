const items = [
  { label: 'Dashboard', active: true },
  { label: 'Simulador', active: false },
  { label: 'Productos', active: false },
  { label: 'Analíticas', active: false },
  { label: 'Alertas', active: false },
];

export function Sidebar() {
  return (
    <aside className="sidebar-shell">
      <div className="sidebar-brand">
        <div className="sidebar-badge">CD</div>
        <div>
          <strong>CafeDecide</strong>
          <p>Sistema DSS</p>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Navegación principal">
        {items.map((item) => (
          <button
            key={item.label}
            className={item.active ? 'sidebar-link active' : 'sidebar-link'}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <footer className="sidebar-footer">Configuración</footer>
    </aside>
  );
}
