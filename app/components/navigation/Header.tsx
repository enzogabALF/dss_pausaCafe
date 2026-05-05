interface HeaderProps {
  title: string;
  subtitle?: string;
  role?: string;
}

export function Header({ title, subtitle, role = 'manager' }: HeaderProps) {
  return (
    <header className="dashboard-header">
      <div>
        <p className="dashboard-kicker">CafeDecide • Pausa Cafe</p>
        <h1>{title}</h1>
        {subtitle && <p className="dashboard-subtitle">{subtitle}</p>}
      </div>

      <div className="dashboard-header-actions">
        <span className="status-pill">Rol: {role}</span>
        <span className="status-pill">Última actualización: Hoy, 14:30</span>
        <button className="accent-button" type="button">
          Actualizar
        </button>
      </div>
    </header>
  );
}
