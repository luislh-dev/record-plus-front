export interface MinimalPeopleResponseDto {
  name: string;
  fatherLastName: string;
  motherLastName: string;
  phone: string;
  hasExternalSource: boolean;
  documentNumber: string;
  documentType: string;
  dataSource?: string;
  sexTypeId: number;
  birthdate?: Date;
}
