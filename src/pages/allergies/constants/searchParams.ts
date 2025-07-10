import type { searchParams } from '../types/AllergyPageParams';

interface SearchParam {
  id: searchParams;
  label: string;
}

export const SEARCH_PARAMS: SearchParam[] = [
  { id: 'name', label: 'Nombre' },
  { id: 'code', label: 'Código' },
];
