import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchCurrentWeather } from '@/entities/weather/api/weather.api';
import type { CurrentWeatherResponse } from '@/entities/weather/model/weather.types';
import { getCurrentPosition } from '@/shared/lib/geolocation';
import type { Address } from '@/shared/api/geocoding';
import { fetchAddressFromCoords } from '@/shared/api/geocoding';

export function HomePage() {
  const [coords, setCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [address, setAddress] = useState<Address | null>(null);

  const [addressError, setAddressError] = useState(false);

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

  // reverse geocoding
  useEffect(() => {
    if (!coords) return;

    fetchAddressFromCoords(coords.lat, coords.lon)
      .then(result => {
        setAddress(result);
        setAddressError(false);
      })
      .catch(() => {
        setAddress(null);
        setAddressError(true);
      });
  }, [coords]);

  // weather api query
  const {
    data: weather,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useQuery({
    queryKey: ['current-weather', coords?.lat, coords?.lon],
    queryFn: () => fetchCurrentWeather({ lat: coords!.lat, lon: coords!.lon }),
    enabled: !!coords,
  });

  if (error) {
    return <div>{error}</div>;
  }
  if (!coords) {
    return <div>위치 정보를 불러오는 중...</div>;
  }
  if (weatherLoading) return <div>날씨 정보를 불러오는 중...</div>;
  if (weatherError) return <div>날씨 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold">현재 위치: {address?.fullName ?? '위치 정보 없음'}</h2>

      <p>현재 기온: {weather.main.temp}°C</p>
      <p>최저 기온: {weather.main.temp_min}°C</p>
      <p>최고 기온: {weather.main.temp_max}°C</p>
    </div>
  );
}
