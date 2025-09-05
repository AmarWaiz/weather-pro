import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LocationHit { name: string; country?: string; admin1?: string; latitude: number; longitude: number; }

export interface MeteoForecast {
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    wind_direction_10m?: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
    precipitation_probability?: number[];
    pressure_msl?: number[];
    visibility?: number[];
    cloud_cover?: number[];
    uv_index?: number[];
    wind_speed_10m?: number[];
    wind_direction_10m?: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    precipitation_sum?: number[];
    uv_index_max?: number[];
  };
}

export interface MeteoWarnings {
  warnings?: Array<{ event?: string; severity?: string; start?: string; end?: string; description?: string; source?: string }>;
}

export interface AQIResponse {
  hourly: { time: string[]; us_aqi?: number[]; pm2_5?: number[]; pm10?: number[]; ozone?: number[] };
}

export interface AstronomyResponse {
  daily: { time: string[]; moon_phase?: number[]; moonrise?: string[]; moonset?: string[] };
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (b) => ({
    searchCity: b.query<{ results?: LocationHit[] }, { q: string; limit?: number }>({
      query: ({ q, limit = 6 }) =>
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=${limit}&language=en&format=json`,
    }),
    getForecast: b.query<MeteoForecast, { lat: number; lon: number; units?: 'metric' | 'imperial' }>({
      query: ({ lat, lon, units = 'metric' }) => {
        const tempUnit = units === 'imperial' ? 'fahrenheit' : 'celsius';
        const windUnit = units === 'imperial' ? 'mph' : 'ms';
        const hourly = [
          'temperature_2m','precipitation','precipitation_probability',
          'pressure_msl','visibility','cloud_cover','uv_index',
          'wind_speed_10m','wind_direction_10m'
        ].join(',');
        const daily = ['temperature_2m_max','temperature_2m_min','sunrise','sunset','precipitation_sum','uv_index_max'].join(',');
        const current = ['temperature_2m','apparent_temperature','relative_humidity_2m','wind_speed_10m','wind_direction_10m'].join(',');
        return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}&current=${current}&hourly=${hourly}&daily=${daily}`;
      },
    }),
    getWarnings: b.query<MeteoWarnings, { lat: number; lon: number }>({
      query: ({ lat, lon }) =>
        `https://api.open-meteo.com/v1/warnings?latitude=${lat}&longitude=${lon}&timezone=auto`,
    }),
    getAQI: b.query<AQIResponse, { lat: number; lon: number }>({
      query: ({ lat, lon }) =>
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=us_aqi,pm2_5,pm10,ozone&timezone=auto`,
    }),
    getAstronomy: b.query<AstronomyResponse, { lat: number; lon: number }>({
      query: ({ lat, lon }) =>
        `https://api.open-meteo.com/v1/astronomy?latitude=${lat}&longitude=${lon}&daily=moon_phase,moonrise,moonset&timezone=auto`,
    }),
  }),
});

export const {
  useLazySearchCityQuery,
  useGetForecastQuery,
  useGetWarningsQuery,
  useGetAQIQuery,
  useGetAstronomyQuery,
} = weatherApi;
