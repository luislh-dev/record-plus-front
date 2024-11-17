import { createContext, useContext } from "react";
import { ApiServiceError } from "@/services/api/ApiErrorHandler";
import { UserListDTO } from "@/types/DTO/user/UserDto";
import { PageRequest } from "@/types/Pagination";
import { UserSearchParams } from "@/types/DTO/user/UserSearchParams";

interface UserContextType {
  users: UserListDTO[];
  pagination: {
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  loading: boolean;
  error: ApiServiceError | null;
  fetchUsers: (
    pageRequest?: PageRequest,
    searchParams?: UserSearchParams
  ) => Promise<void>;
  handleDeleteConfirm: () => Promise<void>;
  userToDelete: UserListDTO | null;
  openDeleteModal: (user: UserListDTO) => void;
  closeDeleteModal: () => void;
}

export const UserContext = createContext<UserContextType>({
  users: [],
  pagination: {
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 20,
  },
  loading: false,
  error: null,
  fetchUsers: async () => {},
  handleDeleteConfirm: async () => {},
  userToDelete: null,
  openDeleteModal: () => {},
  closeDeleteModal: () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
