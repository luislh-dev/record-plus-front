/**
 * Constantes para la configuración regional y zona horaria de Perú
 */
const CONSTANTS = {
  TIMEZONE: 'America/Lima',
  LOCALE: 'es-PE',
} as const;

/**
 * Tipos de entrada válidos para fechas
 * - Date: Objeto Date nativo
 * - string: Fecha en formato ISO o similar
 * - null: Valor nulo (se manejará con valores por defecto)
 */
type DateInput = Date | string | null;

/**
 * Formatos disponibles para el formateo de fechas
 * - short-date: DD/MM/YYYY
 * - long-date: dddd, D de MMMM de YYYY
 * - short-datetime: DD/MM/YYYY HH:mm AM/PM
 * - long-datetime: dddd, D de MMMM de YYYY HH:mm:ss AM/PM
 */
type DateFormat = 'short-date' | 'long-date' | 'short-datetime' | 'long-datetime';

/**
 * Estructura que representa las partes de una fecha y hora
 */
interface DateTimeParts {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number; // 0-23
  minute: number;
  second: number;
}

/**
 * Crea un formateador de fechas con las opciones especificadas
 */
const createDateFormatter = (options: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat(CONSTANTS.LOCALE, {
    timeZone: CONSTANTS.TIMEZONE,
    ...options,
  });
};

/**
 * Convierte una entrada de fecha en un objeto Date
 */
const parseToDate = (date: DateInput): Date => {
  if (!date) return new Date();
  return typeof date === 'string' ? new Date(date) : date;
};

/**
 * Configuraciones predefinidas para los diferentes formatos de fecha
 */
const DATE_FORMAT_OPTIONS: Record<DateFormat, Intl.DateTimeFormatOptions> = {
  'short-date': {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  },
  'long-date': {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  'short-datetime': {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  },
  'long-datetime': {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  },
};

/**
 * Obtiene la fecha y hora actual en la zona horaria de Perú
 * @returns Date objeto Date configurado en la zona horaria de Perú
 */
export const getPeruDateTime = (): Date => {
  try {
    const date = new Date();
    // Usamos directamente las opciones necesarias para obtener las partes de la fecha
    const formatter = createDateFormatter({
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const formattedDate = formatter.format(date);
    // Asumimos que el formato será DD/MM/YYYY, HH:mm:ss
    const [dateStr, timeStr] = formattedDate.split(', ');

    if (!dateStr || !timeStr) {
      // eslint-disable-next-line no-console
      console.warn('getPeruDateTime: Formato de fecha inválido', formattedDate);
      return date; // Retornamos la fecha actual como fallback
    }

    const [day, month, year] = dateStr.split('/');
    const [hours, minutes, seconds] = timeStr.split(':');

    // Verificamos que todos los valores sean válidos
    if (!day || !month || !year || !hours || !minutes || !seconds) {
      // eslint-disable-next-line no-console
      console.warn('getPeruDateTime: Valores de fecha/hora inválidos', {
        day,
        month,
        year,
        hours,
        minutes,
        seconds,
      });
      return date;
    }

    return new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
      Number.parseInt(hours),
      Number.parseInt(minutes),
      Number.parseInt(seconds),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('getPeruDateTime: Error al procesar la fecha', error);
    return new Date(); // Retornamos la fecha actual como fallback
  }
};
/**
 * Convierte una fecha al formato ISO (YYYY-MM-DD) en la zona horaria de Perú
 * @param date Fecha a convertir
 * @returns string Fecha en formato ISO
 * @example
 * const isoDate = parsePeruDate('2024-03-20T15:30:00Z');
 * console.log(isoDate); // '2024-03-20'
 */
export const parsePeruDate = (date: DateInput): string => {
  try {
    const dateObj = parseToDate(date);
    const formatter = createDateFormatter({
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const [day, month, year] = formatter.format(dateObj).split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  } catch {
    return new Date().toISOString().split('T')[0];
  }
};

/**
 * Obtiene las partes individuales de la fecha y hora actual en Perú
 * @returns DateTimeParts Objeto con año, mes, día, hora, minuto y segundo
 * @example
 * const parts = getPeruDateTimeParts();
 * console.log(parts); // { year: 2024, month: 3, day: 20, hour: 15, minute: 30, second: 0 }
 */
export const getPeruDateTimeParts = (): DateTimeParts => {
  const peruDate = getPeruDateTime();

  return {
    year: peruDate.getFullYear(),
    month: peruDate.getMonth() + 1,
    day: peruDate.getDate(),
    hour: peruDate.getHours(),
    minute: peruDate.getMinutes(),
    second: peruDate.getSeconds(),
  };
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

/**
 * Formatea una fecha según el formato especificado
 * @param date Fecha a formatear
 * @param format Formato deseado (short-date | long-date | short-datetime | long-datetime)
 * @returns string Fecha formateada
 * @example
 * console.log(formatDateToString('2024-03-20', 'short-date')); // '20/03/2024'
 * console.log(formatDateToString('2024-03-20', 'long-date')); // 'miércoles, 20 de marzo de 2024'
 * console.log(formatDateToString('2024-03-20', 'long-datetime')); // 'miércoles, 20 de marzo de 2024, 03:30:00 PM'
 */
export const formatDateToString = (date: DateInput, format: DateFormat = 'short-date'): string => {
  if (!date) return '';

  try {
    const dateObj = parseToDate(date);
    const formatter = createDateFormatter(DATE_FORMAT_OPTIONS[format]);
    return formatter.format(dateObj);
  } catch {
    return '';
  }
};
