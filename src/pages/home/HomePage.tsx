import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getCurrentPosition } from '@/shared/lib/geolocation';
import { useHomeWeather } from '@/entities/weather/hooks/useWeather';
import MenuIcon from '@/assets/icons/menu.svg?react';
import { WeatherDetail } from '../weather/ui/WeatherDetail';

export function HomePage() {
  const [coords, setCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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
    <div className="flex min-h-screen items-center justify-center">
      <main className="relative mx-auto min-h-screen w-full max-w-150 space-y-4 px-4 py-6">
        {/* 헤더 */}
        <header className="flex h-12 items-center justify-end">
          <button
            className="absolute right-4 p-2 text-gray-600 transition hover:text-black active:text-gray-400"
            onClick={() => navigate('/search')}>
            <MenuIcon className="h-10 w-10" />
          </button>
        </header>

        <WeatherDetail
          addressText={addressText}
          temp={weatherQuery.data!.main.temp}
          max={forecastQuery.data!.max}
          min={forecastQuery.data!.min}
          hourlyTemps={forecastQuery.data!.hourlyTemps}
        />
      </main>
    </div>
  );
}
