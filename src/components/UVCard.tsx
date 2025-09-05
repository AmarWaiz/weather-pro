export default function UVCard({ uv, uvMax }: { uv?: number; uvMax?: number }) {
  const risk =
    uv==null ? 'N/A' :
    uv < 3 ? 'Low' : uv < 6 ? 'Moderate' : uv < 8 ? 'High' : uv < 11 ? 'Very High' : 'Extreme';
  const tip =
    uv==null ? '—' :
    uv < 3 ? 'No protection needed' :
    uv < 6 ? 'SPF 30, sunglasses' :
    uv < 8 ? 'SPF 50, hat, shade' :
    uv < 11 ? 'Avoid midday, reapply SPF' : 'Minimize exposure, cover up';
  return (
    <div style={{ border:'1px solid #eee', borderRadius:12, padding:16 }}>
      <div style={{ fontWeight:600, marginBottom:6 }}>UV Index</div>
      <div style={{ fontSize:28, fontWeight:800 }}>{uv?.toFixed(1) ?? '—'}</div>
      <div style={{ color:'#555' }}>{risk}{uvMax!=null ? ` • Max ${uvMax.toFixed(1)}` : ''}</div>
      <div style={{ fontSize:12, color:'#666', marginTop:6 }}>{tip}</div>
    </div>
  );
}
