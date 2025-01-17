import { Divider } from '@nextui-org/react';
import { SearchBar } from './searchControl/SearchBar';
import { SearchNavigationControls } from './SearchNavigationControls';

export const PDFSearchControls = () => {
  return (
    <div className="flex items-center gap-2">
      <SearchBar />

      <Divider orientation="vertical" className="h-8 bg-[#52525b]" />

      <SearchNavigationControls />
    </div>
  );
};
