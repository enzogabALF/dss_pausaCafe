'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { time: '08:00', ocupacion: 40 },
  { time: '10:00', ocupacion: 85 },
  { time: '12:00', ocupacion: 60 },
  { time: '14:00', ocupacion: 50 },
  { time: '16:00', ocupacion: 90 },
  { time: '18:00', ocupacion: 75 },
  { time: '20:00', ocupacion: 30 },
];

export function HourlyOccupancyChart() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" tickFormatter={(value) => `${value}%`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            formatter={(value: any) => [`${value}%`, 'Ocupación']}
          />
          <Legend />
          <Bar dataKey="ocupacion" name="Ocupación" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
