import { AllergyCategory } from '@/common/enum/AllergyCategory';
import z from 'zod';

export const allergyCreateSchema = z.object({
  name: z
    .string({ required_error: 'Nombre es requerido' })
    .trim()
    .min(1, 'Nombre es requerido')
    .min(2, 'Debe tener al menos 2 caracteres.')
    .max(100, 'Nombre debe tener máximo 100 caracteres'),
  description: z.string().trim().max(250, 'La descripción no puede exceder los 250 caracteres.').optional(),
  category: z
    .string({ required_error: 'Categoría es requerida' })
    .min(1, 'Categoría es requerida')
    .refine((value) => Object.keys(AllergyCategory).includes(value), { message: 'Categoría es requerida' }),
});

export type AllergyCreateValues = z.infer<typeof allergyCreateSchema>;
