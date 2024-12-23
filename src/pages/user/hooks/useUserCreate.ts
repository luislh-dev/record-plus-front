import { ApiServiceError } from '@/services/api/ApiErrorHandler';
import { useState } from 'react';
import { toDoctorCreationDto } from '../adapter/toDoctorCreationDto';
import { toManagementCreationDto } from '../adapter/toManagementCreationDto';
import { UserDoctorCreateValues } from '../models/userDoctorCreateSchema';
import { UserManagementCreateValues } from '../models/userManagementCreateSchema';
import { createDoctorUser, createManagementUser } from '../service/userService';

export function useUserManagementCreate() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ApiServiceError | null>(null);

  const handleCreate = async (data: UserManagementCreateValues) => {
    setLoading(true);
    setError(null);
    try {
      await createManagementUser(toManagementCreationDto(data));
    } catch (error) {
      if (error instanceof ApiServiceError) {
        setError(error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = !isLoading && !error;

  return { isLoading, error, handleCreate, isSuccess };
}

export function useUserDoctorCreate() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ApiServiceError | null>(null);

  const handleCreate = async (data: UserDoctorCreateValues) => {
    setLoading(true);
    setError(null);
    try {
      await createDoctorUser(toDoctorCreationDto(data));
    } catch (error) {
      if (error instanceof ApiServiceError) {
        setError(error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = !isLoading && !error;

  return { isLoading, error, handleCreate, isSuccess };
}
