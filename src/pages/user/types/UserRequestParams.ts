import { PageRequest } from '@/types/page/PageRequest';

export interface UserRequestParams extends PageRequest {
  username?: string;
  dni?: string;
  hospitalName?: string;
  roleId?: number;
  stateId?: number;
}

// tipo de datos de los campos de búsqueda
export type SearchFieldKeys = 'username' | 'dni' | 'hospitalName';
