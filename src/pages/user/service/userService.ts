import { api } from "@/services/api/api";
import { PageResponse } from "@/types/Pagination";
import { ManagementCreationDto } from "../types/ManagementCreationDto";
import { UserListDTO } from "../types/UserListDTO";
import { UserRequestParams } from "../types/UserRequestParams";

export const getUsers = async (params?: UserRequestParams): Promise<PageResponse<UserListDTO>> => {
  const response = await api.get<PageResponse<UserListDTO>>("/users", {
    params,
  });
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const createManagementUser = async (data: ManagementCreationDto) => {
  const response = await api.post<ManagementCreationDto>("/users/createManagementUser", data);
  return response.data;
};
