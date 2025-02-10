import type { SortParamGeneric } from '@/types/SortParam';
import type { SortableUserFields } from '../types/UserListDTO';

export const SORT_PARAMS: SortParamGeneric<SortableUserFields>[] = [
  { id: 'username', label: 'Nombre de usuario' },
  { id: 'email', label: 'Correo electrónico' },
  { id: 'dni', label: 'DNI' },
  { id: 'hospital', label: 'Hospital' },
];
