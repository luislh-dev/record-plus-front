import { ErrorPanel } from '@/components/errors/ErrorPanel';
import { Card, CardBody } from '@heroui/react';
import { useParams } from 'react-router-dom';
import { CreateRecordDetailForm } from '../components/CreateRecordDetailForm';

export const CreateRecordDetail = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <ErrorPanel message='ID del paciente no proporcionado' />;
  }

  return (
    <Card>
      <CardBody>
        <CreateRecordDetailForm personId={id} />
      </CardBody>
    </Card>
  );
};
