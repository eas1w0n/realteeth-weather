import { useNavigate, useParams } from 'react-router';
import AddIcon from '@/assets/icons/add.svg?react';
import CancelIcon from '@/assets/icons/cancel.svg?react';

import { WeatherDetail } from './WeatherDetail';

export function SearchWeatherPage() {
  const navigate = useNavigate();
  const { city } = useParams<{ city: string }>();

  const mock = {
    addressText: city ?? '',
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

  const handleAddFavorite = () => {
    // - 즐겨찾기에 추가
    console.log('즐겨찾기 추가:', city);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="relative mx-auto min-h-screen w-full max-w-150 space-y-4 px-4 py-6">
        {/* 🔝 헤더: X + + */}
        <header className="relative flex h-12 items-center justify-between">
          {/* X 버튼 */}
          <button
            className="p-2 text-gray-600 transition hover:text-black active:text-gray-400"
            onClick={() => navigate(-1)}
            aria-label="검색 화면으로 돌아가기">
            <CancelIcon className="h-8 w-8" />
          </button>

          {/* + 버튼 */}
          <button
            className="p-2 text-gray-600 transition hover:text-black active:text-gray-400"
            onClick={handleAddFavorite}
            aria-label="즐겨찾기 추가">
            <AddIcon className="h-8 w-8" />
          </button>
        </header>

        {/* 공통 날씨 상세 UI */}
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
