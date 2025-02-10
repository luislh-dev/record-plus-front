import { Card, CardBody, CardHeader } from "@heroui/react";
import { useParams } from 'react-router-dom';
import { CreateRecordDetailForm } from '../components/CreateRecordDetailForm';

export const CreateRecordDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <CreateRecordDetailForm personId={id!} />
        </CardBody>
      </Card>
    </>
  );
};
