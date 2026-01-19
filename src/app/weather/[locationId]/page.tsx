import { WeatherDetailWidget } from '@/widgets';
import React from 'react';

interface WeatherLocationProps {
  params: Promise<{
    locationId: string;
  }>;
}

const WeatherLocation = ({ params }: WeatherLocationProps) => {
  const { locationId } = React.use(params);

  return <WeatherDetailWidget location={locationId} />;
};

export default WeatherLocation;
