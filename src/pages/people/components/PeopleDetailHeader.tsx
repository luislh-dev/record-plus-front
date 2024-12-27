import { Typography } from '@/components/Typography';
import { calculateAge } from '@/utils/peruDateTime';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPersonDetailById } from '../hooks/useGetPerson';

export const PeopleDetailHeader = () => {
  const { id } = useParams<{ id: string }>();

  const { data, setId } = useGetPersonDetailById();

  useEffect(() => {
    setId(id || null);
  }, [id, setId]);

  const personAge = data?.birthdate ? calculateAge(data.birthdate) : null;

  return (
    <Card>
      <CardHeader>
        <Typography as="h2" variant="section-title">
          Historial Medico
        </Typography>
      </CardHeader>
      <CardBody>
        <Typography variant="label">
          {`${data?.name} ${data?.paternalSurname} ${data?.maternalSurname}`} -{' '}
          {data?.typeDocument.name}: {data?.documentNumber}{' '}
          {personAge !== null && ` - ${personAge} años`}
        </Typography>
      </CardBody>
    </Card>
  );
};
