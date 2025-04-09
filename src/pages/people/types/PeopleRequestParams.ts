import type { PageRequest } from '@/types/page/PageRequest';

export interface PeopleRequestParams extends PageRequest {
  documentNumber?: string;
  fullName?: string;
}

// tipo de datos de los campos de búsqueda
export type SearchFieldKeys = 'documentNumber' | 'fullName';
