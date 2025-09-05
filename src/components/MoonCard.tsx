export default function MoonCard({ phase, rise, set }: { phase?: number; rise?: string; set?: string }) {
  const label = phase==null ? 'N/A' :
    phase < 0.03 ? 'New Moon' :
    phase < 0.25 ? 'Waxing Crescent' :
    phase < 0.27 ? 'First Quarter' :
    phase < 0.48 ? 'Waxing Gibbous' :
    phase < 0.52 ? 'Full Moon' :
    phase < 0.73 ? 'Waning Gibbous' :
    phase < 0.77 ? 'Last Quarter' : 'Waning Crescent';
  const t = (s?: string) => s ? new Date(s).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) : '—';
  return (
    <div style={{ border:'1px solid #eee', borderRadius:12, padding:16 }}>
      <div style={{ fontWeight:600, marginBottom:6 }}>Moon</div>
      <div>{label}</div>
      <div style={{ color:'#666', marginTop:6 }}>Rise: {t(rise)} • Set: {t(set)}</div>
    </div>
  );
}
