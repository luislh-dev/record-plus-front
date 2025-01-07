import { CalendarDate, getLocalTimeZone } from '@internationalized/date';

// Constantes para configuración
export const DEFAULT_DATE_RANGE_DAYS = 7;

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

  formatDateForAPI: (calendarDate: CalendarDate, isEndDate = false): string => {
    const date = calendarDate.toDate(getLocalTimeZone());
    if (isEndDate) {
      date.setHours(23, 59, 59, 999);
    }
    return date.toISOString().split('.')[0];
  }
};
