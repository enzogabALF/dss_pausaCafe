export default function SalesChart() {
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const salesData = [45, 52, 48, 61, 58, 89, 72];
  const maxSales = Math.max(...salesData);

  return (
    <div className="sales-chart-container">
      <h3>Ventas por Día de la Semana</h3>
      <div className="sales-chart">
        {weekDays.map((day, idx) => {
          const height = (salesData[idx] / maxSales) * 100;
          return (
            <div key={day} className="sales-bar-group">
              <div className="sales-bar-wrapper">
                <div
                  className="sales-bar"
                  style={{ height: `${height}%` }}
                />
              </div>
              <label>{day}</label>
              <span className="sales-value">{salesData[idx]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
