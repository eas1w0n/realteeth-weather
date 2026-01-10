import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchCurrentWeather } from '@/entities/weather/api/weather.api';
import { getCurrentPosition } from '@/shared/lib/geolocation';
import { fetchAddressFromCoords } from '@/shared/api/geocoding';
import { fetchForecast } from '@/entities/weather/api/forecast.api';
import { getHourlyTemps, getMinMaxTemp, getTodayForecast } from '@/entities/weather/utils';

export function HomePage() {
  const [coords, setCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  // 위치 요청
  useEffect(() => {
    getCurrentPosition()
      .then(position => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      })
      .catch(() => {
        setError('위치 권한이 필요합니다.');
      });
  }, []);

  const {
    data: weather,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useQuery({
    queryKey: ['current-weather', coords?.lat, coords?.lon],
    queryFn: () => fetchCurrentWeather({ lat: coords!.lat, lon: coords!.lon }),
    enabled: !!coords,
  });

  const {
    data: forecast,
    isLoading: forecastLoading,
    isError: forecastError,
  } = useQuery({
    queryKey: ['forecast', coords],
    queryFn: () => fetchForecast(coords!),
    enabled: !!coords,
  });

  // reverse geocoding
  const addressQuery = useQuery({
    queryKey: ['reverse-geocoding', coords?.lat, coords?.lon],
    queryFn: () => fetchAddressFromCoords(coords!.lat, coords!.lon),
    enabled: !!coords,
    staleTime: 10 * 60 * 1000,
  });

  if (error) {
    return <div>{error}</div>;
  }
  if (!coords) {
    return <div>위치 정보를 불러오는 중...</div>;
  }
  if (weatherLoading) return <div>날씨 정보를 불러오는 중...</div>;
  if (weatherError) return <div>날씨 정보를 불러올 수 없습니다.</div>;

  if (forecastLoading) {
    return <div>예보 정보를 불러오는 중...</div>;
  }

  if (forecastError || !forecast) {
    return <div>예보 정보를 불러올 수 없습니다.</div>;
  }

  const todayList = getTodayForecast(forecast.list);
  const { min, max } = getMinMaxTemp(todayList);
  const hourlyTemps = getHourlyTemps(todayList);

  return (
    <div className="p-5">
      <h1 className="text-lg font-bold">현재 위치: {addressQuery.data?.fullName ?? '위치 정보 없음'}</h1>

      <p>현재 기온: {weather.main.temp}°C</p>
      <p>최저 기온: {min}°C</p>
      <p>최고 기온: {max}°C</p>

      <h3 className="mt-4 font-bold">오늘 시간대별 기온</h3>
      <ul>
        {hourlyTemps.map(item => (
          <li key={item.time}>
            {item.time} / {item.temp}°C
          </li>
        ))}
      </ul>
    </div>
  );
}
