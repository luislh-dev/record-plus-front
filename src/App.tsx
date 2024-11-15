import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/useAuthContext';
import { AuthLayout } from './layouts/AuthLayout';
import { MainLayout } from './layouts/MainLayout';
import { Login } from './pages/Login';
import { ProtectedPage } from './pages/ProtectedPage';
import { PrivateRoute } from './components/PrivateRoute';

const App = () => {
  const { state } = useAuth();

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={
          state.isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        } />
      </Route>

      {/* Rutas protegidas */}
      <Route element={
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      }>
        <Route path="/dashboard" element={<ProtectedPage />} />
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={
        <Navigate to={state.isAuthenticated ? "/dashboard" : "/login"} replace />
      } />
    </Routes>
  );
};

export default App;