export interface RecordDetailCreateRequest {
  recordId: string; // UUID
  stateId: number;
  reason: string;
  diagnosis?: string;
  treatment?: string;
  visitDate: string; // ISO DateTime string
  fileTypeIds: number[];
  files: File[];
}
