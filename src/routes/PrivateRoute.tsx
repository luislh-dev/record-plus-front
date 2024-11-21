import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuthContext";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
