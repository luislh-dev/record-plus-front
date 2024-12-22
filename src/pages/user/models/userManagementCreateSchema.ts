import { z } from 'zod';
import { baseUserCreateSchema } from './baseUserCreateSchema';

export const userManagementCreateSchema = baseUserCreateSchema
  .extend({
    hospitalId: z.number().min(1, 'Hospital es requerido')
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirmation']
  });

export type UserManagementCreateValues = z.infer<typeof userManagementCreateSchema>;
