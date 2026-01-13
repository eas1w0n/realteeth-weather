import { useNavigate, useParams } from 'react-router';
import { useWeather } from '@/entities/weather/hooks/useWeather';

import AddIcon from '@/assets/icons/add.svg?react';
import CancelIcon from '@/assets/icons/cancel.svg?react';

import { WeatherDetail } from './WeatherDetail';
import { fetchGeocoding } from '@/shared/api/geocoding';
import { useQuery } from '@tanstack/react-query';

import { useFavoriteStore } from '@/entities/favortie/store/useFavoriteStore';

export function SearchWeatherPage() {
  const navigate = useNavigate();
  const { city } = useParams<{ city: string }>();
  const address = decodeURIComponent(city ?? '');

  const addFavorite = useFavoriteStore(state => state.addFavorite);
  const errorMessage = useFavoriteStore(state => state.errorMessage);

  const {
    data: geo,
    isLoading: geoLoading,
    isError: geoError,
  } = useQuery({
    queryKey: ['geocoding', address],
    queryFn: () => fetchGeocoding(address),
    enabled: !!address,
  });

  const coords = geo ? { lat: geo.lat, lon: geo.lon } : null;

  const { data, isLoading: weatherLoading, isError: weatherError } = useWeather(coords);

  const handleAddFavorite = () => {
    if (!data) return;

    const success = addFavorite({
      city: address,
      temp: data.temp,
      min: data.min,
      max: data.max,
    });

    if (success) {
      navigate('/search');
    }
  };

  let content: React.ReactNode = null;

  if (geoLoading) {
    content = <p className="text-muted-foreground py-20 text-center text-sm">위치 정보를 불러오는 중입니다...</p>;
  } else if (!geo || geoError) {
    content = <p className="text-muted-foreground py-20 text-center text-sm">해당 장소의 정보가 제공되지 않습니다.</p>;
  } else if (weatherLoading) {
    content = <p className="text-muted-foreground py-20 text-center text-sm">날씨 정보를 불러오는 중입니다...</p>;
  } else if (weatherError || !data) {
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
            onClick={handleAddFavorite}>
            <AddIcon className="h-8 w-8" />
          </button>
        </header>

        {content}

        {errorMessage && (
          <p className="mt-2 text-center text-base font-semibold text-red-500 sm:text-xl">{errorMessage}</p>
        )}
      </main>
    </div>
  );
}
