import { z } from "zod";

export const hospitalCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Nombre es requerido")
    .min(3, "Nombre debe tener al menos 3 caracteres")
    .max(50, "Nombre debe tener máximo 50 caracteres"),

  address: z.string().min(1, "Dirección es requerida"),

  phone: z
    .string()
    .min(1, "Teléfono es requerido")
    .regex(/^9/, "Teléfono debe empezar con 9")
    .regex(/^[0-9]{9}$/, "Teléfono debe tener 9 dígitos numéricos"),

  email: z.string().min(1, "Email es requerido").email("Email no es válido"),

  ruc: z
    .string()
    .min(1, "RUC es requerido")
    .regex(/^[0-9]{11}$/, "RUC debe tener 11 dígitos"),

  stateId: z.number().min(1, "Estado es requerido"),
});

export type HospitalCreateValues = z.infer<typeof hospitalCreateSchema>;
