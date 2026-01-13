import { useNavigate, useParams } from 'react-router';
import MenuIcon from '@/assets/icons/menu.svg?react';
import CancelIcon from '@/assets/icons/cancel.svg?react';

import { WeatherDetail } from '@/pages/weather/ui/WeatherDetail';
import { fetchGeocoding } from '@/shared/api/geocoding';
import { useQuery } from '@tanstack/react-query';
import { useWeather } from '@/entities/weather/hooks/useWeather';

export function FavoriteWeatherPage() {
  const navigate = useNavigate();
  const { city } = useParams<{ city: string }>();
  const address = decodeURIComponent(city ?? '');

  const {
    data: geo,
    isLoading: geoLoading,
    isError: geoError,
  } = useQuery({
    queryKey: ['geocoding', address],
    queryFn: () => fetchGeocoding(address),
    enabled: !!address,
  });

  // 좌표 변환
  const coords = geo ? { lat: geo.lat, lon: geo.lon } : null;

  // 날씨 조회
  const { data, isLoading: weatherLoading, isError: weatherError } = useWeather(coords);
  let content: React.ReactNode = null;

  if (geoLoading) {
    content = <p className="text-muted-foreground py-20 text-center text-sm">위치 정보를 불러오는 중입니다...</p>;
  } else if (!geo || geoError) {
    content = <p className="text-muted-foreground py-20 text-center text-sm">해당 장소의 정보가 제공되지 않습니다.</p>;
  } else if (weatherLoading) {
    content = <p className="text-muted-foreground py-20 text-center text-sm">날씨 정보를 불러오는 중입니다...</p>;
  } else if (!data || weatherError) {
    content = <p className="text-muted-foreground py-20 text-center text-sm">해당 장소의 정보가 제공되지 않습니다.</p>;
  } else {
    content = (
      <WeatherDetail
        addressText={data.address ?? address}
        temp={data.temp}
        min={data.min}
        max={data.max}
        hourlyTemps={data.hourlyTemps}
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="relative mx-auto min-h-screen w-full max-w-150 space-y-4 px-4 py-6">
        <header className="relative flex h-12 items-center justify-between">
          <button
            className="p-2 text-gray-600 transition hover:text-black active:text-gray-400"
            onClick={() => navigate(-1)}>
            <CancelIcon className="h-8 w-8" />
          </button>

          <button
            className="p-2 text-gray-600 transition hover:text-black active:text-gray-400"
            onClick={() => navigate('/search')}>
            <MenuIcon className="h-10 w-10" />
          </button>
        </header>

        {content}
      </main>
    </div>
  );
}
