export interface PeopleDetailDTO {
  id: string;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  documentNumber: string;
  birthdate: string;
  nationality: string | null;
  sexType: string;
  documentType: string;
}
