import { create } from 'zustand';

export type FavoriteWeather = {
  id: number;
  city: string;
  temp: number;
  max: number;
  min: number;
};

type FavoriteState = {
  favorites: FavoriteWeather[];
  addFavorite: (item: Omit<FavoriteWeather, 'id'>) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (city: string) => boolean;
};

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],

  addFavorite: item =>
    set(state => {
      // 중복(도시명 기준) 방지
      const exists = state.favorites.some(f => f.city === item.city);
      if (exists) return state;

      return {
        favorites: [
          ...state.favorites,
          {
            id: Date.now(),
            ...item,
          },
        ],
      };
    }),

  removeFavorite: id =>
    set(state => ({
      favorites: state.favorites.filter(f => f.id !== id),
    })),

  isFavorite: city => get().favorites.some(f => f.city === city),
}));
