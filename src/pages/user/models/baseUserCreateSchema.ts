import { z } from 'zod';

export const baseUserCreateSchema = z.object({
  name: z
    .string()
    .min(1, 'Nombre es requerido')
    .min(3, 'Nombre debe tener al menos 3 caracteres')
    .max(50, 'Nombre debe tener máximo 50 caracteres'),

  email: z.string().min(1, 'Email es requerido').email('Email no es válido'),

  personDNI: z
    .string()
    .min(1, 'Número de documento es requerido')
    .min(8, 'Número de documento debe tener al menos 8 caracteres')
    .max(20, 'Número de documento debe tener máximo 20 caracteres'),

  stateId: z.number().min(1, 'Estado es requerido'),

  password: z
    .string()
    .min(8, { message: 'Contraseña debe tener al menos 8 caracteres' })
    .max(50, 'Contraseña debe tener máximo 50 caracteres')
    .regex(/[A-Z]/, 'Contraseña debe tener al menos una letra mayuscula')
    .regex(/[a-z]/, 'Contraseña debe tener al menos una letra minuscula')
    .regex(/[0-9]/, 'Contraseña debe tener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Contraseña debe tener al menos un caracter especial'),

  passwordConfirmation: z
    .string()
    .min(8, { message: 'Contraseña debe tener al menos 8 caracteres' }),

  personalInfo: z.object({
    name: z.string(),
    surnames: z.string(),
    phone: z.string()
  })
});

export type BaseUserCreateValues = z.infer<typeof baseUserCreateSchema>;
