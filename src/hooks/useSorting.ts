import {
  GenericSortConfig,
  SortableKeys,
  SortDirection,
} from "@/types/sorting";
import { useState } from "react";

export function useSorting<T extends Record<string, any>>(
  initialSortBy: SortableKeys<T>
) {
  const [sorting, setSorting] = useState<GenericSortConfig<T>>({
    sortBy: initialSortBy,
    direction: SortDirection.ASC,
  });

  const handleChangeSort = (sortBy: SortableKeys<T>) => {
    setSorting((prevSort) => {
      if (prevSort.sortBy !== sortBy) {
        return { sortBy, direction: SortDirection.ASC };
      }

      // Si ya estábamos ordenando por esta columna, solo cambiamos la dirección
      return {
        sortBy,
        direction:
          prevSort.direction === SortDirection.ASC
            ? SortDirection.DESC
            : SortDirection.ASC,
      };
    });
  };

  return {
    sorting,
    handleChangeSort,
    setSorting,
  };
}
