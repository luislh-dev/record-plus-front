import type { FileType } from '@/types/FileType';
import { api } from './api/api';

export const getAllFileTypes = async (): Promise<FileType[]> => {
  const response = await api.get<FileType[]>('/file-type');
  return response.data;
};
