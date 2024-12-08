export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export type SortableKeys<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

export interface GenericSortConfig<T> {
  sortBy: SortableKeys<T>;
  direction: SortDirection;
}
