import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuthContext";
import { RoleType } from "@/constants/roles";

interface RoleBasedRouteProps {
  children: JSX.Element;
  allowedRoles: RoleType[];
}

export const RoleBasedRoute = ({
  children,
  allowedRoles,
}: RoleBasedRouteProps) => {
  const { state } = useAuth();

  const hasRequiredRole = state.authorities?.some((role) =>
    allowedRoles.includes(role as RoleType)
  );

  if (!hasRequiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};
