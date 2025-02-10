import type { SearchFieldKeys } from '../types/PeopleRequestParams';

interface SearchParam {
  id: SearchFieldKeys;
  label: string;
}

export const SEARCH_PARAMS: SearchParam[] = [
  { id: 'documentNumber', label: 'Número de documento' },
  { id: 'fullName', label: 'Nombre' },
];
