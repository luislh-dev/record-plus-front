import { SortConfig, SortDirection, SortOptions } from "@/types/sorting";
import { useCallback, useState } from "react";

/**
 * Hook personalizado para manejar la lógica de ordenamiento
 * @template T - Tipo genérico que extiende string para los campos ordenables
 * @param options - Opciones de configuración para el ordenamiento
 * @param options.defaultField - Campo por defecto para ordenar
 * @param options.defaultDirection - Dirección inicial del ordenamiento ('asc' | 'desc')
 * @param options.sortableFields - Array de campos que pueden ser ordenados
 */
export function useSort<T extends string>({
  defaultField,
  defaultDirection = SortDirection.ASC,
  sortableFields,
}: SortOptions<T>) {
  // Estado principal que mantiene la configuración actual del ordenamiento
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: defaultField,
    direction: defaultDirection,
  });

  /**
   * Verifica si un campo puede ser ordenado
   * Utiliza Type Guard para asegurar que el campo es de tipo T
   * @param field - Campo a verificar
   * @returns boolean y asegura el tipo T para TypeScript
   */
  const isSortableField = useCallback(
    (field: string): field is T => {
      return sortableFields.includes(field as T);
    },
    [sortableFields]
  );

  /**
   * Alterna la dirección del ordenamiento entre 'asc' y 'desc'
   * @param direction - Dirección actual
   * @returns La dirección opuesta
   */
  const toggleSortDirection = useCallback(
    (direction: SortDirection): SortDirection => {
      return direction === "asc" ? SortDirection.DESC : SortDirection.ASC;
    },
    []
  );

  /**
   * Maneja el cambio de ordenamiento cuando se hace clic en una columna
   * Si se hace clic en la misma columna, cambia la dirección
   * Si se hace clic en una columna diferente, usa la dirección por defecto
   * @param field - Campo por el cual ordenar
   */
  const handleSort = useCallback(
    (field: string) => {
      // Validación de seguridad para asegurar que el campo es ordenable
      if (!isSortableField(field)) {
        throw new Error(`El campo "${field}" no es ordenable`);
      }

      setSortConfig((prevConfig) => ({
        field,
        // Si es el mismo campo, alterna la dirección
        // Si es un campo diferente, usa la dirección por defecto
        direction:
          prevConfig.field === field
            ? toggleSortDirection(prevConfig.direction)
            : defaultDirection,
      }));
    },
    [isSortableField, toggleSortDirection, defaultDirection]
  );

  /**
   * Obtiene la configuración actual de ordenamiento
   * Útil para enviar los parámetros de ordenamiento a la API
   * @returns Objeto con el campo y dirección actual del ordenamiento
   */
  const getSortQuery = useCallback(() => {
    return sortConfig;
  }, [sortConfig]);

  return {
    sortConfig,
    handleSort,
    getSortQuery,
    isSortableField,
  };
}
