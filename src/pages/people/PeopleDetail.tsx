import { ErrorPanel } from '@/components/errors/ErrorPanel';
import { useParams } from 'react-router-dom';
import { PeopleBasicInfo } from './components/PeopleBasicInfo';
import { PeopleRecordList } from './components/PeopleRecordList';

export const PeopleDetail = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <ErrorPanel message='No se pudo encontrar el historial de la persona.' />;
  }

  return (
    <section className='flex flex-col-reverse md:flex-row gap-4 w-full'>
      {/* Columna izquierda - Principal */}
      <div className='w-full md:w-3/4'>
        <PeopleRecordList personId={id} />
      </div>

      {/* Columna derecha - Aside */}
      <aside className='w-full md:w-1/4'>
        <div className='max-w-md mx-auto md:max-w-none'>
          <PeopleBasicInfo personId={id} />
        </div>
      </aside>
    </section>
  );
};
