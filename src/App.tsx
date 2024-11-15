import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/useAuthContext";
import { AuthLayout } from "./layouts/AuthLayout";
import { MainLayout } from "./layouts/MainLayout";
import { Login } from "./pages/Login";
import { ProtectedPage } from "./pages/ProtectedPage";
import { PrivateRoute } from "./components/PrivateRoute";
import { People } from "./pages/People";
import { Hospital } from "./pages/hospital";
import { User } from "./pages/user";

const App = () => {
  const { state } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route
          path="login"
          element={
            state.isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />
      </Route>

      {/* Protected Routes */}
      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<ProtectedPage />} />
        <Route path="people" element={<People />} />
        <Route path="hospital" element={<Hospital />} />
        <Route path="user" element={<User />} />
      </Route>
    </Routes>
  );
};

export default App;
