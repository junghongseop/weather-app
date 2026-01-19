interface HourlyItem {
  time: string;
  temp: number;
}

const HourlyTemperature = ({ hourly }: { hourly: HourlyItem[] }) => {
  return (
    <div className="flex gap-4 overflow-x-auto">
      {hourly.map((h) => (
        <div key={h.time} className="min-w-15 text-center">
          <p className="text-xs text-gray-500">{h.time.slice(0, 2)}시</p>
          <p className="font-medium">{h.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyTemperature;
