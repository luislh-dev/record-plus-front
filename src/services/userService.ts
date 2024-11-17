import { api } from "./api/api";
import { User } from "@/types/user";
import {
  UserCreateDTO,
  UserListDTO,
  UserUpdateDTO,
} from "@/types/DTO/user/UserDto";
import { PageRequest, PageResponse } from "@/types/Pagination";
import { UserSearchParams } from "@/types/DTO/user/UserSearchParams";

export const getUsers = async (
  pageRequest?: PageRequest,
  searchParams?: UserSearchParams
): Promise<PageResponse<UserListDTO>> => {
  const params = new URLSearchParams();

  // Add pagination params
  if (pageRequest) {
    params.append("page", pageRequest.pageNumber.toString());
    params.append("size", pageRequest.pageSize.toString());
    if (pageRequest.sort?.field) {
      params.append(
        "sort",
        `${pageRequest.sort.field},${pageRequest.sort.direction || "asc"}`
      );
    }
  }

  // Add search params
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
  }

  const response = await api.get<PageResponse<UserListDTO>>("/users/search", {
    params,
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
