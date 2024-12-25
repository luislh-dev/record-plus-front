export interface MainPeopleListDto {
  id: string;
  documentNumber: string;
  fullName: string;
  totalVisits: number;
  lastVisitDate: string | null;
  lastVisitHospitalName: string | null;
}

export type SortablePeopleFields = keyof MainPeopleListDto | 'updatedAt';
