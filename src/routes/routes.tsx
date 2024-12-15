import { Roles } from "@/constants/roles";
import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { Home } from "@/pages/home/Home";
import { Login } from "@/pages/Login";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { PublicRoute } from "@/routes/PublicRoute";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RoleBasedRoute } from "./RoleBasedRoute";
import HospitalAdd from "@/pages/hospital/HospitalAdd";
import HospitalEdit from "@/pages/hospital/HospitalEdit";
import People from "@/pages/people/People";
import User from "@/pages/user/User";
import Hospital from "@/pages/hospital/Hospital";
import { UserAdd } from "@/pages/user/UserAdd";

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
        element: <Home />,
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
      {
        path: "user",
        children: [
          {
            index: true,
            element: (
              <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT]}>
                <User />
              </RoleBasedRoute>
            ),
          },
          {
            path: "add",
            element: (
              <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT]}>
                <UserAdd />
              </RoleBasedRoute>
            ),
          },
        ],
      },
    ],
  },
]);
