export const formatTreatment = (treatment: string) => {
  return treatment
    ?.replace(/\\n/g, '\n') // Reemplaza \\n por \n
    .split('\n') // Divide en líneas
    .map((line) => line.replace(/^\d+\.\s*/, '')); // Elimina los números del inicio
};
