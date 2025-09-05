import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

type Props = { lat: number; lon: number; zoom?: number };
type RainviewerJSON = { radar?: { past?: Array<{ time: number }>; nowcast?: Array<{ time: number }> } };

export default function RadarMap({ lat, lon, zoom = 6 }: Props) {
  const [frame, setFrame] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.rainviewer.com/public/weather-maps.json')
      .then(r => r.json())
      .then((j: RainviewerJSON) => {
        const last = j?.radar?.past?.slice(-1)?.[0];
        setFrame(last?.time ?? null);
      })
      .catch(() => setFrame(null));
  }, []);

  const url = useMemo(() =>
    frame ? `https://tilecache.rainviewer.com/v2/radar/${frame}/256/{z}/{x}/{y}/2/1_1.png` : null
  , [frame]);

  return (
    <div className="card" style={{ height: 340, overflow:'hidden' }}>
      <MapContainer center={[lat, lon]} zoom={zoom} style={{ height:'100%', width:'100%' }}>
        {/* dark base WITHOUT labels */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap &copy; Carto"
        />
        {/* bright label overlay so city names pop */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
          opacity={0.95}
          zIndex={650}
        />
        {url && <TileLayer url=".../dark_only_labels/{z}/{x}/{y}{r}.png" opacity={1} zIndex={650} />
}
      </MapContainer>
    </div>
  );
}
