'use client';

import { BookmarkList } from '@/features/bookmark-location';

const BookmarkWeatherListWidget = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <h2 className="mb-6 text-3xl font-semibold">즐겨찾기 지역</h2>
      <BookmarkList />
    </section>
  );
};

export default BookmarkWeatherListWidget;
