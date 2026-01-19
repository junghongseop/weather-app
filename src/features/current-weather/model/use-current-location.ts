'use client';

import { useEffect, useState } from 'react';

const useCurrentLocation = () => {
  const [location, setLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => setError('위치 권한이 필요합니다.')
    );
  }, []);

  return { location, error };
};

export default useCurrentLocation;
