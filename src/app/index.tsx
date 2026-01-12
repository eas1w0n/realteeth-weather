import { Routes, Route } from 'react-router';
import { RootLayout } from './ui/RootLayout';

import { HomePage } from '@/pages/home/HomePage';

import { SearchPage } from '@/pages/search/ui/SearchPage';
import { FavoriteList } from '@/pages/search/ui/FavoriteList';
import { SearchResultList } from '@/pages/search/ui/SearchResultList';
import { FavoriteWeatherPage } from '@/pages/weather/ui/FavortieWeatherPage';
import { SearchWeatherPage } from '@/pages/weather/ui/SearchWeatherPage';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/search" element={<SearchPage />}>
          <Route index element={<FavoriteList />} />
          <Route path="result" element={<SearchResultList />} />
        </Route>
        <Route path="/search/weather/:city" element={<SearchWeatherPage />} />

        <Route path="/favorite/:city" element={<FavoriteWeatherPage />} />
      </Route>
    </Routes>
  );
}

export default App;
