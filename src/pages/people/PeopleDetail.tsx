import { Card, CardBody, CardHeader } from "@heroui/react";
import { useParams } from 'react-router-dom';
import RecordDetailList from '../record/components/RecordDetailList';
import { HeaderRecord } from './components/HeaderRecord';
import { PeopleBasicInfo } from './components/PeopleBasicInfo';

export const PeopleDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="flex flex-col-reverse md:flex-row gap-4 w-full">
      {/* Columna izquierda - Principal */}
      <div className="w-full md:w-3/4">
        <Card className="bg-white shadow-2xl border">
          <CardHeader>
            <HeaderRecord />
          </CardHeader>
          <CardBody>
            <RecordDetailList personId={id} />
          </CardBody>
        </Card>
      </div>

      {/* Columna derecha - Aside */}
      <aside className="w-full md:w-1/4">
        <div className="max-w-md mx-auto md:max-w-none">
          <PeopleBasicInfo personId={id} />
        </div>
      </aside>
    </section>
  );
};
