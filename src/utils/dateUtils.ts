import { CalendarDate } from '@internationalized/date';

// Constantes para configuración
const DEFAULT_DATE_RANGE_DAYS = 7;

// Utilidades para manejo de fechas
export const dateUtils = {
  createDateRange: () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - DEFAULT_DATE_RANGE_DAYS);

    return [dateUtils.createCalendarDate(start), dateUtils.createCalendarDate(end)] as const;
  },

  createCalendarDate: (date: Date) => {
    return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  },

  formatDateForAPI: (date: CalendarDate, isEndDate: boolean): string => {
    const year = date.year;
    const month = String(date.month).padStart(2, '0');
    const day = String(date.day).padStart(2, '0');

    if (isEndDate) {
      return `${year}-${month}-${day}T23:59:59`;
    }
    return `${year}-${month}-${day}T00:00:00`;
  },
};
