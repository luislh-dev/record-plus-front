import { Search } from '@/icons/Search';
import { Input } from '@heroui/react';
import { useSearchStoreRecordDetail } from '../store/useSearchStoreRecordDetail';

export const SearchRecordDetail = () => {
  const { setSearchTerm } = useSearchStoreRecordDetail();

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
