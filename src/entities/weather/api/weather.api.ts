import { BASE_URL } from '@/shared/lib/constants';

type FetchCurrentWeatherParams = {
  lat: number;
  lon: number;
  units?: 'standard' | 'metric' | 'imperial';
  lang?: string;
};

export async function fetchCurrentWeather({ lat, lon, units = 'metric', lang = 'kr' }: FetchCurrentWeatherParams) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

  if (!apiKey) {
    throw new Error('VITE_OPENWEATHER_API_KEY is missing');
  }

  const url = new URL(`${BASE_URL}/weather`);
  url.searchParams.set('lat', String(lat));
  url.searchParams.set('lon', String(lon));
  url.searchParams.set('appid', apiKey);
  url.searchParams.set('units', units);
  url.searchParams.set('lang', lang);

  const res = await fetch(url.toString());

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Weather API failed (${res.status}): ${text}`);
  }

  return res.json();
}
