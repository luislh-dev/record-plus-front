export const HOSPITAL_SORTABLE_FIELDS = {
  name: { field: "name", label: "Nombre" },
  phone: { field: "phone", label: "Teléfono" },
  email: { field: "email", label: "Correo electrónico" },
  ruc: { field: "ruc", label: "RUC" },
  updatedAt: { field: "updatedAt", label: "Actualizado" },
} as const;

// Esto extraerá las keys del objeto
export type HospitalSortField = keyof typeof HOSPITAL_SORTABLE_FIELDS;
