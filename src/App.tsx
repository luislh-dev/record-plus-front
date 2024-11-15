import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/useAuthContext';
import { Login } from './pages/Login';
import { ProtectedPage } from './pages/ProtectedPage';
import { PrivateRoute } from './components/PrivateRoute';

const App = () => {
  const { state } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        state.isAuthenticated ? <Navigate to="/protected" replace /> : <Login />
      } />
      <Route path="/protected" element={
        <PrivateRoute>
          <ProtectedPage />
        </PrivateRoute>
      } />
      <Route path="/" element={
        state.isAuthenticated ? <Navigate to="/protected" replace /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
};

export default App;