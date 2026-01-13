import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTemp } from '@/shared/lib/utils';

interface Props {
  addressText: string;
  temp: number;
  max: number;
  min: number;
  hourlyTemps: { time: string; temp: number }[];
}

export function WeatherDetail({ addressText, temp, max, min, hourlyTemps }: Props) {
  return (
    <>
      <section className="flex flex-col items-center gap-6 py-3 pt-0">
        <p className="text-xl sm:text-4xl">{addressText}</p>

        <p className="text-6xl leading-none font-semibold sm:text-8xl">{formatTemp(temp)}°</p>

        <p className="text-muted-foreground text-base sm:text-2xl">
          최고:{formatTemp(max)}° 최저:{formatTemp(min)}°
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium sm:text-xl">오늘 시간대별 기온</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {hourlyTemps.map(item => (
              <li
                key={item.time}
                className="flex justify-between border-b border-gray-200 p-2 text-xl last:border-b-0 sm:text-2xl">
                <span className="text-muted-foreground">{item.time}</span>
                <span className="font-medium">{formatTemp(item.temp)}°</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
