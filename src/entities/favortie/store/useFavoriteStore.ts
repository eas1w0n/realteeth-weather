import { create } from 'zustand';

export interface FavoriteWeather {
  id: number;
  city: string;
  alias?: string;
  temp: number;
  max: number;
  min: number;
}

interface FavoriteState {
  favorites: FavoriteWeather[];
  errorMessage: string | null;
  addFavorite: (item: Omit<FavoriteWeather, 'id'>) => boolean;
  removeFavorite: (id: number) => void;
  updateAlias: (id: number, alias: string) => void;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  errorMessage: null,

  addFavorite: item => {
    const { favorites } = get();

    // 최대 개수 제한
    if (favorites.length >= 6) {
      set({ errorMessage: '즐겨찾기는 최대 6개까지 추가할 수 있어요.' });
      return false;
    }

    // 중복(도시명 기준) 방지
    const exists = favorites.some(f => f.city === item.city);
    if (exists) {
      return false;
    }

    set({
      favorites: [...favorites, { id: Date.now(), ...item }],
      errorMessage: null,
    });

    return true;
  },

  removeFavorite: id =>
    set(state => ({
      favorites: state.favorites.filter(f => f.id !== id),
    })),

  updateAlias: (id, alias) =>
    set(state => ({
      favorites: state.favorites.map(f => (f.id === id ? { ...f, alias } : f)),
    })),
}));
