import { UUID } from "crypto";

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  roleId: number[] | number;
  stateId: number;
}

export interface UserUpdateDTO {
  name: string;
  email: string;
  roleId: number | number[];
  stateId: number;
}

export interface UserListDTO {
  id: UUID;
  username: string;
  email: string;
  dni: string;
  hospital: string;
  state: string;
  roles: string;
}
