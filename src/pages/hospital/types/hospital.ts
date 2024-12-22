import { Align } from '@/constants/align';
import { HospitalListDTO } from './HospitalListDTO';

export interface HospitalTableColumn {
  name: string;
  uuid: keyof HospitalListDTO | 'actions';
  align?: Align;
  sortable?: boolean;
  render?: (hospital: HospitalListDTO) => React.ReactNode;
}
