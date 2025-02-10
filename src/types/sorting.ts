export enum SortDirection {
  NONE = 'none',
  ASC = 'asc',
  DESC = 'desc',
}

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

export interface SortConfigGeneric<T> {
  field: T;
  direction: SortDirection;
}

export interface SortOptions<T extends string> {
  defaultField: T;
  defaultDirection?: SortDirection;
  sortableFields: T[];
}

export type SortableKeys<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

export interface GenericSortConfig<T> {
  field: SortableKeys<T>;
  direction: SortDirection;
}
