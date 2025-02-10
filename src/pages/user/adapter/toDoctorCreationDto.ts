import type { UserDoctorCreateValues } from '../models/userDoctorCreateSchema';
import type { DoctorCreationDto } from '../types/DoctorCreationDto';

export const toDoctorCreationDto = (values: UserDoctorCreateValues): DoctorCreationDto => ({
  name: values.name,
  email: values.email,
  password: values.password,
  personDNI: values.personDNI,
  stateId: values.stateId,
});
