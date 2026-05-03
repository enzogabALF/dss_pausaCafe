import { Sidebar } from '../components/navigation/Sidebar';
import { Header } from '../components/navigation/Header';
import TrendsChart from '../components/analytics/TrendsChart';
import DemandAnalysis from '../components/analytics/DemandAnalysis';
import PerformanceMetrics from '../components/analytics/PerformanceMetrics';
import ForecastPanel from '../components/analytics/ForecastPanel';

export default function AnalyticsPage() {
  return (
    <main className="app-shell">
      <Sidebar />
      <section className="dashboard-shell">
        <Header
          title="Analíticas y Tendencias"
          subtitle="Análisis de demanda, rendimiento y pronósticos"
        />

        <div className="analytics-page-content">
          {/* Tendencias de ventas */}
          <section className="panel panel-wide">
            <TrendsChart />
          </section>

          {/* Análisis de demanda y pronósticos */}
          <div className="analytics-grid">
            <section className="panel">
              <DemandAnalysis />
            </section>
            <section className="panel">
              <ForecastPanel />
            </section>
          </div>

          {/* Métricas de rendimiento */}
          <section className="panel">
            <PerformanceMetrics />
          </section>
        </div>
      </section>
    </main>
  );
}
