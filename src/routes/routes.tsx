import { hospitalAddAction } from "@/actions/hospital/hospitalAddAction";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { PublicRoute } from "@/routes/PublicRoute";
import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { Hospital } from "@/pages/Hospital";
import { HospitalAdd } from "@/pages/HospitalAdd";
import { Login } from "@/pages/Login";
import { People } from "@/pages/People";
import { ProtectedPage } from "@/pages/ProtectedPage";
import { User } from "@/pages/User";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RoleBasedRoute } from "./RoleBasedRoute";
import { Roles } from "@/constants/roles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <ProtectedPage />,
      },
      {
        path: "hospital",
        element: (
          <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT]}>
            <Hospital />
          </RoleBasedRoute>
        ),
      },
      {
        path: "hospital/add",
        element: (
          <RoleBasedRoute allowedRoles={[Roles.ADMIN]}>
            <HospitalAdd />
          </RoleBasedRoute>
        ),
        action: hospitalAddAction,
      },
      {
        path: "people",
        element: (
          <RoleBasedRoute
            allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT, Roles.DOCTOR]}
          >
            <People />
          </RoleBasedRoute>
        ),
      },
      {
        path: "user",
        element: (
          <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT]}>
            <User />
          </RoleBasedRoute>
        ),
      },
    ],
  },
]);
