import { UserManagementCreateValues } from '../models/userManagementCreateSchema';
import { ManagementCreationDto } from '../types/ManagementCreationDto';

export const toManagementCreationDto = (
  values: UserManagementCreateValues
): ManagementCreationDto => ({
  name: values.name,
  email: values.email,
  password: values.password,
  personDNI: values.personDNI,
  stateId: values.stateId,
  hospitalId: values.hospitalId
});
