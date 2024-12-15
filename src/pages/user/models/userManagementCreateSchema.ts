import { z } from "zod";

export const userManagementCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Nombre es requerido")
    .min(3, "Nombre debe tener al menos 3 caracteres")
    .max(50, "Nombre debe tener máximo 50 caracteres"),

  email: z.string().min(1, "Email es requerido").email("Email no es válido"),

  personDNI: z
    .string()
    .min(1, "DNI es requerido")
    .regex(/^[0-9]{8}$/, "DNI debe tener 8 dígitos"),

  stateId: z.number().min(1, "Estado es requerido"),

  password: z
    .string()
    .min(1, "Contraseña es requerida")
    .min(8, "Contraseña debe tener al menos 6 caracteres")
    .max(50, "Contraseña debe tener máximo 50 caracteres")
    .regex(/[A-Z]/, "Contraseña debe tener al menos una letra mayuscula")
    .regex(/[a-z]/, "Contraseña debe tener al menos una letra minuscula")
    .regex(/[0-9]/, "Contraseña debe tener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Contraseña debe tener al menos un caracter especial"),

  passwordConfirmation: z
    .string()
    .min(1, "Confirmación de contraseña es requerida")
    .min(8, "Confirmación de contraseña debe tener al menos 6 caracteres")
    .max(50, "Confirmación de contraseña debe tener máximo 50 caracteres")
    .regex(/[A-Z]/, "Confirmación de contraseña debe tener al menos una letra mayuscula")
    .regex(/[a-z]/, "Confirmación de contraseña debe tener al menos una letra minuscula")
    .regex(/[0-9]/, "Confirmación de contraseña debe tener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Confirmación de contraseña debe tener al menos un caracter especial"),

}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Las contraseñas no coinciden",
  path: ["passwordConfirmation"],
});

// Este tipo es para inferir el tipo de los valores
export type UserManagementCreateValues = z.infer<typeof userManagementCreateSchema>;