import { BASE_URL, FORECAST_API_PATH } from '@/shared/lib/constants';

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export function fetchForecast(coords: { lat: number; lon: number }) {
  return fetch(
    `${BASE_URL}${FORECAST_API_PATH}` +
      `?lat=${coords.lat}&lon=${coords.lon}` +
      `&appid=${WEATHER_API_KEY}&units=metric`,
  ).then(res => {
    if (!res.ok) {
      throw new Error('Forecast fetch failed');
    }
    return res.json();
  });
}
