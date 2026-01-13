import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router';
import MinusIcon from '@/assets/icons/minus.svg?react';
import TrashIcon from '@/assets/icons/trash.svg?react';

import { useFavoriteStore } from '@/entities/favortie/store/useFavoriteStore';

export function FavoriteList() {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const favorites = useFavoriteStore(state => state.favorites);
  const removeFavorite = useFavoriteStore(state => state.removeFavorite);

  return (
    <ul className="mt-5 space-y-5">
      {favorites.map(item => (
        <li key={item.id} className="flex items-center gap-2">
          <button
            className="flex h-6 w-6 items-center justify-center text-gray-500"
            onClick={() => setIsEditMode(prev => !prev)}>
            <MinusIcon />
          </button>
          <Card
            className={`relative flex-1 rounded-2xl border-0 bg-slate-100 px-6 py-5 transition-all duration-150 ${!isEditMode ? 'cursor-pointer hover:bg-slate-200 hover:shadow-md active:scale-[0.98] active:bg-slate-300' : ''} ${isEditMode ? 'pr-14' : ''} `}
            onClick={() => {
              if (isEditMode) return;
              navigate(`/favorite/${item.city}`);
            }}>
            <div className="flex items-center justify-between">
              {/* 도시명 */}
              <p className="text-xl sm:text-2xl">{item.city}</p>

              {/* 온도 영역 */}
              <div className="text-right">
                <p className="text-3xl leading-none sm:text-5xl">{item.temp}</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  최고:{item.max}° 최저:{item.min}°
                </p>
              </div>
            </div>

            {/* 편집 모드_휴지통 */}
            {isEditMode && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  removeFavorite(item.id);
                }}
                className="absolute top-1/2 right-2 -translate-y-1/2 transition hover:scale-110 active:scale-95">
                <TrashIcon />
              </button>
            )}
          </Card>
        </li>
      ))}
    </ul>
  );
}
