import { Search } from '@/icons/Search';
import { Input } from '@heroui/react';
import { useRecordDetailSearch } from '../hooks/useRecordDetailSearch';

export const SearchRecordDetail = () => {
  const { setSearchTerm } = useRecordDetailSearch();

  return (
    <Input
      startContent={<Search />}
      type='search'
      placeholder='Ingrese el nombre del hospital'
      variant='bordered'
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};
