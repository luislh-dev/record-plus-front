import type { PeopleCreateRequiredValues } from '../models/peopleCreateRequiredSchema';
import type { PeopleCreateFullDto } from '../types/PeopleCreateFullDto';

export const toPeopleRequiredDto = (data: PeopleCreateRequiredValues): PeopleCreateFullDto => {
  return {
    name: data.name,
    paternalSurname: data.paternalSurname,
    maternalSurname: data.maternalSurname,
    phone: data.phone ?? '',
    typeDocumentId: data.typeDocumentId,
    documentNumber: data.documentNumber,
    birthdate: data.birthdate,
    sexTypeId: data.sexTypeId,
  };
};
