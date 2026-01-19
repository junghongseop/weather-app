import {
  IconButton,
  IconActiveBookmark,
  IconPencil,
  IconCancel,
  IconCheck,
} from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useBookmarkLocation } from '../model/use-bookmark-location';
import { useSearchWeatherQuery } from '@/features/search-weather';

interface Props {
  id: string;
  label: string;
  onRemove: () => void;
  onUpdate: (nextLabel: string) => void;
}

const BookmarkCard = ({ id, label, onRemove, onUpdate }: Props) => {
  const router = useRouter();
  const { parseGridFromId } = useBookmarkLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(label);

  const handleCardClick = () => {
    if (isEditing) return;
    router.push(
      `/weather/${encodeURIComponent(id.replace(/\(.*?\)/g, '').trim())}`
    );
  };

  const handleEdit = () => {
    setDraft(label);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(label);
    setIsEditing(false);
  };

  const handleEditConfirm = () => {
    if (draft.trim() && draft !== label) {
      onUpdate(draft.trim());
    }
    setIsEditing(false);
  };

  const grid = parseGridFromId(id);
  const nx = grid?.nx;
  const ny = grid?.ny;
  const { data } = useSearchWeatherQuery(nx, ny);

  const today = data?.filter((item) => item.fcstDate === data[0].fcstDate);

  const hourlyTemps =
    today
      ?.filter((item) => item.category === 'TMP')
      .map((item) => Number(item.fcstValue)) ?? [];

  const current = hourlyTemps[0];
  const max = Math.max(...hourlyTemps);
  const min = Math.min(...hourlyTemps);

  if (!grid) {
    return (
      <div className="flex items-center justify-between rounded-lg border p-4">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-sm text-gray-400">날씨 정보 없음</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex mx-auto h-[calc(100vh-64px)] max-w-md text-center items-center justify-center text-3xl">
        불러오는 중...
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm transition hover:shadow"
      onClick={handleCardClick}
    >
      {isEditing ? (
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full mr-3 rounded border px-2 py-1 text-sm focus:outline-none focus:ring"
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800">{label}</span>
          <span className="text-sm font-medium text-gray-800">
            현재 {current}°C / 최고 {max}°C / 최저 {min}°C
          </span>
        </div>
      )}
      <div
        className="flex items-center gap-1"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {isEditing ? (
          <>
            <IconButton icon={IconCancel} onClick={handleCancel} />
            <IconButton icon={IconCheck} onClick={handleEditConfirm} />
          </>
        ) : (
          <>
            <IconButton icon={IconPencil} onClick={handleEdit} />
            <IconButton icon={IconActiveBookmark} onClick={onRemove} />
          </>
        )}
      </div>
    </div>
  );
};

export default BookmarkCard;
