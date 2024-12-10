import { createContext, useContext } from "react";
import { ApiServiceError } from "@/services/api/ApiErrorHandler";
import { UserListDTO } from "@/types/DTO/user/UserDto";
import { UserSearchParams } from "@/types/DTO/user/UserSearchParams";
import { PageRequest } from "@/types/page/PageRequest";

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
  setSearchQuery: (query: string) => void;
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
  setSearchQuery: () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
