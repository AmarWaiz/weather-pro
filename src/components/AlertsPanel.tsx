import type { MeteoWarnings } from '../services/weatherApi';

export default function AlertsPanel({ data }: { data?: MeteoWarnings }) {
  const list = data?.warnings ?? [];
  const noData = !list || list.length === 0;

  return (
    <div className="card" style={{ minHeight: 340 }}>
      <div style={{ fontWeight:600, marginBottom:8 }}>Severe Weather Alerts</div>

      {noData ? (
        <div style={{ color:'var(--muted)' }}>
          No active alerts.
          <br />
          <span style={{ fontSize:12 }}>
            Alerts are only available for some regions (US/CA/EU/AU). Your current location may not be covered.
          </span>
        </div>
      ) : (
        <div style={{ display:'grid', gap:8 }}>
          {list.map((w, i) => (
            <div key={i} className="card" style={{ padding:10 }}>
              <div style={{ fontWeight:600 }}>
                {w.event || 'Alert'} {w.severity ? `• ${w.severity}` : ''}
              </div>
              {w.description && (
                <div style={{ whiteSpace:'pre-wrap', color:'var(--text)', marginTop:6 }}>
                  {w.description}
                </div>
              )}
              <div style={{ color:'var(--muted)', marginTop:6 }}>
                {w.start ? `From: ${new Date(w.start).toLocaleString()}` : ''}
                {w.end ? ` • To: ${new Date(w.end).toLocaleString()}` : ''}
                {w.source ? ` • Source: ${w.source}` : ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
