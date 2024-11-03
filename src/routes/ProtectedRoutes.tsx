import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { state } = useAuth();
  return state.token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;