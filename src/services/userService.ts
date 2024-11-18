import { api } from "./api/api";
import { User } from "@/types/DTO/user/user";
import {
  UserCreateDTO,
  UserListDTO,
  UserUpdateDTO,
} from "@/types/DTO/user/UserDto";
import { PageResponse } from "@/types/Pagination";
import { UserSearchParams } from "@/types/DTO/user/UserSearchParams";

export const getUsers = async (
  searchParams?: UserSearchParams
): Promise<PageResponse<UserListDTO>> => {
  const { pageNumber, pageSize, sort, username, dni, hospital, id, role } =
    searchParams || {};
  const response = await api.get<PageResponse<UserListDTO>>("/users", {
    params: {
      page: pageNumber,
      size: pageSize,
      ...(sort && { sort: `${sort.field},${sort.direction}` }),
      ...(username && { username }),
      ...(dni && { dni }),
      ...(hospital && { hospital }),
      ...(id && { id }),
      ...(role && { role }),
    },
  });
  return response.data;
};

export const getUser = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const createUser = async (user: UserCreateDTO): Promise<User> => {
  const response = await api.post<User>("/users", user);
  return response.data;
};

export const updateUser = async (
  id: string,
  user: UserUpdateDTO
): Promise<UserUpdateDTO> => {
  const response = await api.put<UserUpdateDTO>(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};
