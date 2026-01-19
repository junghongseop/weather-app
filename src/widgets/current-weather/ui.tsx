import { useCurrentWeatherQuery } from '@/features/current-weather';
import useCurrentLocation from '@/features/current-weather/model/use-current-location';
import CurrentWeatherSummary from '@/features/current-weather/ui/current-weather-information';
import HourlyTemperature from '@/features/current-weather/ui/hourly-temperature-chart';
import { WeatherForecastItem } from '@/shared/types/weather';

const CurrentWeatherWidget = () => {
  const { location, error } = useCurrentLocation();

  const { data, isLoading } = useCurrentWeatherQuery(
    location?.lat,
    location?.lon
  );

  if (error)
    return (
      <div className="flex mx-auto h-[calc(100vh-64px)] max-w-md text-center items-center justify-center text-3xl">
        {error}
      </div>
    );
  if (!location)
    return (
      <div className="flex mx-auto h-[calc(100vh-64px)] max-w-md text-center items-center justify-center text-3xl">
        위치 확인 중...
      </div>
    );
  if (isLoading || !data)
    return (
      <div className="flex mx-auto h-[calc(100vh-64px)] max-w-md text-center items-center justify-center text-3xl">
        날씨 불러오는 중...
      </div>
    );

  const todayDate = data[0].fcstDate;

  const today: WeatherForecastItem[] = data.filter(
    (item) => item.fcstDate === todayDate
  );

  const hourlyTemps: number[] = today
    .filter((item) => item.category === 'TMP')
    .map((item) => Number(item.fcstValue));

  const minTemp = Math.min(...hourlyTemps);
  const maxTemp = Math.max(...hourlyTemps);

  return (
    <main className="flex min-h-[calc(100vh-64px)] justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <h2 className="mb-6 text-3xl font-semibold">현재위치 날씨</h2>
        <CurrentWeatherSummary
          current={hourlyTemps[0]}
          min={minTemp}
          max={maxTemp}
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

export default CurrentWeatherWidget;
