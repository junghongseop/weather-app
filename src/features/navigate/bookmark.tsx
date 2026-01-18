import { IconBookmark, IconButton } from '@/shared/ui';
import { useRouter } from 'next/navigation';

const BookmarkNavigateButton = () => {
  const router = useRouter();

  const handleMoveBookmarks = () => {
    router.push('/bookmarks');
  };

  return <IconButton icon={IconBookmark} onClick={handleMoveBookmarks} />;
};

export default BookmarkNavigateButton;
