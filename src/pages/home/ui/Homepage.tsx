import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchCurrentWeather } from '@/entities/weather/api/weather.api';
import type { CurrentWeatherResponse } from '@/entities/weather/model/weather.types';
import { getCurrentPosition } from '@/shared/lib/geolocation';

export function HomePage() {
  const [coords, setCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

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

  if (error) {
    return <div>{error}</div>;
  }

  if (!coords) {
    return <div>위치 정보를 불러오는 중...</div>;
  }

  return (
    <div className="p-5">
      <div className="p-5">
        <h2>현재 위치 정보</h2>

        <div>
          <p>lat: {coords.lat}</p>
          <p>lon: {coords.lon}</p>
        </div>
      </div>
    </div>
  );
}
