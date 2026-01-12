import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router';

type FavoriteWeather = {
  id: number;
  city: string;
  temp: number;
  max: number;
  min: number;
};

export function FavoriteList() {
  const navigate = useNavigate();

  /** 임시 mock 데이터 */
  const favorites: FavoriteWeather[] = [
    { id: 1, city: '대전', temp: 31, max: 32, min: 21 },
    { id: 2, city: '대전', temp: 31, max: 32, min: 21 },
    { id: 3, city: '대전', temp: 31, max: 32, min: 21 },
    { id: 4, city: '대전', temp: 31, max: 32, min: 21 },
    { id: 5, city: '대전', temp: 31, max: 32, min: 21 },
    { id: 6, city: '대전', temp: 31, max: 32, min: 21 },
  ];

  return (
    <ul className="mt-5 space-y-5">
      {favorites.map(item => (
        <li key={item.id}>
          <Card
            className="cursor-pointer rounded-2xl border-0 bg-slate-100 px-6 py-5 transition-all duration-150 hover:bg-slate-200 hover:shadow-md active:scale-[0.98] active:bg-slate-300"
            onClick={() => {
              // 이후 상세 페이지로 연결
              // navigate(`/weather/${item.city}`);
              console.log(item.city);
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
          </Card>
        </li>
      ))}
    </ul>
  );
}
