'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Sem 1', ventas: 3200000, ganancia: 1600000 },
  { name: 'Sem 2', ventas: 3500000, ganancia: 1750000 },
  { name: 'Sem 3', ventas: 3100000, ganancia: 1550000 },
  { name: 'Sem 4', ventas: 4000000, ganancia: 2000000 },
  { name: 'Sem 5', ventas: 4200000, ganancia: 2100000 },
  { name: 'Sem 6', ventas: 3800000, ganancia: 1900000 },
];

export function WeeklySalesChart() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" tickFormatter={(value) => `$${value / 1000}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
            formatter={(value: any) => [`$${Number(value).toLocaleString('es-CO')}`, '']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="ventas"
            name="Ventas Totales"
            stroke="#f5a24c"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="ganancia"
            name="Margen de Ganancia"
            stroke="#57a661"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
