import { Typography } from '@/components/Typography';
import { calculateAge } from '@/utils/peruDateTime';
import { useEffect } from 'react';
import { useGetPersonDetailById } from '../hooks/useGetPerson';

interface Props {
  personId: string | undefined;
}

export const PeopleBasicInfo = ({ personId }: Props) => {
  const { data, setId } = useGetPersonDetailById();

  useEffect(() => {
    setId(personId || null);
  }, [personId, setId]);

  const personAge = data?.birthdate ? calculateAge(data.birthdate) : null;

  return (
    <Typography variant="label">
      {`${data?.name} ${data?.paternalSurname} ${data?.maternalSurname}`} -{' '}
      {data?.typeDocument.name}: {data?.documentNumber}{' '}
      {personAge !== null && ` - ${personAge} años`}
    </Typography>
  );
};
