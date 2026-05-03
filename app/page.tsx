import { Header } from '@/components/navigation/Header';
import { Sidebar } from '@/components/navigation/Sidebar';

const kpis = [
  { label: 'Margen Bruto', value: '68.5%', delta: '+2.3%' },
  { label: 'Rotación Stock', value: '4.2', delta: '+0.3x' },
  { label: 'Desperdicio', value: '3.8%', delta: '-1.2%' },
  { label: 'Tiempo Servicio', value: '4.2 min', delta: '0%' },
  { label: 'Ticket Promedio', value: '$4.250', delta: '+12.5%' },
  { label: 'Índice Faltantes', value: '2 items', delta: '-3.0%' },
];

export default function HomePage() {
  return (
    <main className="app-shell">
      <Sidebar />

      <section className="dashboard-shell">
        <Header />

        <section className="kpi-grid" aria-label="Indicadores clave">
          {kpis.map((kpi) => (
            <article className="kpi-card" key={kpi.label}>
              <p>{kpi.label}</p>
              <strong>{kpi.value}</strong>
              <span>{kpi.delta}</span>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="panel panel-large">
            <div className="panel-title-row">
              <h2>Ventas Semanales</h2>
              <span>Ventas vs Ganancia</span>
            </div>
            <div className="chart-placeholder chart-large" />
          </article>

          <article className="panel panel-large">
            <div className="panel-title-row">
              <h2>Ocupación por Horario</h2>
              <span>Alta, media y baja</span>
            </div>
            <div className="chart-placeholder chart-large bar-chart" />
          </article>

          <article className="panel panel-wide">
            <div className="panel-title-row">
              <h2>Análisis de Riesgos</h2>
              <span>Factores externos e impacto</span>
            </div>

            <div className="risk-list">
              <div className="risk-item">
                <strong>Subida del dólar</strong>
                <div className="risk-bar"><span className="risk-fill risk-fill-50" /></div>
              </div>
              <div className="risk-item">
                <strong>Demanda verano</strong>
                <div className="risk-bar"><span className="risk-fill risk-fill-35" /></div>
              </div>
              <div className="risk-item">
                <strong>Nueva competencia</strong>
                <div className="risk-bar"><span className="risk-fill risk-fill-25" /></div>
              </div>
              <div className="risk-item">
                <strong>Costos energía</strong>
                <div className="risk-bar"><span className="risk-fill risk-fill-40" /></div>
              </div>
            </div>

            <div className="impact-card">
              <p>Impacto total estimado</p>
              <strong>-7.2%</strong>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
