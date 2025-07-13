import { Skeleton } from '@heroui/react';

export const PeopleBasicInfoSkeleton = () => {
  const skeletonItems = Array.from({ length: 5 }, () => ({
    id: crypto.randomUUID(),
  }));

  return (
    <div className='space-y-4'>
      {/* Nombre */}
      <div className='flex items-center pb-4 border-b'>
        <Skeleton className='h-5 w-4/5 rounded-lg' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {skeletonItems.map((item) => (
          <div key={item.id} className='flex flex-col gap-2'>
            <Skeleton className='h-4 w-10 rounded-lg' />
            <Skeleton className='h-4 w-20 rounded-lg' />
          </div>
        ))}
      </div>
    </div>
  );
};
