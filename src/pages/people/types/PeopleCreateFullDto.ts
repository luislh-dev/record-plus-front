import type { PeopleCreateRequiredDto } from './PeopleCreateRequiredDto';

export interface PeopleCreateFullDto extends PeopleCreateRequiredDto {
  bloodType?: string;
  address?: string;
  nationality?: string;
}
