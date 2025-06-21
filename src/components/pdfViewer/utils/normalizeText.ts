export const normalizeText = (text: string): string => {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
};
