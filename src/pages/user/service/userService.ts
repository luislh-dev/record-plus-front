import { PageResponse } from "@/types/Pagination";
import { UserListDTO } from "../types/UserListDTO";
import { UserRequestParams } from "../types/UserRequestParams";
import { api } from "@/services/api/api";

export const getUsers = async (
  params?: UserRequestParams
): Promise<PageResponse<UserListDTO>> => {
  const response = await api.get<PageResponse<UserListDTO>>("/users", {
    params,
  });
  return response.data;
};
