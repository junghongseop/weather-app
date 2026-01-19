import { useQuery } from '@tanstack/react-query';

const useDistrictGridQuery = (location?: string) => {
  return useQuery<{
    name: string;
    nx: number;
    ny: number;
  } | null>({
    queryKey: ['district-grid', location],
    enabled: typeof location === 'string' && location.length > 0,
    queryFn: async () => {
      const res = await fetch('/korea_districts.json');
      if (!res.ok) throw new Error('district json load fail');

      const list: string[] = await res.json();

      const normalize = (value: string) => value.replaceAll('-', ' ').trim();

      for (const item of list) {
        const match = item.match(/^(.*)\((\d+)-(\d+)\)$/);
        if (!match) continue;

        const [, name, nx, ny] = match;
        console.log({ name, nx, ny });

        if (normalize(name) === normalize(location!)) {
          return {
            name: name.trim(),
            nx: Number(nx),
            ny: Number(ny),
          };
        }
      }

      return null;
    },
    staleTime: Infinity,
  });
};

export default useDistrictGridQuery;
