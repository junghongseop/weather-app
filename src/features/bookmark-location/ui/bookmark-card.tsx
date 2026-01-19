import {
  IconButton,
  IconActiveBookmark,
  IconPencil,
  IconCancel,
  IconCheck,
} from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  id: string;
  label: string;
  onRemove: () => void;
  onUpdate: (nextLabel: string) => void;
}

const BookmarkCard = ({ id, label, onRemove, onUpdate }: Props) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(label);

  const handleCardClick = () => {
    if (isEditing) return;
    router.push(`/weather/${encodeURIComponent(id)}`);
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
        <div className='flex flex-col'>
          <span className="text-sm font-medium text-gray-800">{label}</span>
          <span className="text-sm font-medium text-gray-800">
            현재 -5°C / 최고 -10°C / 최저 -20°C
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
