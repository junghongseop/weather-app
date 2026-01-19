'use client';

import { IconButton, IconBookmark, IconActiveBookmark } from '@/shared/ui';
import { useBookmarkLocation } from '../model/use-bookmark-location';

interface Props {
  id: string;
  label: string;
  bookmark: ReturnType<typeof useBookmarkLocation>;
}

const BookmarkButton = ({ id, label, bookmark }: Props) => {
  const { isBookmarks, toggleBookmark } = bookmark;
  const active = isBookmarks(id);

  return (
    <IconButton
      icon={active ? IconActiveBookmark : IconBookmark}
      onClick={() =>
        toggleBookmark({
          id,
          label,
        })
      }
    />
  );
};

export default BookmarkButton;
