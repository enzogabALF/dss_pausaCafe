import { Sidebar } from '../components/navigation/Sidebar';
import { Header } from '../components/navigation/Header';
import ProductTable from '../components/products/ProductTable';
import SalesChart from '../components/products/SalesChart';
import OccupancyChart from '../components/products/OccupancyChart';
import ProfitabilityVisualization from '../components/products/ProfitabilityVisualization';

export default function ProductsPage() {
  return (
    <main className="app-shell">
      <Sidebar />
      <section className="dashboard-shell">
        <Header
          title="Análisis de Productos"
          subtitle="Rentabilidad, ventas y ocupación por categoría"
        />

        <div className="products-page-content">
          {/* Tabla de productos */}
          <section className="panel">
            <h2>Catálogo de Productos</h2>
            <ProductTable />
          </section>

          {/* Análisis de rentabilidad */}
          <section className="panel">
            <ProfitabilityVisualization />
          </section>

          {/* Gráficos de ventas y ocupación */}
          <div className="products-charts-grid">
            <section className="panel">
              <SalesChart />
            </section>
            <section className="panel">
              <OccupancyChart />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
