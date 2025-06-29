/**
 * Convierte un string ISO a Date
 * @param isoString - String en formato ISO (YYYY-MM-DDTHH:mm:ss)
 * @returns Date object o null si el string es inválido
 */
export const fromISOString = (isoString: string | null): Date | null => {
  if (!isoString) return null;

  try {
    const date = new Date(isoString);
    // Verificar que la fecha sea válida
    if (Number.isNaN(date.getTime())) return null;
    return date;
  } catch {
    return null;
  }
};

/**
 * Convierte un Date a string ISO (formato que espera el DatePickerForm)
 * @param date - Date object
 * @returns String en formato ISO sin milisegundos
 */
export const toISOString = (date: Date | null): string | null => {
  if (!date) return null;

  try {
    return date.toISOString().slice(0, 19);
  } catch {
    return null;
  }
};

export const DateMapper = {
  fromISOString,
  toISOString,
} as const;
