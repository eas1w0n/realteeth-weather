import type { ForecastItem } from '../model/forecast.types';

// 오늘 날짜
export function getTodayForecast(list: ForecastItem[]): ForecastItem[] {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const today = `${year}-${month}-${day}`;

  return list.filter(item => item.dt_txt.startsWith(today));
}

// 최저/ 최고
export function getMinMaxTemp(todayList: ForecastItem[]) {
  const temps = todayList.map(item => item.main.temp);

  return {
    min: Math.min(...temps),
    max: Math.max(...temps),
  };
}

// 시간대별
export function getHourlyTemps(todayList: ForecastItem[]) {
  return todayList.map(item => ({
    time: item.dt_txt.slice(11, 16),
    temp: item.main.temp,
  }));
}
