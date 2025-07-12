import { AllergyCategory } from '@/common/enum/AllergyCategory';
import z from 'zod';

export const allergyCreateSchema = z.object({
  name: z.string().trim().min(2, 'Nombre es requerido').max(100, 'Nombre debe tener máximo 100 caracteres'),
  description: z.string().trim().max(250, 'La descripción no puede exceder los 250 caracteres.').optional(),
  category: z.nativeEnum(AllergyCategory, {
    errorMap: () => ({ message: 'Categoría es requerida' }),
  }),
});

export type AllergyCreateValues = z.infer<typeof allergyCreateSchema>;
