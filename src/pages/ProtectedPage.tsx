import { useAuth } from '../contexts/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { getUsers } from '../services/userService';

export const ProtectedPage = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError('Error al cargar usuarios');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  if (!state.token) {
    navigate('/login');
    return null;
  }

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>Bienvenido, {state.username}</h1>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      
      <div className="users-list">
        <h2>Lista de Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.stateId === 1 ? 'Activo' : 'Inactivo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};