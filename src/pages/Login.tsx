import { useState } from 'react';
import { useAuth } from '../contexts/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { decodeToken } from '../utils/tokenUtils';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
