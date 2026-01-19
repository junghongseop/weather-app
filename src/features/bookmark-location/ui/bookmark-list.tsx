import { useBookmarkLocation } from '../model/use-bookmark-location';
import BookmarkCard from './bookmark-card';

const BookmarkList = () => {
  const { bookmarks, toggleBookmark, handleUpdateBookmarkLabel } =
    useBookmarkLocation();

  if (bookmarks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-lg text-gray-500">
        저장된 즐겨찾기 장소가 없습니다.
      </div>
    );
  }

  return (
    <div
      className="
        grid gap-4
        grid-cols-1

      "
    >
      {bookmarks.map((item) => (
        <BookmarkCard
          key={item.id}
          id={item.id}
          label={item.label}
          onRemove={() => {
            toggleBookmark(item);
            window.location.reload();
          }}
          onUpdate={(nextLabel) =>
            handleUpdateBookmarkLabel(item.id, nextLabel)
          }
        />
      ))}
    </div>
  );
};

export default BookmarkList;
