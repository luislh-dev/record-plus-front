import { useState, useCallback } from "react";
import { deleteUser, getUsers } from "../../services/userService";
import { ApiServiceError } from "@/services/api/ApiErrorHandler";
import { PageRequest, PageResponse } from "@/types/Pagination";
import { UserSearchParams } from "@/types/DTO/user/UserSearchParams";
import { UserListDTO } from "@/types/DTO/user/UserDto";

export const useUsers = () => {
  const [userPage, setUserPage] = useState<PageResponse<UserListDTO>>({
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 20,
      sort: { empty: true, sorted: false, unsorted: true },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalElements: 0,
    totalPages: 0,
    size: 20,
    number: 0,
    sort: { empty: true, sorted: false, unsorted: true },
    first: true,
    numberOfElements: 0,
    empty: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiServiceError | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserListDTO | null>(null);

  const fetchUsers = useCallback(
    async (pageRequest?: PageRequest, searchParams?: UserSearchParams) => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUsers(pageRequest, searchParams);
        setUserPage(data);
      } catch (err) {
        setError(err as ApiServiceError);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const openDeleteModal = useCallback((user: UserListDTO) => {
    setUserToDelete(user);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setUserToDelete(null);
  }, []);

  const handleDeleteConfirm = useCallback(async (): Promise<void> => {
    if (!userToDelete) return;

    try {
      setLoading(true);
      await deleteUser(userToDelete.id);
      await fetchUsers();
      closeDeleteModal();
    } catch (err) {
      setError(err as ApiServiceError);
    } finally {
      setLoading(false);
    }
  }, [userToDelete, fetchUsers, closeDeleteModal]);

  return {
    users: userPage.content,
    pagination: {
      totalElements: userPage.totalElements,
      totalPages: userPage.totalPages,
      currentPage: userPage.number,
      pageSize: userPage.size,
    },
    loading,
    error,
    fetchUsers,
    handleDeleteConfirm,
    userToDelete,
    openDeleteModal,
    closeDeleteModal,
  };
};
