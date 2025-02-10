import { z } from 'zod';
import { baseUserCreateSchema } from './baseUserCreateSchema';

export const userManagementCreateSchema = baseUserCreateSchema
  .extend({
    hospitalId: z.number().int().positive('Hospital es requerido').min(1, 'Hospital es requerido'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirmation'],
  });

// Este tipo es para inferir el tipo de los valores
export type UserManagementCreateValues = z.infer<typeof userManagementCreateSchema>;
