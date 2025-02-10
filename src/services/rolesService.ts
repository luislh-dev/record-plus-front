import type { Role } from '@/types/Roles';
import { api } from './api/api';

export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get<Role[]>('/roles');
  return response.data;
};
