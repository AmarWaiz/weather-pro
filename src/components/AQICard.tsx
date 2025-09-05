function aqiCategory(aqi?: number) {
  if (aqi == null) return { label: 'N/A', color: '#777' };
  if (aqi <= 50) return { label: 'Good', color: '#4caf50' };
  if (aqi <= 100) return { label: 'Moderate', color: '#ffc107' };
  if (aqi <= 150) return { label: 'USG', color: '#ff9800' };
  if (aqi <= 200) return { label: 'Unhealthy', color: '#f44336' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: '#9c27b0' };
  return { label: 'Hazardous', color: '#6a1b9a' };
}
export default function AQICard({ aqi }: { aqi?: number }) {
  const cat = aqiCategory(aqi);
  return (
    <div style={{ border:'1px solid #eee', borderRadius:12, padding:16 }}>
      <div style={{ fontWeight:600, marginBottom:6 }}>Air Quality (US AQI)</div>
      <div style={{ fontSize:28, fontWeight:800, color:cat.color }}>{aqi ?? '—'}</div>
      <div style={{ color:'#555' }}>{cat.label}</div>
    </div>
  );
}
