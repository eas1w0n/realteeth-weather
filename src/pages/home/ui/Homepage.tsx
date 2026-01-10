import { useEffect, useState } from 'react';
import { getCurrentPosition } from '@/shared/lib/geolocation';
import { useHomeWeather } from '@/entities/weather/hooks/useWeather';

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

  const { weatherQuery, forecastQuery, addressQuery } = useHomeWeather(coords);

  // -------- UI 분기 --------
  if (error) return <div>{error}</div>;
  if (!coords) return <div>위치 정보를 불러오는 중...</div>;

  if (weatherQuery.isLoading || forecastQuery.isLoading) return <div>날씨 정보를 불러오는 중...</div>;
  if (weatherQuery.isError || forecastQuery.isError) return <div>날씨 정보를 불러올 수 없습니다.</div>;

  const addressText = addressQuery.isLoading
    ? '위치 이름 불러오는 중...'
    : addressQuery.isError
      ? '위치 정보 없음'
      : (addressQuery.data?.fullName ?? '위치 정보 없음');

  return (
    <div className="p-5">
      <h1 className="text-lg font-bold">현재 위치: {addressText}</h1>

      <p>현재 기온: {weatherQuery.data!.main.temp}°C</p>
      <p>최저 기온: {forecastQuery.data!.min}°C</p>
      <p>최고 기온: {forecastQuery.data!.max}°C</p>

      <h3 className="mt-4 font-bold">오늘 시간대별 기온</h3>
      <ul>
        {forecastQuery.data!.hourlyTemps.map(item => (
          <li key={item.time}>
            {item.time} / {item.temp}°C
          </li>
        ))}
      </ul>
    </div>
  );
}
