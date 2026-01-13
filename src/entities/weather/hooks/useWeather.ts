import { useQuery } from '@tanstack/react-query';
import { fetchForecast } from '../api/forecast';
import { fetchCurrentWeather } from '../api/weather';
import { getHourlyTemps, getMinMaxTemp, getTodayForecast } from '../utils';
import { fetchAddressFromCoords } from '@/shared/api/geocoding';

interface Coords {
  lat: number;
  lon: number;
}

interface WeatherData {
  temp: number;
  min: number;
  max: number;
  hourlyTemps: { time: string; temp: number }[];
  address?: string;
}

export function useWeather(coords: Coords | null) {
  // 현재 날씨
  const weatherQuery = useQuery({
    queryKey: ['current-weather', coords?.lat, coords?.lon],
    queryFn: () => fetchCurrentWeather({ lat: coords!.lat, lon: coords!.lon }),
    enabled: !!coords,
  });

  // 예보 + 가공
  const forecastQuery = useQuery({
    queryKey: ['forecast', coords],
    queryFn: () => fetchForecast(coords!),
    enabled: !!coords,
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

  // 상태 통합
  const isLoading = weatherQuery.isLoading || forecastQuery.isLoading || addressQuery.isLoading;

  const isError =
    weatherQuery.isError || forecastQuery.isError || addressQuery.isError || !forecastQuery.data || !weatherQuery.data;

  if (isLoading) {
    return {
      data: null,
      isLoading: true,
      isError: false,
    };
  }

  if (isError) {
    return {
      data: null,
      isLoading: false,
      isError: true,
    };
  }

  // 최종 데이터
  const data: WeatherData = {
    temp: Math.round(weatherQuery.data!.main.temp),
    min: forecastQuery.data!.min,
    max: forecastQuery.data!.max,
    hourlyTemps: forecastQuery.data!.hourlyTemps,
    address: addressQuery.data?.fullName,
  };

  return {
    data,
    isLoading: false,
    isError: false,
  };
}
