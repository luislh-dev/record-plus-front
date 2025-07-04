import { Roles } from '@/constants/roles';
import { AuthLayout } from '@/layouts/AuthLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { Login } from '@/pages/Login';
import { NotFound } from '@/pages/NotFound';
import { Home } from '@/pages/home/Home';
import Hospital from '@/pages/hospital/Hospital';
import HospitalAdd from '@/pages/hospital/HospitalAdd';
import HospitalEdit from '@/pages/hospital/HospitalEdit';
import People from '@/pages/people/People';
import { PeopleAdd } from '@/pages/people/PeopleAdd';
import { PeopleDetail } from '@/pages/people/PeopleDetail';
import { RecordDetail } from '@/pages/record/RecordDetail';
import { CreateRecordDetail } from '@/pages/record/pages/CreateRecordDetail';
import User from '@/pages/user/User';
import { UserAdd } from '@/pages/user/UserAdd';
import { PrivateRoute } from '@/routes/PrivateRoute';
import { PublicRoute } from '@/routes/PublicRoute';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { RoleBasedRoute } from './RoleBasedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='/dashboard' replace />,
      },
      {
        path: 'login',
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
        path: 'dashboard',
        element: <Home />,
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
        path: 'hospitals',
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
            path: 'add',
            element: (
              <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT]}>
                <HospitalAdd />
              </RoleBasedRoute>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT]}>
                <HospitalEdit />
              </RoleBasedRoute>
            ),
          },
        ],
      },
      {
        path: 'user',
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
            path: 'add',
            element: (
              <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT]}>
                <UserAdd />
              </RoleBasedRoute>
            ),
          },
        ],
      },
      {
        path: 'people',
        children: [
          {
            index: true,
            element: (
              <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT, Roles.DOCTOR]}>
                <People />
              </RoleBasedRoute>
            ),
          },
          {
            path: 'add',
            element: (
              <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT, Roles.DOCTOR]}>
                <PeopleAdd />
              </RoleBasedRoute>
            ),
          },
          {
            path: ':id/detail',
            children: [
              {
                index: true,
                element: (
                  <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT, Roles.DOCTOR]}>
                    <PeopleDetail />
                  </RoleBasedRoute>
                ),
              },
              {
                path: 'record/add',
                element: (
                  <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT, Roles.DOCTOR]}>
                    <CreateRecordDetail />
                  </RoleBasedRoute>
                ),
              },
              {
                path: 'record',
                children: [
                  {
                    path: ':recordId',
                    element: (
                      <RoleBasedRoute allowedRoles={[Roles.ADMIN, Roles.MANAGEMENT, Roles.DOCTOR]}>
                        <RecordDetail />
                      </RoleBasedRoute>
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
