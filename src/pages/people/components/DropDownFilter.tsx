import { Tune } from '@/icons/Tune';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Radio,
  RadioGroup,
} from '@heroui/react';
import { SEARCH_PARAMS } from '../constants/SearchParams';
import { usePersonSearch } from '../hooks/usePersonSearch';
import { useSearchPeopleStore } from '../stores/useSearchStore';
import type { SearchFieldKeys } from '../types/PeopleRequestParams';

export const DropDownFilter = () => {
  const { searchTerm, selectedSearchField, setSelectedSearchField } = useSearchPeopleStore();
  const { refetch } = usePersonSearch();
  const handleSearchParamChange = (selectedValue: string) => {
    setSelectedSearchField(selectedValue as SearchFieldKeys);
    if (searchTerm !== '') refetch();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button startContent={<Tune />}>Filtrar</Button>
      </DropdownTrigger>
      <DropdownMenu variant='faded' aria-label='Lista de filtros'>
        <DropdownSection title='Filtros de busqueda' aria-label='Filtros de busqueda'>
          <DropdownItem textValue='Parámetro de busqueda' key={'peopleParams'}>
            <RadioGroup
              aria-label='Seleccionar parámetro de busqueda'
              value={selectedSearchField}
              onValueChange={handleSearchParamChange}
            >
              {SEARCH_PARAMS.map((param) => (
                <Radio key={param.id} value={param.id}>
                  {param.label}
                </Radio>
              ))}
            </RadioGroup>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
