export default function PressureCard({ hPa }: { hPa?: number }) {
  return (
    <div style={{ border:'1px solid #eee', borderRadius:12, padding:16 }}>
      <div style={{ fontWeight:600, marginBottom:6 }}>Pressure</div>
      <div style={{ fontSize:28, fontWeight:800 }}>{hPa ? Math.round(hPa) : '—'} hPa</div>
      <div style={{ color:'#666' }}>Sea-level avg ~1013 hPa</div>
    </div>
  );
}
