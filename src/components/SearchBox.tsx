import { useEffect, useRef, useState } from 'react';
import { useLazySearchCityQuery } from '../services/weatherApi';

type Props = { onSelect: (c: { lat: number; lon: number; label: string }) => void };

type Hit = {
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
};

export default function SearchBox({ onSelect }: Props) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [trigger, { data, isFetching }] = useLazySearchCityQuery();

  useEffect(() => {
    const id = setTimeout(() => {
      if (q.trim().length >= 2) {
        trigger({ q, limit: 8 });
        setOpen(true);
        setActive(0);
      } else {
        setOpen(false);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [q, trigger]);

  const results: Hit[] = (data?.results as any) ?? [];

  const choose = (h: Hit) => {
    const label = `${h.name}${h.admin1 ? ', ' + h.admin1 : ''}${h.country ? ' (' + h.country + ')' : ''}`;
    onSelect({ lat: h.latitude, lon: h.longitude, label });
    setQ('');
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
      listRef.current?.querySelectorAll<HTMLButtonElement>('.sb-option')[Math.min(active + 1, results.length - 1)]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
      listRef.current?.querySelectorAll<HTMLButtonElement>('.sb-option')[Math.max(active - 1, 0)]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) choose(results[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => q.trim().length >= 2 && setOpen(true)}
        placeholder="Search city…"
      />

      {open && (
        <div className="sb-menu" ref={listRef}>
          {isFetching && <div className="sb-empty">Searching…</div>}

          {!isFetching && results.length === 0 && (
            <div className="sb-empty">No results</div>
          )}

          {!isFetching &&
            results.map((r, i) => {
              const label = `${r.name}${r.admin1 ? ', ' + r.admin1 : ''}${r.country ? ' (' + r.country + ')' : ''}`;
              return (
                <button
                  key={`${r.name}-${r.latitude}-${r.longitude}-${i}`}
                  className={`sb-option ${i === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(r)}
                  type="button"
                >
                  <span className="sb-title">{r.name}</span>
                  <span className="sb-sub">
                    {r.admin1 ? r.admin1 + ' · ' : ''}
                    {r.country || ''}
                  </span>
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
