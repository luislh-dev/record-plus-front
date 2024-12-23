import { z } from 'zod';
import { baseUserCreateSchema } from './baseUserCreateSchema';

export const userDoctorCreateSchema = baseUserCreateSchema.refine(
  data => data.password === data.passwordConfirmation,
  {
    message: 'Las contraseñas no coinciden',
    path: ['passwordConfirmation']
  }
);

export type UserDoctorCreateValues = z.infer<typeof userDoctorCreateSchema>;
