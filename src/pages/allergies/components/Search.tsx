import { Search } from '@/icons/Search';
import { Input } from '@heroui/react';
import { useSearchStore } from '../stores/searchStore';

export const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();

  return (
    <Input
      type='text'
      placeholder='Buscar alergía...'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onClear={() => setSearchTerm('')}
      isClearable
      startContent={<Search />}
    />
  );
};
