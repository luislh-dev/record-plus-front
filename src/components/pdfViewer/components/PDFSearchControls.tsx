import { Divider } from '@heroui/react';
import { SearchNavigationControls } from './SearchNavigationControls';
import { SearchBar } from './searchControl/SearchBar';

export const PDFSearchControls = () => {
  return (
    <div className='flex items-center gap-2'>
      <SearchBar />

      <Divider orientation='vertical' className='h-8 bg-[#52525b]' />

      <SearchNavigationControls />
    </div>
  );
};
