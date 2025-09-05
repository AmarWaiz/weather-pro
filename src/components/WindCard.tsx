const arrow = (deg?: number) => (deg==null?'•':'↑↗→↘↓↙←↖'[Math.round(((deg%360)/45))%8]);
export default function WindCard({ speed, dir, units }: { speed?: number; dir?: number; units: 'metric'|'imperial' }) {
  return (
    <div style={{ border:'1px solid #eee', borderRadius:12, padding:16 }}>
      <div style={{ fontWeight:600, marginBottom:6 }}>Wind</div>
      <div style={{ fontSize:28, fontWeight:800 }}>
        {speed!=null ? Math.round(speed) : '—'} {units==='metric'?'m/s':'mph'} {arrow(dir)}
      </div>
      <div style={{ color:'#666' }}>{dir!=null ? `${Math.round(dir)}°` : ''}</div>
    </div>
  );
}
