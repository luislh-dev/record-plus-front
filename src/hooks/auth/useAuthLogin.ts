import { useAuth } from '@/contexts/useAuthContext';
import { login } from '@/services/authService';
import { decodeToken, removeStoredToken } from '@/utils/tokenUtils';
import { useNavigate } from 'react-router-dom';

export const useAuthLogin = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login({ username, password });
      const { token } = response.data;
      const decoded = decodeToken(token);

      localStorage.setItem('token', token);
      dispatch({
        type: 'LOGIN',
        payload: {
          token,
          username: decoded.sub,
          authorities: decoded.authorities
        }
      });
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const handleLogout = () => {
    removeStoredToken(); // Limpiar token del localStorage
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return { handleLogin, handleLogout };
};
