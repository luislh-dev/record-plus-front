import { ApiServiceError } from '@/services/api/ApiErrorHandler';
import { useState } from 'react';
import { toDoctorCreationDto } from '../adapter/toDoctorCreationDto';
import { toManagementCreationDto } from '../adapter/toManagementCreationDto';
import type { UserDoctorCreateValues } from '../models/userDoctorCreateSchema';
import type { UserManagementCreateValues } from '../models/userManagementCreateSchema';
import { createDoctorUser, createManagementUser } from '../service/userService';

export function useUserManagementCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiServiceError | null>(null);

  const handleCreate = async (data: UserManagementCreateValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await createManagementUser(toManagementCreationDto(data));
    } catch (error) {
      if (error instanceof ApiServiceError) {
        setError(error);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isSuccess = !isLoading && !error;

  return { isLoading, error, handleCreate, isSuccess };
}

export function useUserDoctorCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiServiceError | null>(null);

  const handleCreate = async (data: UserDoctorCreateValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await createDoctorUser(toDoctorCreationDto(data));
    } catch (error) {
      if (error instanceof ApiServiceError) {
        setError(error);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isSuccess = !isLoading && !error;

  return { isLoading, error, handleCreate, isSuccess };
}
