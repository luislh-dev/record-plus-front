import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { HeaderRecord } from './components/HeaderRecord';
import { PeopleBasicInfo } from './components/PeopleBasicInfo';

export const PeopleDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section>
      <Card>
        <CardHeader>
          <HeaderRecord />
        </CardHeader>

        <CardBody>
          <PeopleBasicInfo personId={id} />
        </CardBody>
      </Card>
    </section>
  );
};
