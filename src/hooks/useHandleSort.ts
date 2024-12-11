import { SortConfig, SortDirection } from "@/types/sorting";

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
