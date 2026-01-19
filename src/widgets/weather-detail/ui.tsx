'use client';

import CurrentWeatherSummary from '@/features/current-weather/ui/current-weather-information';
import HourlyTemperature from '@/features/current-weather/ui/hourly-temperature-chart';
import { useDistrictGridQuery } from '@/features/location';
import { useSearchWeatherQuery } from '@/features/search-weather';

interface WeatherDetailWidgetProps {
  location: string;
}

const WeatherDetailWidget = ({ location }: WeatherDetailWidgetProps) => {
  const { data: district, isLoading: isDistrictLoading } = useDistrictGridQuery(
    decodeURIComponent(location)
  );

  const { data, isLoading: isWeatherLoading } = useSearchWeatherQuery(
    district?.nx,
    district?.ny
  );

  if (isDistrictLoading || isWeatherLoading)
    return (
      <div className="flex mx-auto h-[calc(100vh-64px)] max-w-md text-center items-center justify-center text-3xl">
        불러오는 중...
      </div>
    );

  if (!data) return;

  const todayDate = data[0].fcstDate;

  const today = data.filter((item) => item.fcstDate === todayDate);

  const hourlyTemps = today
    .filter((item) => item.category === 'TMP')
    .map((item) => Number(item.fcstValue));

  const decodeLocation = decodeURIComponent(location);

  return (
    <main className="flex min-h-[calc(100vh-64px)] justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <h2 className="mb-4 text-3xl font-semibold">{decodeLocation}</h2>

        <CurrentWeatherSummary
          current={hourlyTemps[0]}
          min={Math.min(...hourlyTemps)}
          max={Math.max(...hourlyTemps)}
        />

        <HourlyTemperature
          hourly={today
            .filter((item) => item.category === 'TMP')
            .map((item) => ({
              time: item.fcstTime,
              temp: Number(item.fcstValue),
            }))}
        />
      </div>
    </main>
  );
};

export default WeatherDetailWidget;
