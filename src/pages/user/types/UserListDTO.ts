export interface UserListDTO {
  id: string;
  username: string;
  email: string;
  dni: string;
  hospital: string;
  state: string;
  roles: string[];
}

export type SortableUserFields = keyof UserListDTO;
