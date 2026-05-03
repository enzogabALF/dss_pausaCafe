'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { label: 'Dashboard', href: '/' },
  { label: 'Simulador', href: '/simulator' },
  { label: 'Productos', href: '/products' },
  { label: 'Analíticas', href: '/analytics' },
  { label: 'Alertas', href: '/alerts' },
];

export function Sidebar() {
  const pathname = usePathname();

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
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              className={isActive ? 'sidebar-link active' : 'sidebar-link'}
              href={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <footer className="sidebar-footer">Configuración</footer>
    </aside>
  );
}
