import { useIsAdmin, useIsManagement } from '@/hooks/auth/useAuthRoles';
import { DoctorForm } from './components/DoctorFrom';
import { ManagementForm } from './components/ManagementForm';

export const UserAdd = () => {
  const isAdmin = useIsAdmin();
  const isManagement = useIsManagement();

  if (isAdmin) {
    return <ManagementForm />;
  }

  if (isManagement) {
    return <DoctorForm />;
  }

  return null;
};
