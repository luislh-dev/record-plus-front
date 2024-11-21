import { PrivateRoute } from "@/routes/PrivateRoute";
import { PublicRoute } from "@/routes/PublicRoute";
import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { Login } from "@/pages/Login";
import { People } from "@/pages/People";
import { ProtectedPage } from "@/pages/ProtectedPage";
import { User } from "@/pages/User";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RoleBasedRoute } from "./RoleBasedRoute";
import { Roles } from "@/constants/roles";
import { UserProvider } from "@/contexts/user/UserProvider";
import { Hospital } from "@/pages/hospital/Hospital";
import { HospitalEdit } from "@/pages/hospital/HospitalEdit";
import { HospitalAdd } from "@/pages/hospital/HospitalAdd";

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
            <UserProvider>
              <User />
            </UserProvider>
          </RoleBasedRoute>
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
        path: "hospitals",
        children: [
          {
            index: true,
            element: (
              <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT]}>
                <Hospital />
              </RoleBasedRoute>
            ),
          },
          {
            path: "add",
            element: (
              <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT]}>
                <HospitalAdd />
              </RoleBasedRoute>
            ),
          },
          {
            path: ":id/edit",
            element: (
              <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT]}>
                <HospitalEdit />
              </RoleBasedRoute>
            ),
          },
        ],
      },
    ],
  },
]);
