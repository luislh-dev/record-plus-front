import { Person } from '@/icons/Person';
import { calculateAge } from '@/utils/peruDateTime';
import { Card, CardBody } from '@heroui/react';
import { useEffect } from 'react';
import { useGetPersonDetailById } from '../hooks/useGetPerson';
import { PeopleBasicInfoSkeleton } from './PeopleBasicInfo.skeleton';

interface Props {
  personId: string | undefined;
}

export const PeopleBasicInfo = ({ personId }: Props) => {
  const { data, setId, isLoading } = useGetPersonDetailById();

  useEffect(() => {
    setId(personId || null);
  }, [personId, setId]);

  const personAge = data?.birthdate ? calculateAge(data.birthdate) : null;

  return (
    <Card className='bg-white shadow-lg'>
      <CardBody className='p-6'>
        {isLoading && <PeopleBasicInfoSkeleton />}
        {!isLoading && (
          <div className='space-y-4'>
            {/* Nombre */}
            <div className='flex items-center space-x-3 pb-4 border-b'>
              <Person size={20} fill='black' />
              <div>
                <div className='text-sm font-semibold text-gray-800'>
                  {data?.name} {data?.paternalSurname} {data?.maternalSurname}
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Tipo de documento */}
              <div className='flex items-center space-x-3'>
                <div>
                  <div className='text-sm text-gray-500'>{data?.typeDocument?.name}</div>
                  <div className='font-medium'>{data?.documentNumber}</div>
                </div>
              </div>

              {/* Nacionalidad */}
              <div>
                <div className='text-sm text-gray-500'>Nacionalidad</div>
                <div className='font-medium'>{data?.nationality || '-'}</div>
              </div>

              {/* Fecha de nacimiento */}
              <div>
                <div className='text-sm text-gray-500'>Nacimiento</div>
                <div className='font-medium'>{data?.birthdate || '-'}</div>
              </div>

              {/* Edad */}
              <div>
                <div className='text-sm text-gray-500'>Edad</div>
                <div className='font-medium'>{personAge !== null ? `${personAge} años` : '-'}</div>
              </div>

              {/* genero */}
              <div className='flex items-center space-x-3'>
                <div>
                  <div className='text-sm text-gray-500'>Género</div>
                  <div className='font-medium'>{data?.sexType.name}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
