// Constantes
const CONSTANTS = {
  TIMEZONE: 'America/Lima',
  LOCALE: 'es-PE'
} as const;

// Tipos
type DateInput = Date | string | null;
type DateFormat = 'short-date' | 'long-date' | 'short-datetime' | 'long-datetime';

interface DateTimeParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

// Utilidades base
const createDateFormatter = (options: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat(CONSTANTS.LOCALE, {
    timeZone: CONSTANTS.TIMEZONE,
    ...options
  });
};

const parseToDate = (date: DateInput): Date => {
  if (!date) return new Date();
  return typeof date === 'string' ? new Date(date) : date;
};

// Configuraciones de formato
const DATE_FORMAT_OPTIONS: Record<DateFormat, Intl.DateTimeFormatOptions> = {
  'short-date': {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  },
  'long-date': {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },
  'short-datetime': {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  },
  'long-datetime': {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }
};

// Funciones exportadas
export const getPeruDateTime = (): Date => {
  const date = new Date();
  const formatter = createDateFormatter({});
  const [datePart, timePart] = formatter.format(date).split(', ');
  const [day, month, year] = datePart.split('/');
  const [hours, minutes, seconds] = timePart.split(':');

  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
    parseInt(seconds)
  );
};

export const parsePeruDate = (date: DateInput): string => {
  try {
    const dateObj = parseToDate(date);
    const formatter = createDateFormatter({
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const [day, month, year] = formatter.format(dateObj).split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  } catch {
    return new Date().toISOString().split('T')[0];
  }
};

export const getPeruDateTimeParts = (): DateTimeParts => {
  const peruDate = getPeruDateTime();

  return {
    year: peruDate.getFullYear(),
    month: peruDate.getMonth() + 1,
    day: peruDate.getDate(),
    hour: peruDate.getHours(),
    minute: peruDate.getMinutes(),
    second: peruDate.getSeconds()
  };
};

export const formatPeruDateTime = (format: 'short' | 'long' = 'short'): string => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: CONSTANTS.TIMEZONE,
    hour12: true,
    ...(format === 'long' && {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  };

  return createDateFormatter(options).format(new Date());
};

export const calculateAge = (birthDate: DateInput): number => {
  if (!birthDate) return 0;

  try {
    const birth = parseToDate(birthDate);
    const today = getPeruDateTime();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  } catch {
    return 0;
  }
};

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
