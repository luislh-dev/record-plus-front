import { DocumentType } from '@/types/DocumentType';
import { Gender } from '@/types/Gender';

export interface PeopleDetailDTO {
  id: string;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  documentNumber: string;
  birthdate: string;
  phone: string;
  address: string | null;
  bloodType: string | null;
  nationality: string | null;
  sexType: Gender;
  typeDocument: DocumentType;
}
