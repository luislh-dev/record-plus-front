import { Search as SearchIcon } from '@/icons/Search';
import { Button, Input } from '@nextui-org/react';
import { useSearchPeopleStore } from '../stores/useSearchStore';

export const Search = () => {
  const { tempSearchTerm, setSearchTerm, setTempSearchTerm } = useSearchPeopleStore();

  const handleSearch = () => {
    setSearchTerm(tempSearchTerm);
  };

  const handleClear = () => {
    setTempSearchTerm('');
    setSearchTerm('');
  };

  return (
    <div className="flex gap-2">
      <Input
        classNames={{
          base: 'max-w-full sm:max-w-[15rem] h-10',
          mainWrapper: 'h-full',
          input: 'text-small',
          inputWrapper:
            'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
        }}
        placeholder="Buscar..."
        value={tempSearchTerm}
        onChange={e => setTempSearchTerm(e.target.value)}
        startContent={<SearchIcon className="text-default-400" />}
        isClearable
        onClear={handleClear}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button onPress={handleSearch} color="primary">
        Buscar
      </Button>
    </div>
  );
};
