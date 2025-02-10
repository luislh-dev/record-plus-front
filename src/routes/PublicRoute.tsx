import { useAuth } from '@/contexts/useAuthContext';
import { Navigate } from 'react-router-dom';

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { state } = useAuth();
  return state.isAuthenticated ? <Navigate to='/dashboard' replace /> : children;
}
