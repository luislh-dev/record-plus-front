import { PeopleCreateRequiredValues } from '../models/peopleCreateRequiredSchema';
import { PeopleCreateFullDto } from '../types/PeopleCreateFullDto';

export const toPeopleRequiredDto = (data: PeopleCreateRequiredValues): PeopleCreateFullDto => {
  return {
    name: data.name,
    paternalSurname: data.paternalSurname,
    maternalSurname: data.maternalSurname,
    phone: data.phone ?? '',
    typeDocumentId: data.typeDocumentId,
    documentNumber: data.documentNumber,
    birthdate: data.birthdate,
    sexTypeId: data.sexTypeId
  };
};
