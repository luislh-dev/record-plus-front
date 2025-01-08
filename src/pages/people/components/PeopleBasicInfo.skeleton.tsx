import { Skeleton } from '@nextui-org/react';

export const PeopleBasicInfoSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Nombre */}
      <div className="flex items-center pb-4 border-b">
        <Skeleton className="h-5 w-4/5 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-10 rounded-lg" />
            <Skeleton className="h-4 w-20 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};
