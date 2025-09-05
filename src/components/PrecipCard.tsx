export default function PrecipCard({ chance, amount }: { chance?: number; amount?: number }) {
  return (
    <div style={{ border:'1px solid #eee', borderRadius:12, padding:16 }}>
      <div style={{ fontWeight:600, marginBottom:6 }}>Precipitation</div>
      <div>Chance: <b>{chance!=null ? Math.round(chance) : '—'}%</b></div>
      <div>Amount today: <b>{amount!=null ? amount.toFixed(1) : '—'} mm</b></div>
    </div>
  );
}
