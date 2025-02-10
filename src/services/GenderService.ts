import type { Gender } from '@/types/Gender';
import { api } from './api/api';

export const getGender = async (): Promise<Gender[]> => {
  const response = await api.get<Gender[]>('/sexType');
  return response.data;
};
