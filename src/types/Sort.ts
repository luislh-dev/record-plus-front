export type SortDirection = "asc" | "desc";

export interface SortConfig<T extends string> {
  field: T;
  direction: SortDirection;
}

export interface SortOptions<T extends string> {
  defaultField: T;
  defaultDirection?: SortDirection;
  sortableFields: T[];
}
