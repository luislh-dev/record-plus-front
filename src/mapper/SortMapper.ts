import { type SortConfig, SortDirection } from '@/types/sorting';
import type { SortDescriptor } from '@heroui/react';

export const sortMapper = (sort: SortDescriptor): SortConfig => {
  return {
    field: sort.column as string | number,
    direction: sort.direction === 'ascending' ? SortDirection.ASC : SortDirection.DESC,
  };
};

export const sortDescriptorMapper = (config: SortConfig): SortDescriptor => {
  return {
    column: config.field,
    direction: config.direction === SortDirection.ASC ? 'ascending' : 'descending',
  };
};
