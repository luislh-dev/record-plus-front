import { useRole } from '@/hooks/role/useRole';
import { useStates } from '@/hooks/state/useState';
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
import { useUserSearch } from '../hooks/useUserSearch';
import { useUserSearchStore } from '../stores/searchStore';
import type { SearchFieldKeys } from '../types/UserRequestParams';

export function DropDownFilter() {
  const { state } = useStates();
  const { roles } = useRole();

  const {
    selectedState,
    setSelectedState,
    selectedRole,
    setSelectedRole,
    selectedSearchField,
    setSelectedSearchField,
    searchTerm,
  } = useUserSearchStore();

  const { refetch } = useUserSearch();

  const handleStateChange = (selectedValue: string) => {
    if (selectedValue === 'all') {
      setSelectedState(null);
    } else {
      setSelectedState(Number.parseInt(selectedValue));
    }
  };

  const handleRoleChange = (selectedValue: string) => {
    if (selectedValue === 'all') {
      setSelectedRole(null);
    } else {
      setSelectedRole(Number.parseInt(selectedValue));
    }
  };

  const handleSearchParamChange = (selectedValue: string) => {
    setSelectedSearchField(selectedValue as SearchFieldKeys);
    if (searchTerm !== '') refetch();
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
      <DropdownMenu variant='faded' aria-label='Lista para selecionar los filtros de la web' closeOnSelect={false}>
        <DropdownSection title='Parámetro de busqueda' aria-label='Parámetros'>
          <DropdownItem textValue='Parámetros' key={'Parámetros'}>
            <RadioGroup
              aria-label='Seleccionar un parámetro de busqueda'
              value={selectedSearchField}
              onValueChange={handleSearchParamChange}
            >
              {SEARCH_PARAMS.map((param) => (
                <Radio
                  key={param.id}
                  value={param.id}
                  aria-label={`Seleccionar ${param.label} como parámetro de busqueda`}
                >
                  {param.label}
                </Radio>
              ))}
            </RadioGroup>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title='Roles' aria-label='Sección de roles'>
          <DropdownItem textValue='Roles' key={'Roles'}>
            <RadioGroup
              aria-label='Selecionar un rol'
              value={selectedRole?.toString() || 'all'}
              onValueChange={handleRoleChange}
            >
              <Radio key='all' value='all' aria-label='Mostrar todos los roles'>
                Todos
              </Radio>
              {roles.map((r) => (
                <Radio key={r.id} value={r.id.toString()} aria-label={`Mostrar solo los roles de ${r.name}`}>
                  {r.name}
                </Radio>
              ))}
            </RadioGroup>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title='Estados' aria-label='Sección de estados'>
          <DropdownItem textValue='Estados' key={'Estados'}>
            <RadioGroup
              aria-label='Seleccionar un estado'
              value={selectedState?.toString() || 'all'}
              onValueChange={handleStateChange}
            >
              <Radio key='all' value='all' aria-label='Mostrar todos los estados.'>
                Todos
              </Radio>
              {state.map((s) => (
                <Radio key={s.id} value={s.id.toString()} aria-label={`Mostrar solo los estados de ${s.name}`}>
                  {s.name}
                </Radio>
              ))}
            </RadioGroup>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
