import { Search } from '@/icons/Search';
import { Input } from '@nextui-org/react';

import { usePDFStore } from '../../store/usePDFStore';

export const SearchBar = () => {
  const pdfDoc = usePDFStore(state => state.pdfDoc);
  const scale = usePDFStore(state => state.scale);
  const searchText = usePDFStore(state => state.searchText);
  const setSearchText = usePDFStore(state => state.setSearchText);
  const searchInDocument = usePDFStore(state => state.searchInDocument);
  const clearSearch = usePDFStore(state => state.clearSearch);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pdfDoc) {
      await searchInDocument(pdfDoc, scale);
    }
  };

  return (
    <search>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <Input
          size="sm"
          value={searchText}
          placeholder="Enter para buscar"
          onChange={e => setSearchText(e.target.value)}
          startContent={<Search aria-hidden="true" className="w-4 h-4  text-gray-400" />}
          type="search"
          isClearable
          onClear={clearSearch}
          variant="bordered"
        />
      </form>
    </search>
  );
};
