const mToKm = (m?: number) => (m==null ? undefined : m/1000);
export default function VisibilityCloudCard({ visibility, cloud }: { visibility?: number; cloud?: number }) {
  const km = mToKm(visibility);
  return (
    <div style={{ border:'1px solid #eee', borderRadius:12, padding:16 }}>
      <div style={{ fontWeight:600, marginBottom:6 }}>Visibility & Cloud</div>
      <div>Visibility: <b>{km!=null ? km.toFixed(1) : '—'} km</b></div>
      <div>Cloud cover: <b>{cloud!=null ? Math.round(cloud) : '—'}%</b></div>
    </div>
  );
}
