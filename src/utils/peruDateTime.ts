/**
 * Tipos de entrada válidos para fechas
 * - Date: Objeto Date nativo
 * - string: Fecha en formato ISO o similar
 * - null: Valor nulo (se manejará con valores por defecto)
 */
type DateInput = Date | string | null;

/**
 * Convierte una entrada de fecha en un objeto Date
 */
const parseToDate = (date: DateInput): Date => {
  if (!date) return new Date();
  return typeof date === 'string' ? new Date(date) : date;
};

/**
 * Calcula la edad en años a partir de una fecha de nacimiento
 * @param birthDate Fecha de nacimiento
 * @returns number Edad en años
 */
export const calculateAge = (birthDate: DateInput): number => {
  if (!birthDate) {
    // eslint-disable-next-line no-console
    console.warn('calculateAge: No se proporcionó fecha de nacimiento');
    return 0;
  }

  try {
    const birth = parseToDate(birthDate);

    // Validar que la fecha es válida
    if (Number.isNaN(birth.getTime())) {
      // eslint-disable-next-line no-console
      console.warn('calculateAge: Fecha de nacimiento inválida', birthDate);
      return 0;
    }

    // Usar Date.now() y la zona horaria local como fallback si getPeruDateTime falla
    const today = new Date();

    if (birth > today) {
      // eslint-disable-next-line no-console
      console.warn('calculateAge: Fecha de nacimiento es futura', birthDate);
      return 0;
    }

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('calculateAge: Error calculando edad', error);
    return 0;
  }
};
