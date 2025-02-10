import { Input } from "@heroui/react";
import { useSearchStore } from '../stores/searchStore';
import { Search } from '@/icons/Search';

export const SearchImput = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();

  return (
    <Input
      classNames={{
        base: 'max-w-full sm:max-w-[15rem] h-10',
        mainWrapper: 'h-full',
        input: 'text-small',
        inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
      }}
      onClear={() => setSearchTerm('')}
      type="text"
      placeholder="Buscar hospital..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      startContent={<Search />}
    />
  );
};
