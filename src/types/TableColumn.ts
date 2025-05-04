import type { Align } from '@/constants/align';

export interface TableColumn<T> {
  name: string;
  key: keyof T | 'actions';
  align?: Align;
  sortable?: boolean;
  render?: (record: T) => React.ReactNode;
}

export interface TableColumnBase {
  name: string;
  uid: string;
  sortable?: boolean;
}
