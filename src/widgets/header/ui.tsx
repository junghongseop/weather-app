'use client';

import {
  BookmarkNavigateButton,
  HomeNavigateButton,
} from '@/features/navigate';
import SearchWeather from '../search-weather/ui';

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-4 box-border border-b border-gray-200">
      <SearchWeather />
      <div className="flex items-center gap-1">
        <HomeNavigateButton />
        <BookmarkNavigateButton />
      </div>
    </header>
  );
};

export default Header;
