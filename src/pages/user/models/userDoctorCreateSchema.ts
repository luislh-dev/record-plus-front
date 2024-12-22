import { z } from 'zod';
import { baseUserCreateSchema } from './baseUserCreateSchema';

export const userDoctorCreateSchema = baseUserCreateSchema;

export type UserDoctorCreateValues = z.infer<typeof userDoctorCreateSchema>;
