import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getCurrentPosition } from '@/shared/lib/geolocation';
import { useWeather } from '@/entities/weather/hooks/useWeather';
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

  const { data, isLoading, isError } = useWeather(coords);

  // -------- UI 분기 --------
  if (error) return <div>{error}</div>;
  if (!coords)
    return (
      <div className="text-muted-foreground flex min-h-screen items-center justify-center text-center text-sm">
        위치 정보를 불러오는 중...
      </div>
    );

  if (isLoading)
    return (
      <div className="text-muted-foreground flex min-h-screen items-center justify-center text-center text-sm">
        날씨 정보를 불러오는 중...
      </div>
    );
  if (isError || !data)
    return (
      <div className="text-muted-foreground flex min-h-screen items-center justify-center text-center text-sm">
        날씨 정보를 불러올 수 없습니다.
      </div>
    );

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
        <p className="text-muted-foreground flex items-center justify-center text-sm sm:text-base">현재 위치</p>
        <WeatherDetail
          addressText={data.address ?? '위치 정보 없음'}
          temp={data.temp}
          max={data.max}
          min={data.min}
          hourlyTemps={data.hourlyTemps}
        />
      </main>
    </div>
  );
}
