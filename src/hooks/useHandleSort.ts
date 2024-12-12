import { SortConfig, SortConfigGeneric, SortDirection } from "@/types/sorting";

export const useHandleSort = (sortConfig: SortConfig) => {
  const getNextSortDirection = (field: string): SortDirection => {
    return sortConfig.field === field &&
      sortConfig.direction === SortDirection.ASC
      ? SortDirection.DESC
      : SortDirection.ASC;
  };

  const getNewSortConfig = (field: string): SortConfig => ({
    field,
    direction: getNextSortDirection(field),
  });

  return {
    getNextSortDirection,
    getNewSortConfig,
  };
};

export const useHandleSortGeneric = <T>(sortConfig: SortConfigGeneric<T>) => {
  const getNextSortDirection = (field: T): SortDirection => {
    return sortConfig.field === field &&
      sortConfig.direction === SortDirection.ASC
      ? SortDirection.DESC
      : SortDirection.ASC;
  };

  const getNewSortConfig = (field: T): SortConfigGeneric<T> => ({
    field,
    direction: getNextSortDirection(field),
  });

  return {
    getNextSortDirection,
    getNewSortConfig,
  };
};
