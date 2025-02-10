import { Search } from '@/icons/Search';
import { Input } from '@heroui/react';

import { usePDFStore } from '../../store/usePDFStore';

export const SearchBar = () => {
  const pdfDoc = usePDFStore((state) => state.pdfDoc);
  const scale = usePDFStore((state) => state.scale);
  const searchText = usePDFStore((state) => state.searchText);
  const setSearchText = usePDFStore((state) => state.setSearchText);
  const searchInDocument = usePDFStore((state) => state.searchInDocument);
  const clearSearch = usePDFStore((state) => state.clearSearch);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pdfDoc && searchText.trim()) {
      await searchInDocument(pdfDoc, scale);
    }
  };

  const handleClear = () => {
    clearSearch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <search>
      <form onSubmit={handleSearch} className='flex items-center gap-2'>
        <Input
          size='sm'
          value={searchText}
          placeholder='Enter para buscar'
          onChange={handleChange}
          startContent={<Search aria-hidden='true' className='w-4 h-4 text-gray-400' />}
          type='search'
          isClearable
          onClear={handleClear}
          variant='bordered'
        />
      </form>
    </search>
  );
};
