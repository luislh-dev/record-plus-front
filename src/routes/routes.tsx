import { Roles } from "@/constants/roles";
import { UserProvider } from "@/contexts/user/UserProvider";
import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { Home } from "@/pages/home/Home";
import { Login } from "@/pages/Login";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { PublicRoute } from "@/routes/PublicRoute";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RoleBasedRoute } from "./RoleBasedRoute";

const People = lazy(() => import("@/pages/people/People"));

const User = lazy(() => import("@/pages/user/User"));

const Hospital = lazy(() => import("@/pages/hospital/Hospital"));
const HospitalEdit = lazy(() => import("@/pages/hospital/HospitalEdit"));
const HospitalAdd = lazy(() => import("@/pages/hospital/HospitalAdd"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <AuthLayout />
      </Suspense>
    ),
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
      <Suspense>
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      </Suspense>
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
