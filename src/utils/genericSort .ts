import { GenericSortConfig, SortDirection } from "@/types/sorting";

export const genericSort = <T extends Record<string, any>>(
  items: T[],
  config: GenericSortConfig<T>
): T[] => {
  return items.toSorted((a, b) => {
    const comparison = String(a[config.sortBy]).localeCompare(
      String(b[config.sortBy])
    );
    return config.direction === SortDirection.ASC ? comparison : -comparison;
  });
};
