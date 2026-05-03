import { Sidebar } from '../components/navigation/Sidebar';
import { Header } from '../components/navigation/Header';
import AlertsList from '../components/alerts/AlertsList';
import AlertsFilter from '../components/alerts/AlertsFilter';
import RecommendationsByScenario from '../components/alerts/RecommendationsByScenario';

export default function AlertsPage() {
  return (
    <main className="app-shell">
      <Sidebar />
      <section className="dashboard-shell">
        <Header
          title="Alertas y Recomendaciones"
          subtitle="Notificaciones, riesgos y acciones recomendadas"
        />

        <div className="alerts-page-content">
          {/* Filtros */}
          <section className="panel">
            <h2>Filtrar Alertas</h2>
            <AlertsFilter />
          </section>

          {/* Lista de alertas */}
          <section className="panel">
            <AlertsList />
          </section>

          {/* Recomendaciones por escenario */}
          <section className="panel">
            <RecommendationsByScenario />
          </section>
        </div>
      </section>
    </main>
  );
}
