export default function AlertsFilter() {
  return (
    <div className="alerts-filter-container">
      <div className="filter-group">
        <label>
          <input type="checkbox" defaultChecked />
          <span>Críticas</span>
        </label>
        <label>
          <input type="checkbox" defaultChecked />
          <span>Advertencias</span>
        </label>
        <label>
          <input type="checkbox" defaultChecked />
          <span>Información</span>
        </label>
      </div>

      <div className="filter-group">
        <label>
          <input type="checkbox" defaultChecked />
          <span>Favorable</span>
        </label>
        <label>
          <input type="checkbox" defaultChecked />
          <span>Normal</span>
        </label>
        <label>
          <input type="checkbox" defaultChecked />
          <span>Desfavorable</span>
        </label>
      </div>

      <button type="button" className="filter-reset">
        Limpiar filtros
      </button>
    </div>
  );
}
