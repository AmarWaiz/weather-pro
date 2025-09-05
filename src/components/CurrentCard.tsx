export default function CurrentCard(props: {
  tz: string; temp: number; feels: number; rh: number; wind: number; units: 'metric'|'imperial'; label: string;
}) {
  const { tz,temp,feels,rh,wind,units,label } = props;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:16, padding:16, border:'1px solid #eee', borderRadius:12 }}>
      <div style={{ fontSize:18, fontWeight:600 }}>{label} • {tz}</div>
      <div style={{ marginLeft:'auto', fontSize:40, fontWeight:800 }}>{Math.round(temp)}°</div>
      <div style={{ color:'#555' }}>
        Feels {Math.round(feels)}° • RH {Math.round(rh)}% • Wind {Math.round(wind)} {units==='metric'?'m/s':'mph'}
      </div>
    </div>
  );
}
