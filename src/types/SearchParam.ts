export interface SearchParam {
  id: string;
  label: string;
}

export type searchParamGeneric<T> = {
  id: keyof T;
  label: string;
};
