import { useAuth } from "../contexts/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks//user/useUsers";

export const ProtectedPage = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const { users, loading, error } = useUsers();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  if (!state.token) {
    navigate("/login");
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
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.stateId === 1 ? "Activo" : "Inactivo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
