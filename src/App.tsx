import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import {
  useGetForecastQuery,
  useGetAQIQuery,
  useGetAstronomyQuery,
} from './services/weatherApi';

import SearchBox from './components/SearchBox';
import UnitsToggle from './components/UnitsToggle';
import CurrentCard from './components/CurrentCard';
import HourlyChart from './components/HourlyChart';
import DailyGrid from './components/DailyGrid';
import RadarMap from './components/RadarMap';

import AQICard from './components/AQICard';
import UVCard from './components/UVCard';
import PressureCard from './components/PressureCard';
import PrecipCard from './components/PrecipCard';
import WindCard from './components/WindCard';
import VisibilityCloudCard from './components/VisibilityCloudCard';
import MoonCard from './components/MoonCard';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';

type Coords = { lat: number; lon: number; label: string };
const LS_COORDS = 'WEATHER_PRO_COORDS';
const LS_UNITS = 'WEATHER_PRO_UNITS';

export default function App() {
  const [coords, setCoords] = useState<Coords | null>(() => {
    const raw = localStorage.getItem(LS_COORDS);
    return raw ? (JSON.parse(raw) as Coords) : null;
  });
  const [units, setUnits] = useState<'metric' | 'imperial'>(() =>
    localStorage.getItem(LS_UNITS) === 'imperial' ? 'imperial' : 'metric'
  );

  useEffect(() => { if (coords) localStorage.setItem(LS_COORDS, JSON.stringify(coords)); }, [coords]);
  useEffect(() => { localStorage.setItem(LS_UNITS, units); }, [units]);

  // geolocate once
  useEffect(() => {
    if (coords) return;
    if (!navigator.geolocation) { setCoords({ lat: 24.8607, lon: 67.0011, label: 'Karachi' }); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude, label: 'Your Location' }),
      () => setCoords({ lat: 24.8607, lon: 67.0011, label: 'Karachi' }),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, [coords]);

  const lat = coords?.lat ?? 24.8607;
  const lon = coords?.lon ?? 67.0011;

  const { data: f, isLoading: loadingF, isError: errorF, error: rawF } =
    useGetForecastQuery({ lat, lon, units }, { skip: !coords });

  // AQI + Moon
  const { data: aqi }   = useGetAQIQuery({ lat, lon }, { skip: !coords });
  const { data: astro } = useGetAstronomyQuery({ lat, lon }, { skip: !coords });

  const hourly = useMemo(() => {
    if (!f) return [];
    return f.hourly.time.slice(0, 12).map((t, i) => ({
      time: dayjs(t).format('HH:mm'),
      temp: Math.round(f.hourly.temperature_2m[i]),
    }));
  }, [f]);

  const daily = useMemo(() => {
    if (!f) return [];
    return f.daily.time.slice(0, 5).map((t, i) => ({
      day: dayjs(t).format('ddd'),
      max: f.daily.temperature_2m_max[i],
      min: f.daily.temperature_2m_min[i],
      sunrise: f.daily.sunrise[i],
      sunset: f.daily.sunset[i],
    }));
  }, [f]);

  // small metrics
  const todayChance = f?.hourly.precipitation_probability?.slice(0,24).reduce((a,b)=>Math.max(a,b??0),0);
  const todayAmount = f?.daily.precipitation_sum?.[0];
  const todayPressure = f?.hourly.pressure_msl?.[0];
  const visNow  = f?.hourly.visibility?.[0];
  const cloudNow = f?.hourly.cloud_cover?.[0];
  const uvNow   = f?.hourly.uv_index?.[0];
  const uvMax   = f?.daily.uv_index_max?.[0];
  const windNow = f?.current.wind_speed_10m;
  const windDir = f?.current.wind_direction_10m;
  const aqiNow  = aqi?.hourly.us_aqi?.[0];
  const moonPhase = astro?.daily.moon_phase?.[0];
  const moonRise  = astro?.daily.moonrise?.[0];
  const moonSet   = astro?.daily.moonset?.[0];

  return (
    <div style={{ padding: 16, maxWidth: 1080, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Weather Pro</h1>

      {/* top controls */}
      <div className="row" style={{ gridTemplateColumns:'2fr auto auto auto', alignItems:'center', marginBottom:12 }}>
        <SearchBox onSelect={(c)=>setCoords(c)} />
        <UnitsToggle units={units} onChange={setUnits} />
        <ThemeToggle />
        <button className="btn" onClick={()=>location.reload()}>Refresh</button>
      </div>

      {!coords && <div>Getting your location…</div>}
      {loadingF && <div>Loading weather…</div>}
      {errorF && (
        <pre style={{ background:'#fff4f4', border:'1px solid #f3caca', padding:12, borderRadius:8 }}>
{JSON.stringify(rawF, null, 2)}
        </pre>
      )}

      {f && coords && (
        <>
          <CurrentCard
            tz={f.timezone}
            temp={f.current.temperature_2m}
            feels={f.current.apparent_temperature}
            rh={f.current.relative_humidity_2m}
            wind={windNow ?? 0}
            units={units}
            label={coords.label}
          />

          {/* Row 1 */}
          <div className="row" style={{ gridTemplateColumns:'1.2fr 1fr 1fr' }}>
            <HourlyChart data={hourly} />
            <AQICard aqi={aqiNow} />
            <UVCard uv={uvNow} uvMax={uvMax} />
          </div>

          <div style={{ height: 16 }} />

          {/* Row 2 */}
          <div className="row" style={{ gridTemplateColumns:'1.2fr 1fr 1fr' }}>
            <DailyGrid days={daily} />
            <PrecipCard chance={todayChance} amount={todayAmount} />
            <PressureCard hPa={todayPressure} />
          </div>

          <div style={{ height: 16 }} />

          {/* Row 3 */}
          <div className="row" style={{ gridTemplateColumns:'1fr 1fr 1fr' }}>
            <WindCard speed={windNow} dir={windDir} units={units} />
            <VisibilityCloudCard visibility={visNow} cloud={cloudNow} />
            <MoonCard phase={moonPhase} rise={moonRise} set={moonSet} />
          </div>

          <div style={{ height: 16 }} />

          {/* Row 4: Radar full-width (alerts removed) */}
          <div className="row" style={{ gridTemplateColumns:'1fr' }}>
            <RadarMap lat={lat} lon={lon} />
          </div>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
