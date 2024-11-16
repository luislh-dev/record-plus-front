import { Roles } from "@/constants/roles";
import { MenuItem } from "@/types/MenuItem";

export const menuItems: MenuItem[] = [
  {
    label: "Hospitales",
    path: "/hospital",
    roles: [Roles.ADMIN],
  },
  {
    label: "Pacientes",
    path: "/patients",
    roles: [Roles.DOCTOR, Roles.ADMIN],
  },
  {
    label: "Citas",
    path: "/appointments",
    roles: [Roles.DOCTOR, Roles.PATIENT],
  },
];
