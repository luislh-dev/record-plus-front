export const Roles = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
  DOCTOR: 'ROLE_DOCTOR',
  PATIENT: 'ROLE_PATIENT',
  MANAGEMENT: 'ROLE_MANAGEMENT',
} as const;

export type RoleType = (typeof Roles)[keyof typeof Roles];
