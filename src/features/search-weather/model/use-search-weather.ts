import { getWeather } from '@/shared/api';
import { WeatherForecastItem } from '@/shared/types/weather';
import { useQuery } from '@tanstack/react-query';

const useSearchWeatherQuery = (lat?: number, lon?: number) => {
  return useQuery<WeatherForecastItem[]>({
    queryKey: ['current-weather', lat, lon],
    enabled: !!lat && !!lon,
    queryFn: async () => {
      return getWeather(lat!, lon!);
    },
  });
};

export default useSearchWeatherQuery;
