import { useAuth } from '../contexts/useAuthContext';
import { useNavigate } from 'react-router-dom';

export const ProtectedPage = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  if (!state.token) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <h1>Welcome, {state.username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};