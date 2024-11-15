import { useAuth } from '../../contexts/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { decodeToken } from '../../utils/tokenUtils';

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
      navigate('/protected');
      return { success: true };
    } catch (error) {
      console.error('Login failed', error);
      return { success: false, error };
    }
  };

  return { handleLogin };
};