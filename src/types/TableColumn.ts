import type { Align } from '@/constants/align';

export interface TableColumnBase {
  name: string;
  uid: string;
  sortable?: boolean;
  align?: Align;
}
