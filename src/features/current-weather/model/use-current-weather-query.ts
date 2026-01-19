import { getWeather } from '@/shared/api';
import { convertLatLngToGrid } from '@/shared/lib';
import { WeatherForecastItem } from '@/shared/types/weather';
import { useQuery } from '@tanstack/react-query';

const useCurrentWeatherQuery = (lat?: number, lon?: number) => {
  return useQuery<WeatherForecastItem[]>({
    queryKey: ['current-weather', lat, lon],
    enabled: !!lat && !!lon,
    queryFn: async () => {
      const { nx, ny } = convertLatLngToGrid(lat!, lon!);
      return getWeather(nx, ny);
    },
  });
};

export default useCurrentWeatherQuery;
