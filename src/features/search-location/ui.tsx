import { IconButton, IconSearch, Input } from '@/shared/ui';
import { UseSearchLocationReturn } from './types';

interface Props {
  search: UseSearchLocationReturn;
}

const SearchLocation = ({ search }: Props) => {
  const { keyword, onChangeKeyword, handleSubmit, handleKeyDown } = search;

  return (
    <div className="flex items-center">
      <Input
        placeholder="지역을 검색하세요 (시·군·구·동)"
        value={keyword}
        onChange={(e) => onChangeKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconButton icon={IconSearch} onClick={handleSubmit} />
    </div>
  );
};

export default SearchLocation;
