import { api } from '@/services/api/api';
import type { PageResponse } from '@/types/Pagination';
import type { DoctorCreationDto } from '../types/DoctorCreationDto';
import type { ManagementCreationDto } from '../types/ManagementCreationDto';
import type { UserListDTO } from '../types/UserListDTO';
import type { UserRequestParams } from '../types/UserRequestParams';

export const getUsers = async (params?: UserRequestParams): Promise<PageResponse<UserListDTO>> => {
  const response = await api.get<PageResponse<UserListDTO>>('/users', {
    params,
  });
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const createManagementUser = async (data: ManagementCreationDto) => {
  const response = await api.post<ManagementCreationDto>('/users/createManagementUser', data);
  return response.data;
};

export const createDoctorUser = async (data: DoctorCreationDto) => {
  const response = await api.post<DoctorCreationDto>('/users/createDoctorUser', data);
  return response.data;
};
