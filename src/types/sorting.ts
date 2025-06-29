export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortConfig {
  field: string | number;
  direction: SortDirection;
}
