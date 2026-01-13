import { useNavigate, useParams } from 'react-router';

import CancelIcon from '@/assets/icons/cancel.svg?react';
import EditIcon from '@/assets/icons/pencil.svg?react';

import { WeatherDetail } from '@/pages/weather/ui/WeatherDetail';
import { fetchGeocoding } from '@/shared/api/geocoding';
import { useQuery } from '@tanstack/react-query';
import { useWeather } from '@/entities/weather/hooks/useWeather';
import { useFavoriteStore } from '@/entities/favortie/store/useFavoriteStore';
import { useState } from 'react';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';

export function FavoriteWeatherPage() {
  const navigate = useNavigate();
  const { city } = useParams<{ city: string }>();
  const address = decodeURIComponent(city ?? '');

  const favorite = useFavoriteStore(state => state.favorites.find(f => f.city === city));

  const updateAlias = useFavoriteStore(state => state.updateAlias);

  const [alias, setAlias] = useState(favorite?.alias ?? '');
  const [isEditMode, setIsEditMode] = useState(false);

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
            onClick={() => setIsEditMode(prev => !prev)}>
            <EditIcon className="h-10 w-10" />
          </button>
        </header>

        {/* 보기 모드: 별칭 표시 */}
        {!isEditMode && favorite?.alias && (
          <p className="text-muted-foreground mb-2 text-center text-sm">{favorite.alias}</p>
        )}

        {isEditMode && (
          <div className="mb-4 rounded-full border-0">
            <InputGroup className="h-12 rounded-full bg-white px-4 text-sm focus:bg-white">
              <InputGroupInput
                value={alias}
                onChange={e => setAlias(e.target.value)}
                placeholder="별칭을 입력해주세요 (예: 우리집)"
              />

              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  className="h-8 w-15 bg-gray-600 text-white transition-colors active:bg-gray-400"
                  onClick={() => {
                    if (!favorite) return;
                    updateAlias(favorite.id, alias.trim());
                    setIsEditMode(false);
                  }}>
                  저장
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        )}

        {content}
      </main>
    </div>
  );
}
