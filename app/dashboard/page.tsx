'use client';

import { useEffect } from 'react';
import { useKpi } from '../../lib/hooks';
import { Header } from '../components/navigation/Header';
import { Sidebar } from '../components/navigation/Sidebar';
import { WeeklySalesChart } from '../components/dashboard/WeeklySalesChart';
import { HourlyOccupancyChart } from '../components/dashboard/HourlyOccupancyChart';
import { OperationalStatusPanel } from '../components/dashboard/OperationalStatusPanel';

export default function DashboardPage() {
  const { loading, error, kpi, fetchKpi } = useKpi();

  useEffect(() => {
    fetchKpi();
  }, []);

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
        <Header title="Dashboard Ejecutivo" subtitle="Indicadores clave, ventas semanales y análisis de riesgos." />

        {error && <div className="simulator-validation-message">⚠️ Error: {error}</div>}

        {loading ? (
          <div className="simulator-empty-state">⏳ Cargando KPIs...</div>
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
                <div className="dashboard-chart-frame">
                  <WeeklySalesChart />
                </div>
              </article>

              <article className="panel panel-large">
                <div className="panel-title-row">
                  <h2>Ocupación por Horario</h2>
                  <span>Alta, media y baja</span>
                </div>
                <div className="dashboard-chart-frame">
                  <HourlyOccupancyChart />
                </div>
              </article>

              <OperationalStatusPanel />

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
