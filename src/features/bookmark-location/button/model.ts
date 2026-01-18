'use client';

import { MAX_BOOKMARKS, STORAGE_KEY } from '@/shared/config/constants';
import { useState } from 'react';

type BookmarkLocation = {
  id: string;
  label: string;
};

export const useBookmarkLocation = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkLocation[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch {
      return [];
    }
  });

  const isBookmarks = (id: string) => bookmarks.some((item) => item.id === id);

  const toggleBookmark = (location: BookmarkLocation) => {
    const current = bookmarks;

    const exists = current.some((item) => item.id === location.id);

    if (!exists && current.length >= MAX_BOOKMARKS) {
      alert(`즐겨찾기는 최대 ${MAX_BOOKMARKS}개까지 저장할 수 있습니다.`);
      return;
    }

    setBookmarks((prev) => {
      if (exists) {
        const next = prev.filter((item) => item.id !== location.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      }

      const next = [...prev, location];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { bookmarks, isBookmarks, toggleBookmark };
};
