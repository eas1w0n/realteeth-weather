import { useNavigate, useParams } from 'react-router';
import MenuIcon from '@/assets/icons/menu.svg?react';

import { WeatherDetail } from '@/pages/weather/ui/WeatherDetail';

export function FavoriteWeatherPage() {
  const navigate = useNavigate();
  const { city } = useParams<{ city: string }>();

  // 임시 mock 데이터
  const mock = {
    addressText: city ?? '알 수 없음',
    temp: 31,
    max: 32,
    min: 21,
    hourlyTemps: [
      { time: '09시', temp: 26 },
      { time: '12시', temp: 30 },
      { time: '15시', temp: 31 },
      { time: '18시', temp: 29 },
    ],
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="relative mx-auto min-h-screen w-full max-w-150 space-y-4 px-4 py-6">
        <header className="flex h-12 items-center justify-end">
          <button
            className="absolute right-4 p-2 text-gray-600 transition hover:text-black active:text-gray-400"
            onClick={() => navigate('/search')}>
            <MenuIcon className="h-10 w-10" />
          </button>
        </header>

        <WeatherDetail
          addressText={mock.addressText}
          temp={mock.temp}
          max={mock.max}
          min={mock.min}
          hourlyTemps={mock.hourlyTemps}
        />
      </main>
    </div>
  );
}
