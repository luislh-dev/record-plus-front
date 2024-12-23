import { Roles } from '@/constants/roles';
import { useAuth } from '@/contexts/useAuthContext';

export const useIsAdmin = (): boolean => {
  const { state } = useAuth();
  return state.authorities?.includes(Roles.ADMIN) ?? false;
};

export const useIsDoctor = (): boolean => {
  const { state } = useAuth();
  return state.authorities?.includes(Roles.DOCTOR) ?? false;
};

export const useIsManagement = (): boolean => {
  const { state } = useAuth();
  return state.authorities?.includes(Roles.MANAGEMENT) ?? false;
};
