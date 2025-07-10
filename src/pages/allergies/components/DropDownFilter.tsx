import { AllergyCategory } from '@/common/enum/AllergyCategory';
import { Status } from '@/constants/state';
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
import { SEARCH_PARAMS } from '../constants/searchParams';
import { useAllergiesSearch } from '../hooks/useAllergiesSearch';
import { useSearchStore } from '../stores/searchStore';
import type { searchParams } from '../types/AllergyPageParams';

export function DropDownFilter() {
  const { setFilters, filters, searchField, setSearchField, searchTerm } = useSearchStore();
  const { refetch } = useAllergiesSearch();

  const handleValueChange = (selectedValue: string) => {
    setFilters({ status: selectedValue === 'todos' ? null : selectedValue });
  };

  const handleCategoryChange = (selectedValue: string) => {
    setFilters({ category: selectedValue === 'todos' ? null : selectedValue });
  };

  const handleSearchFieldChange = (selectedValue: string) => {
    setSearchField(selectedValue as searchParams);
    if (searchTerm !== '') {
      refetch();
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant='bordered'
          aria-label='Filtrar por estados'
          startContent={<Tune />}
          aria-expanded='false'
          aria-haspopup='listbox'
        >
          Filtrar
        </Button>
      </DropdownTrigger>
      <DropdownMenu closeOnSelect={false}>
        <DropdownSection title='Filtros de búsqueda'>
          <DropdownItem key='filtros' textValue='Filtros' className='data-[hover=true]:bg-transparent'>
            <RadioGroup value={searchField} onValueChange={handleSearchFieldChange}>
              {SEARCH_PARAMS.map((param) => (
                <Radio key={param.id} value={param.id}>
                  {param.label}
                </Radio>
              ))}
            </RadioGroup>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title='Estado'>
          <DropdownItem key='estados' textValue='Estados' className='data-[hover=true]:bg-transparent'>
            <RadioGroup
              aria-label='Seleccionar estado'
              value={filters.status || 'todos'}
              onValueChange={handleValueChange}
            >
              <Radio value='todos'>Todos</Radio>
              {Object.entries(Status).map(([key, value]) => (
                <Radio key={key} value={key}>
                  {value}
                </Radio>
              ))}
            </RadioGroup>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title='Categoría'>
          <DropdownItem key='categorias' textValue='Categorías' className='data-[hover=true]:bg-transparent'>
            <RadioGroup
              aria-label='Seleccionar categoría'
              value={filters.category || 'todos'}
              onValueChange={handleCategoryChange}
            >
              <Radio value='todos'>Todos</Radio>
              {Object.entries(AllergyCategory).map(([key, value]) => (
                <Radio key={key} value={key}>
                  {value}
                </Radio>
              ))}
            </RadioGroup>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
