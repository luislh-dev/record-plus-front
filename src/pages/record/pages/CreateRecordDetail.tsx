import { Card, CardBody } from '@heroui/react';
import { useParams } from 'react-router-dom';
import { CreateRecordDetailForm } from '../components/CreateRecordDetailForm';

export const CreateRecordDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Card>
        <CardBody>
          <CreateRecordDetailForm personId={id!} />
        </CardBody>
      </Card>
    </>
  );
};
