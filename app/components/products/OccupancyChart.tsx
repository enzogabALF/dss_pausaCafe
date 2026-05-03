export default function OccupancyChart() {
  const hours = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
  const occupancy = [15, 35, 62, 85, 92, 88, 72, 58, 45, 72, 88, 65];
  const maxOccupancy = 100;

  return (
    <div className="occupancy-chart-container">
      <h3>Ocupación por Hora</h3>
      <div className="occupancy-chart">
        {hours.map((hour, idx) => {
          const height = (occupancy[idx] / maxOccupancy) * 100;
          return (
            <div key={hour} className="occupancy-bar-group">
              <div className="occupancy-bar-wrapper">
                <div
                  className="occupancy-bar"
                  style={{ height: `${height}%` }}
                />
              </div>
              <label>{hour}h</label>
              <span className="occupancy-value">{occupancy[idx]}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
