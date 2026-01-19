'use client';

import {
  BookmarkButton,
  useBookmarkLocation,
} from '@/features/bookmark-location';
import { SearchLocation } from '@/features/search-location';
import { useSearchLocation } from '@/features/search-location';
import { useEffect, useRef } from 'react';

const SearchWeather = () => {
  const search = useSearchLocation();
  const bookmark = useBookmarkLocation();
  const {
    results,
    hasResult,
    isSubmitted,
    handleSelectLocation,
    handleCloseResult,
  } = search;

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        handleCloseResult();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleCloseResult]);

  const visibleResults = results.slice(0, 5);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <SearchLocation search={search} />
      {isSubmitted && (
        <div className="absolute left-0 right-0 mt-3 rounded-md bg-white shadow">
          {hasResult ? (
            <ul>
              {visibleResults.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectLocation(item)}
                >
                  {item.replaceAll('-', ' ')}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <BookmarkButton
                      id={item}
                      label={item.replaceAll('-', ' ')}
                      bookmark={bookmark}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center px-4 py-3  text-gray-500 text-sm sm:text-base md:text-base">
              해당 장소의 정보가 제공되지 않습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWeather;
