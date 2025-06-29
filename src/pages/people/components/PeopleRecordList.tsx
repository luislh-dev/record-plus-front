import { DateRangeFilter } from '@/pages/record/components/DateRangeFilter';
import { SearchRecordDetail } from '@/pages/record/components/SearchRecordDetail';
import { useRecordDetailSearch } from '@/pages/record/hooks/useRecordDetailSearch';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Listbox,
  ListboxItem,
  ListboxSection,
  Spinner,
} from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { HeaderRecord } from './HeaderRecord';
import { PeopleRecordDetailCard } from './PeopleRecordDetailCard';

interface Props {
  personId: string;
}

function TopContent() {
  return (
    <div className='w-full space-y-3'>
      <HeaderRecord />
      <div className='flex flex-wrap items-center gap-4'>
        {/* Search */}
        <div className='w-80 '>
          <SearchRecordDetail />
        </div>
        {/* Date Range */}
        <div className='w-80'>
          <DateRangeFilter />
        </div>
      </div>
    </div>
  );
}

export function PeopleRecordList({ personId }: Props) {
  const { recordDetails, hasNextPage, fetchNextPage, isFetching, isLoading } =
    useRecordDetailSearch(personId);

  const navigate = useNavigate();

  const navigateToDetail = (recordId: string) => {
    navigate(`/people/${personId}/detail/record/${recordId}`);
  };

  const bottomContent = (
    <>
      {hasNextPage ? (
        <div className='flex w-full justify-center'>
          <Button isLoading={isFetching} onPress={() => fetchNextPage()}>
            Cargar más registros
          </Button>
        </div>
      ) : null}
    </>
  );

  return (
    <>
      <Card>
        <CardHeader>
          <TopContent />
        </CardHeader>
        <CardBody>
          <Listbox
            bottomContent={bottomContent}
            classNames={{
              list: 'max-h-[calc(100vh-290px)] overflow-y-auto',
            }}
            itemClasses={{ base: 'data-[hover=true]:bg-default-100/80' }}
            emptyContent={
              <div className='flex items-center justify-center h-full'>
                {isLoading ? (
                  <Spinner className='p-72' />
                ) : (
                  <p className='text-lg font-medium text-center p-72'>
                    No se encontraron registros
                  </p>
                )}
              </div>
            }
          >
            {recordDetails.map((record) => (
              <ListboxSection key={record.id} showDivider>
                <ListboxItem key={record.id} onPress={() => navigateToDetail(record.id)}>
                  <PeopleRecordDetailCard record={record} />
                </ListboxItem>
              </ListboxSection>
            ))}
          </Listbox>
        </CardBody>
      </Card>
    </>
  );
}
