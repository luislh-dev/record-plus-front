import { Roles } from '@/constants/roles';
import type { MenuItem } from '@/types/MenuItem';

export const menuItems: MenuItem[] = [
  {
    label: 'Hospitales',
    path: '/hospitals',
    roles: [Roles.ADMIN],
  },
  {
    label: 'Usuarios',
    path: '/user',
    roles: [Roles.DOCTOR, Roles.ADMIN, Roles.MANAGEMENT],
  },
  {
    label: 'Personas',
    path: '/people',
    roles: [Roles.DOCTOR, Roles.PATIENT, Roles.ADMIN, Roles.MANAGEMENT],
  },
  {
    label: 'Alergias',
    path: '/allergies',
    roles: [Roles.DOCTOR, Roles.MANAGEMENT],
  },
];
