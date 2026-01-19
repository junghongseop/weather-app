'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';

export const useSearchLocation = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [districts, setDistricts] = useState<string[]>([]);

  useEffect(() => {
    fetch('/korea_districts.json')
      .then((res) => res.json())
      .then((data: string[]) => setDistricts(data));
  }, []);

  const results = useMemo(() => {
    if (!keyword.trim()) return [];
    return districts.filter((item) => item.includes(keyword));
  }, [keyword, districts]);

  const onChangeKeyword = (value: string) => {
    setKeyword(value);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleCloseResult = () => {
    setIsSubmitted(false);
  };

  const handleSelectLocation = (location: string) => {
    router.push(
      `/weather/${encodeURIComponent(location.replace(/\(.*?\)/g, '').trim())}`
    );
    handleCloseResult();
  };

  return {
    keyword,
    onChangeKeyword,
    handleSubmit,
    handleKeyDown,
    results,
    isSubmitted,
    hasResult: results.length > 0,
    handleSelectLocation,
    handleCloseResult,
  };
};
