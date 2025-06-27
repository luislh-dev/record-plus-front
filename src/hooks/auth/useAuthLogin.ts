import { useAuth } from '@/contexts/useAuthContext';
import { login } from '@/services/authService';
import type { ApiError } from '@/types/errros/ApiError';
import { decodeToken, removeStoredToken } from '@/utils/tokenUtils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthLogin = () => {
  const { dispatch } = useAuth();
  const [isLoding, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await login({ username, password });
      const { token } = response.data;
      const decoded = decodeToken(token);

      localStorage.setItem('token', token);
      dispatch({
        type: 'LOGIN',
        payload: {
          token,
          username: decoded.sub,
          authorities: decoded.authorities,
        },
      });
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      setError(error as ApiError);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    removeStoredToken(); // Limpiar token del localStorage
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return { handleLogin, handleLogout, isLoding, error };
};
