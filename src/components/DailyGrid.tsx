type Day = { day: string; max: number; min: number; sunrise: string; sunset: string; };

export default function DailyGrid({ days }: { days: Day[] }) {
  const t = (s: string) => new Date(s).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  return (
    <div style={{ border:'1px solid #eee', borderRadius:12, padding:16 }}>
      <div style={{ fontWeight:600, marginBottom:8 }}>Daily Overview</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:8 }}>
        {days.slice(0,5).map((d, i) => (
          <div key={i} style={{ textAlign:'center', border:'1px solid #f4f4f4', borderRadius:8, padding:10 }}>
            <div style={{ fontSize:12 }}>{d.day}</div>
            <div style={{ fontSize:16, fontWeight:700 }}>{Math.round(d.max)}°</div>
            <div style={{ fontSize:12, color:'#666' }}>{Math.round(d.min)}°</div>
            <div style={{ fontSize:12, marginTop:6 }}>↑ {t(d.sunrise)} • ↓ {t(d.sunset)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
