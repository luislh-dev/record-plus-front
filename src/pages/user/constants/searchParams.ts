import { SearchFieldKeys } from '../types/UserRequestParams';

interface SearchParam {
  id: SearchFieldKeys;
  label: string;
}

export const SEARCH_PARAMS: SearchParam[] = [
  { id: 'username', label: 'Nombre' },
  { id: 'dni', label: 'DNI' },
  { id: 'hospitalName', label: 'Hospital' }
];
