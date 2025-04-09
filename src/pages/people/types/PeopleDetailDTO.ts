import type { DocumentType } from '@/types/DocumentType';
import type { Gender } from '@/types/Gender';

export interface PeopleDetailDTO {
  id: string;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  documentNumber: string;
  birthdate: string;
  nationality: string | null;
  sexType: Gender;
  typeDocument: DocumentType;
}
