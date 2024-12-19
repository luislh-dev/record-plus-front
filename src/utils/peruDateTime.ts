export const PERU_TIMEZONE = "America/Lima";
export const PERU_LOCALE = "es-PE";

export const getPeruDateTime = () => {
  // Obtener fecha actual en UTC
  const date = new Date();

  // Convertir a string en zona horaria de Perú
  const peruDateString = date.toLocaleString(PERU_LOCALE, {
    timeZone: PERU_TIMEZONE,
  });

  // Crear nueva fecha desde string de Perú
  const [datePart, timePart] = peruDateString.split(", ");
  const [day, month, year] = datePart.split("/");
  const [hours, minutes, seconds] = timePart.split(":");

  // Construir fecha en zona horaria de Perú
  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes),
    parseInt(seconds),
  );
};

export const parsePeruDate = (date: Date | string | null): string => {
  if (!date) return new Date().toISOString().split("T")[0];

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const peruDate = dateObj.toLocaleString(PERU_LOCALE, {
      timeZone: PERU_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const [day, month, year] = peruDate.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  } catch {
    return new Date().toISOString().split("T")[0];
  }
};

export const getPeruDateTimeParts = () => {
  const peruDate = new Date().toLocaleString(PERU_LOCALE, {
    timeZone: PERU_TIMEZONE,
    hour12: false,
  });

  const date = new Date(peruDate);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // Enero es 0
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};

export const formatPeruDateTime = (format: "short" | "long" = "short") => {
  const optios: Intl.DateTimeFormatOptions = {
    timeZone: PERU_TIMEZONE,
    hour12: true,
  };

  if (format === "long") {
    optios.weekday = "long";
    optios.year = "numeric";
    optios.month = "long";
    optios.day = "numeric";
    optios.hour = "2-digit";
    optios.minute = "2-digit";
    optios.second = "2-digit";
  }

  return new Date().toLocaleString(PERU_LOCALE, optios);
};
