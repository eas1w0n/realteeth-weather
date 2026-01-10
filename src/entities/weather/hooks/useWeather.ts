import { useQuery } from '@tanstack/react-query';
import { fetchForecast } from '../api/forecast.api';
import { fetchCurrentWeather } from '../api/weather.api';
import { getHourlyTemps, getMinMaxTemp, getTodayForecast } from '../utils';
import { fetchAddressFromCoords } from '@/shared/api/geocoding';

export function useHomeWeather(coords: { lat: number; lon: number } | null) {
  const enabled = !!coords;

  // 현재 날씨
  const weatherQuery = useQuery({
    queryKey: ['current-weather', coords?.lat, coords?.lon],
    queryFn: () => fetchCurrentWeather({ lat: coords!.lat, lon: coords!.lon }),
    enabled,
  });

  // 예보 + 가공
  const forecastQuery = useQuery({
    queryKey: ['forecast', coords],
    queryFn: () => fetchForecast(coords!),
    enabled,
    select: forecast => {
      const todayList = getTodayForecast(forecast.list);
      const { min, max } = getMinMaxTemp(todayList);
      const hourlyTemps = getHourlyTemps(todayList);
      return { min, max, hourlyTemps };
    },
  });

  // 주소 (reverse geocoding)
  const addressQuery = useQuery({
    queryKey: ['reverse-geocoding', coords?.lat, coords?.lon],
    queryFn: () => fetchAddressFromCoords(coords!.lat, coords!.lon),
    enabled: !!coords,
    staleTime: 10 * 60 * 1000,
  });

  return {
    weatherQuery,
    forecastQuery,
    addressQuery,
  };
}
