import type { FileDetailDto } from './RecordDetailListResponseDto';

export interface RecordDetailExtenseViewModel {
  id: string;
  doctorFullName: string;
  hospitalName: string;
  visitDate: string;
  reason: string;
  diagnostic: string;
  treatment: string;
  files: FileDetailDto[];
}
