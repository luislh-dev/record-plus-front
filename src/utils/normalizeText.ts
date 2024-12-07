export const normalizeText = (text: string): string => {
  return text
    .normalize("NFD") // Descompone los caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
    .toLowerCase();
};
