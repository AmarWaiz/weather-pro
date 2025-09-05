import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Point = { time: string; temp: number };

export default function HourlyChart({ data }: { data: Point[] }) {
  return (
    <div className="card">
      <div style={{ fontWeight:600, marginBottom:8 }}>Hourly Forecast</div>
      <div style={{ width:'100%', height:240 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis
              dataKey="time"
              stroke="var(--muted)"
              tick={{ fill:'var(--muted)', fontSize:12 }}
              axisLine={{ stroke:'var(--border)' }}
              tickLine={{ stroke:'var(--border)' }}
            />
            <YAxis
              stroke="var(--muted)"
              tick={{ fill:'var(--muted)', fontSize:12 }}
              axisLine={{ stroke:'var(--border)' }}
              tickLine={{ stroke:'var(--border)' }}
            />
            <Tooltip />
            <Line type="monotone" dataKey="temp" dot={false} stroke="var(--accent)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
