import { useQuery } from '@tanstack/react-query';
import { fetchCurrentWeather } from '@/entities/weather/api/weather.api';
import type { CurrentWeatherResponse } from '@/entities/weather/model/weather.types';

export function HomePage() {
  // 서울 테스트
  const lat = 37.5665;
  const lon = 126.978;

  const { data, isLoading, error } = useQuery<CurrentWeatherResponse>({
    queryFn: () => fetchCurrentWeather({ lat, lon }),
    queryKey: ['weather', lat, lon],
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {(error as Error).message}</p>;
  if (!data) return null;

  return (
    <div className="p-5">
      <h1>현재 날씨 테스트</h1>

      <div>
        <p>설명: {data.weather[0]?.description}</p>
        <p>현재: {data.main.temp}°C</p>
        <p>최저: {data.main.temp_min}°C</p>
        <p>최고: {data.main.temp_max}°C</p>
      </div>

      <pre className="mt-4 overflow-auto rounded bg-gray-100 p-4 text-xs">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
