'use client';

import { useEffect } from 'react';
import { useKpi } from '../lib/hooks';
import { Header } from '../components/navigation/Header';
import { Sidebar } from '../components/navigation/Sidebar';
import { WeeklySalesChart } from './components/dashboard/WeeklySalesChart';
import { HourlyOccupancyChart } from './components/dashboard/HourlyOccupancyChart';

export default function HomePage() {
  const { loading, error, kpi, fetchKpi } = useKpi();

  useEffect(() => {
    fetchKpi();
  }, []);

  // KPIs calculados de los datos
  const kpis = kpi
    ? [
        { label: 'Margen Bruto', value: `${kpi.margin.toFixed(1)}%`, delta: '+2.3%' },
        { label: 'Ingresos', value: `$${(kpi.totalRevenue / 1000).toFixed(0)}k`, delta: '+5.2%' },
        { label: 'Costo Total', value: `$${(kpi.totalCost / 1000).toFixed(0)}k`, delta: '+1.8%' },
        { label: 'Ticket Promedio', value: `$${kpi.averageTicket.toLocaleString('es-CO')}`, delta: '+12.5%' },
        { label: 'Ocupación', value: `${kpi.occupancyRate}%`, delta: '+3.1%' },
        { label: 'Órdenes', value: kpi.totalOrders.toString(), delta: '+4.0%' },
      ]
    : [];

  return (
    <main className="app-shell">
      <Sidebar />

      <section className="dashboard-shell">
        <Header />

        {error && (
          <div
            style={{
              padding: '16px',
              marginBottom: '16px',
              backgroundColor: 'rgba(255, 100, 100, 0.1)',
              borderLeft: '4px solid #ff6464',
              borderRadius: '4px',
              color: '#ff6464',
            }}
          >
            ⚠️ Error: {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--foreground)' }}>
            ⏳ Cargando KPIs...
          </div>
        ) : kpi ? (
          <>
            <section className="kpi-grid" aria-label="Indicadores clave">
              {kpis.map((kpiItem) => (
                <article className="kpi-card" key={kpiItem.label}>
                  <p>{kpiItem.label}</p>
                  <strong>{kpiItem.value}</strong>
                  <span>{kpiItem.delta}</span>
                </article>
              ))}
            </section>

            <section className="dashboard-grid">
              <article className="panel panel-large">
                <div className="panel-title-row">
                  <h2>Ventas Semanales</h2>
                  <span>Ventas vs Ganancia</span>
                </div>
                <div style={{ height: '300px', width: '100%', marginTop: '16px' }}>
                  <WeeklySalesChart />
                </div>
              </article>

              <article className="panel panel-large">
                <div className="panel-title-row">
                  <h2>Ocupación por Horario</h2>
                  <span>Alta, media y baja</span>
                </div>
                <div style={{ height: '300px', width: '100%', marginTop: '16px' }}>
                  <HourlyOccupancyChart />
                </div>
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
          </>
        ) : null}
      </section>
    </main>
  );
}
