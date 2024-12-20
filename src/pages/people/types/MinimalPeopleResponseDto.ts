export interface MinimalPeopleResponseDto {
  name: string;
  fatherLastName: string;
  motherLastName: string;
  phone: string;
  hasExternalSource: boolean;
  dataSource?: string;
}
