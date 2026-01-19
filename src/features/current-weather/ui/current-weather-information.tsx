interface CurrentWeatherSummaryProps {
  locationName?: string;
  current: number;
  min: number;
  max: number;
}

const CurrentWeatherSummary = ({
  locationName,
  current,
  min,
  max,
}: CurrentWeatherSummaryProps) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <p className="text-sm text-gray-500">{locationName}</p>
      <p className="text-4xl font-bold">{current}°C</p>
      <p className="mt-2 text-sm text-gray-600">
        최고 {max}°C / 최저 {min}°C
      </p>
    </div>
  );
};

export default CurrentWeatherSummary;
