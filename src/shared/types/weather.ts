export type WeatherCategory =
  | 'TMP'
  | 'TMN'
  | 'TMX'
  | 'POP'
  | 'PTY'
  | 'SKY'
  | 'REH'
  | 'WSD';

export interface WeatherForecastItem {
  baseDate: string;
  baseTime: string;
  category: WeatherCategory;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}
