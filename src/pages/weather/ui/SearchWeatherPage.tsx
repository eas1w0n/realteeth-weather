import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import AddIcon from '@/assets/icons/add.svg?react';
import CancelIcon from '@/assets/icons/cancel.svg?react';

import { WeatherDetail } from './WeatherDetail';
import { fetchGeocoding } from '@/shared/api/geocoding';

export function SearchWeatherPage() {
  const navigate = useNavigate();
  const { city } = useParams<{ city: string }>();
  const address = decodeURIComponent(city ?? '');

  const {
    data: geo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['geocoding', address],
    queryFn: () => fetchGeocoding(address),
    enabled: !!address,
  });

  const handleAddFavorite = () => {
    // - 즐겨찾기에 추가
    // - 즐겨찾기 목록 페이지로 이동
    console.log('즐겨찾기 추가:', address);
  };

  let content: React.ReactNode = null;

  if (isLoading) {
    content = <p className="text-muted-foreground py-20 text-center text-sm">위치 정보를 불러오는 중입니다...</p>;
  } else if (!geo || isError) {
    content = <p className="text-muted-foreground py-20 text-center text-sm">해당 장소의 정보가 제공되지 않습니다.</p>;
  } else {
    const mock = {
      addressText: address,
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

    content = (
      <WeatherDetail
        addressText={mock.addressText}
        temp={mock.temp}
        max={mock.max}
        min={mock.min}
        hourlyTemps={mock.hourlyTemps}
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
            onClick={handleAddFavorite}>
            <AddIcon className="h-8 w-8" />
          </button>
        </header>

        {content}
      </main>
    </div>
  );
}
